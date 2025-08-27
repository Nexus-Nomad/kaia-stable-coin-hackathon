import { EventEmitter } from 'events';
import { Web3Provider, Wallet as EthersExtWallet } from '@kaiachain/ethers-ext';
import { IWallet } from '../interfaces/IWallet';
import {
  Account,
  Network,
  TransactionParams,
  TransactionResult,
  WalletConnectionStatus,
  WalletProvider,
  WalletState,
  WalletEvents,
} from '../types/wallet.types';
import { getNetworkByChainId } from '../config/networks';

// 이더리움 프로바이더 타입 정의
interface EthereumProvider {
  isMetaMask?: boolean;
  isPhantom?: boolean;
  isCoinbaseWallet?: boolean;
  isBraveWallet?: boolean;
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on(event: string, callback: (...args: unknown[]) => void): void;
  removeListener(event: string, callback: (...args: unknown[]) => void): void;
}

// Kaikas 및 MetaMask 지갑 타입 정의
declare global {
  interface Window {
    klaytn?: {
      enable(): Promise<string[]>;
      selectedAddress: string;
      networkVersion: string;
      isKaikas: boolean;
      on(event: string, callback: (...args: unknown[]) => void): void;
      removeListener(
        event: string,
        callback: (...args: unknown[]) => void
      ): void;
      request(args: { method: string; params?: unknown[] }): Promise<unknown>;
      sendAsync(
        options: unknown,
        callback: (error: Error | null, result?: unknown) => void
      ): void;
    };
    ethereum?:
      | {
          enable(): Promise<string[]>;
          selectedAddress: string;
          networkVersion: string;
          isMetaMask?: boolean;
          isPhantom?: boolean;
          isCoinbaseWallet?: boolean;
          isBraveWallet?: boolean;
          on(event: string, callback: (...args: unknown[]) => void): void;
          removeListener(
            event: string,
            callback: (...args: unknown[]) => void
          ): void;
          request(args: {
            method: string;
            params?: unknown[];
          }): Promise<unknown>;
          providers?: EthereumProvider[];
        }
      | EthereumProvider[];
    phantom?: {
      solana?: unknown;
    };
  }
}

/**
 * @kaiachain/ethers-ext를 사용한 Kaia 지갑 서비스
 */
export class KaiaWalletService extends EventEmitter implements IWallet {
  private state: WalletState = {
    status: WalletConnectionStatus.DISCONNECTED,
    account: null,
    network: null,
    provider: null,
    error: null,
  };

  private web3Provider: Web3Provider | null = null;
  private wallet: EthersExtWallet | null = null;
  private isEventListenersSetup: boolean = false;
  private providerEventListeners: Map<string, (...args: any[]) => void> =
    new Map();

  constructor(private walletProvider: WalletProvider) {
    super();
    this.state.provider = walletProvider;
    this.setupEventListeners();
  }

  /**
   * 현재 상태 반환
   */
  getState(): WalletState {
    return { ...this.state };
  }

  /**
   * 상태 업데이트
   */
  private updateState(updates: Partial<WalletState>): void {
    this.state = { ...this.state, ...updates };
  }

  /**
   * 에러 처리
   */
  private handleError(error: Error): void {
    this.updateState({
      status: WalletConnectionStatus.ERROR,
      error: error.message,
    });
    this.emit('error', error);
  }

  /**
   * 지갑 사용 가능 여부 확인
   */
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    switch (this.walletProvider) {
      case WalletProvider.KAIKAS: {
        // Kaikas 전용 확인 - window.klaytn 사용
        const hasKlaytn = !!window.klaytn;
        const isKaikas = window.klaytn?.isKaikas === true;
        console.log('🔍 Kaikas detection result:', hasKlaytn && isKaikas, {
          hasKlaytn,
          isKaikas: window.klaytn?.isKaikas,
          hasRequest: typeof window.klaytn?.request === 'function',
        });
        return hasKlaytn && isKaikas;
      }
      case WalletProvider.METAMASK: {
        // MetaMask 검색 - 여러 위치에서 찾기
        if (!window.ethereum) {
          console.log('🔍 MetaMask: window.ethereum not found');
          return false;
        }

        let metamaskFound = false;

        // 1. 기본 ethereum 객체 확인
        if (
          window.ethereum &&
          (window.ethereum as any).isMetaMask &&
          !(window.ethereum as any).isPhantom
        ) {
          metamaskFound = true;
        }

        // 2. ethereum.providers 배열에서 MetaMask 찾기
        if (!metamaskFound && (window.ethereum as any)?.providers) {
          const metamaskProvider = (window.ethereum as any).providers.find(
            (provider: { isMetaMask?: boolean; isPhantom?: boolean }) =>
              provider.isMetaMask && !provider.isPhantom
          );
          if (metamaskProvider) metamaskFound = true;
        }

        // 3. window.ethereum이 배열인 경우
        if (!metamaskFound && Array.isArray(window.ethereum)) {
          const metamaskProvider = window.ethereum.find(
            (provider: { isMetaMask?: boolean; isPhantom?: boolean }) =>
              provider.isMetaMask && !provider.isPhantom
          );
          if (metamaskProvider) metamaskFound = true;
        }

        console.log('🔍 MetaMask detection result:', metamaskFound, {
          hasEthereum: !!window.ethereum,
          isArray: Array.isArray(window.ethereum),
          hasProviders: !!(
            window.ethereum as EthereumProvider & {
              providers?: EthereumProvider[];
            }
          )?.providers,
          directMetaMask: !!(window.ethereum as EthereumProvider)?.isMetaMask,
          directPhantom: !!(window.ethereum as EthereumProvider)?.isPhantom,
        });

        return metamaskFound;
      }
      default:
        return false;
    }
  }

  /**
   * 지갑 연결
   */
  async connect(): Promise<Account> {
    if (!this.isAvailable()) {
      throw new Error(`${this.walletProvider} 지갑이 설치되지 않았습니다.`);
    }

    try {
      console.log('🔍 지갑 연결 시작:', this.walletProvider);

      // 연결 시작 전 상태 초기화
      this.cleanupResources();
      this.updateState({
        status: WalletConnectionStatus.CONNECTING,
        error: null,
      });

      // Web3Provider 생성
      const provider = this.getProvider();
      this.web3Provider = new Web3Provider(provider);

      // 계정 연결 요청
      console.log('🔍 계정 연결 요청 중...');
      await provider.request({ method: 'eth_requestAccounts' });

      // 계정 정보 조회
      console.log('🔍 계정 정보 조회 중...');
      const accounts = await this.web3Provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error('계정을 찾을 수 없습니다.');
      }

      const address =
        typeof accounts[0] === 'string'
          ? accounts[0]
          : (accounts[0] as { address: string }).address;

      console.log('🔍 잔액 조회 중...');
      const balance = await this.getBalance(address);
      const account: Account = { address, balance };

      // 네트워크 정보 조회
      console.log('🔍 네트워크 정보 조회 중...');
      const network = await this.getNetwork();

      // 연결 성공 후 이벤트 리스너 재설정
      this.setupEventListeners();

      this.updateState({
        status: WalletConnectionStatus.CONNECTED,
        account,
        network,
        error: null,
      });

      console.log('✅ 지갑 연결 성공:', { address, network: network?.name });
      this.emit('connect', account);
      return account;
    } catch (error) {
      console.error('❌ 지갑 연결 실패:', error);

      // 연결 실패 시 리소스 정리
      this.cleanupResources();

      // 상태를 DISCONNECTED로 되돌림 (ERROR 상태가 아닌)
      this.updateState({
        status: WalletConnectionStatus.DISCONNECTED,
        account: null,
        network: null,
        error: (error as Error).message,
      });

      // 에러 이벤트 발생
      this.emit('error', error as Error);
      throw error;
    }
  }

  /**
   * 지갑 연결 해제
   */
  async disconnect(): Promise<void> {
    console.log('🔍 지갑 연결 해제 시작');

    // 리소스 정리
    this.cleanupResources();

    this.updateState({
      status: WalletConnectionStatus.DISCONNECTED,
      account: null,
      network: null,
      error: null,
    });

    console.log('✅ 지갑 연결 해제 완료');
    this.emit('disconnect');
  }

  /**
   * 리소스 정리 메서드
   */
  private cleanupResources(): void {
    // 기존 이벤트 리스너 제거
    this.removeProviderEventListeners();

    // Web3Provider 정리
    if (this.web3Provider) {
      this.web3Provider = null;
    }

    // Wallet 정리
    if (this.wallet) {
      this.wallet = null;
    }

    // 이벤트 리스너 상태 초기화
    this.isEventListenersSetup = false;
  }

  /**
   * 프로바이더 이벤트 리스너 제거
   */
  private removeProviderEventListeners(): void {
    if (!this.isAvailable()) return;

    try {
      const provider = this.getProvider();

      // 저장된 이벤트 리스너들 제거
      for (const [eventName, listener] of this.providerEventListeners) {
        provider.removeListener(eventName, listener);
      }

      // 이벤트 리스너 맵 정리
      this.providerEventListeners.clear();
    } catch (error) {
      console.warn('이벤트 리스너 제거 중 오류:', error);
    }
  }

  /**
   * 계정 정보 조회
   */
  async getAccount(): Promise<Account | null> {
    if (!this.web3Provider) {
      return null;
    }

    try {
      const accounts = await this.web3Provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        return null;
      }

      const address =
        typeof accounts[0] === 'string'
          ? accounts[0]
          : (accounts[0] as { address: string }).address;
      const balance = await this.getBalance(address);
      return { address, balance };
    } catch {
      return null;
    }
  }

  /**
   * 네트워크 정보 조회
   */
  async getNetwork(): Promise<Network | null> {
    if (!this.web3Provider) {
      return null;
    }

    try {
      const network = await this.web3Provider.getNetwork();
      return getNetworkByChainId(Number(network.chainId));
    } catch {
      return null;
    }
  }

  /**
   * 잔액 조회
   */
  async getBalance(address?: string): Promise<string> {
    if (!this.web3Provider) {
      throw new Error('지갑이 연결되지 않았습니다.');
    }

    try {
      let targetAddress = address;
      if (!targetAddress) {
        const accounts = await this.web3Provider.listAccounts();
        if (!accounts || accounts.length === 0) {
          throw new Error('계정을 찾을 수 없습니다.');
        }
        targetAddress =
          typeof accounts[0] === 'string'
            ? accounts[0]
            : (accounts[0] as { address: string }).address;
      }

      const balance = await this.web3Provider.getBalance(targetAddress!);
      // Wei에서 KAIA로 변환
      return balance.toString();
    } catch (error) {
      throw new Error(`잔액 조회 실패: ${(error as Error).message}`);
    }
  }

  /**
   * 트랜잭션 전송 (재시도 로직 포함)
   */
  async sendTransaction(
    params: TransactionParams,
    maxRetries: number = 3
  ): Promise<TransactionResult> {
    if (!this.web3Provider) {
      throw new Error('지갑이 연결되지 않았습니다.');
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(
          `🔄 트랜잭션 전송 시도 ${attempt + 1}/${maxRetries}`,
          params
        );

        const signer = await this.web3Provider.getSigner();

        // Gas 설정 검증 및 조정
        let gasLimit = params.gas;
        let gasPrice = params.gasPrice;

        // 재시도 시 Gas 값 증가
        if (attempt > 0) {
          const gasMultiplier = 1 + attempt * 0.2; // 20%씩 증가
          const priceMultiplier = 1 + attempt * 0.1; // 10%씩 증가

          if (gasLimit) {
            gasLimit = Math.floor(
              parseInt(gasLimit) * gasMultiplier
            ).toString();
          }
          if (gasPrice) {
            gasPrice = Math.floor(
              parseInt(gasPrice) * priceMultiplier
            ).toString();
          }

          console.log(`📈 재시도로 인한 Gas 조정:`, {
            originalGas: params.gas,
            adjustedGas: gasLimit,
            originalPrice: params.gasPrice,
            adjustedPrice: gasPrice,
          });
        }

        const txParams = {
          to: params.to,
          value: params.value || '0',
          data: params.data || '0x',
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        };

        const tx = await signer.sendTransaction(txParams);
        console.log(`✅ 트랜잭션 전송 성공:`, tx.hash);

        const receipt = await tx.wait();
        console.log(`✅ 트랜잭션 확인 완료:`, {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString(),
        });

        return {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString(),
        };
      } catch (error) {
        lastError = error as Error;
        console.error(
          `❌ 트랜잭션 전송 실패 (시도 ${attempt + 1}):`,
          lastError.message
        );

        // Gas 관련 오류인지 확인
        const errorMessage = lastError.message.toLowerCase();
        const isGasError =
          errorMessage.includes('gas') ||
          errorMessage.includes('intrinsic') ||
          errorMessage.includes('insufficient') ||
          errorMessage.includes('out of gas');

        if (!isGasError && attempt === 0) {
          // Gas 오류가 아닌 경우 즉시 실패
          break;
        }

        // 마지막 시도가 아니면 잠시 대기
        if (attempt < maxRetries - 1) {
          const delay = 1000 * (attempt + 1); // 점진적 지연
          console.log(`⏳ ${delay}ms 후 재시도...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // 모든 재시도 실패 시 상세한 오류 메시지 제공
    const errorMessage = this.getDetailedErrorMessage(lastError);
    throw new Error(errorMessage);
  }

  /**
   * 상세한 오류 메시지 생성
   */
  private getDetailedErrorMessage(error: Error | null): string {
    if (!error) {
      return '알 수 없는 오류가 발생했습니다.';
    }

    const message = error.message.toLowerCase();

    if (message.includes('insufficient funds')) {
      return '잔액이 부족합니다. 지갑에 충분한 KAIA가 있는지 확인해주세요.';
    }

    if (message.includes('gas') && message.includes('intrinsic')) {
      return 'Gas 한도가 너무 낮습니다. 트랜잭션을 처리하기에 충분한 Gas를 설정해주세요.';
    }

    if (message.includes('gas') && message.includes('limit')) {
      return 'Gas 한도를 초과했습니다. 더 높은 Gas 한도로 다시 시도해주세요.';
    }

    if (message.includes('nonce')) {
      return 'Nonce 오류입니다. 페이지를 새로고침하고 다시 시도해주세요.';
    }

    if (message.includes('user denied') || message.includes('rejected')) {
      return '사용자가 트랜잭션을 거부했습니다.';
    }

    if (message.includes('network')) {
      return '네트워크 연결에 문제가 있습니다. 네트워크 상태를 확인해주세요.';
    }

    return `트랜잭션 전송 실패: ${error.message}`;
  }

  /**
   * 메시지 서명
   */
  async signMessage(message: string): Promise<string> {
    if (!this.web3Provider) {
      throw new Error('지갑이 연결되지 않았습니다.');
    }

    try {
      const signer = await this.web3Provider.getSigner();
      return await signer.signMessage(message);
    } catch (error) {
      throw new Error(`메시지 서명 실패: ${(error as Error).message}`);
    }
  }

  /**
   * 네트워크 변경
   */
  async switchNetwork(chainId: number): Promise<void> {
    const provider = this.getProvider();
    const network = getNetworkByChainId(chainId);

    if (!network) {
      throw new Error(`지원하지 않는 네트워크입니다: ${chainId}`);
    }

    try {
      // 네트워크 변경 시도
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (switchError: unknown) {
      // 네트워크가 추가되지 않은 경우 추가 시도
      if ((switchError as { code?: number }).code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: network.name,
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: network.blockExplorerUrl
                ? [network.blockExplorerUrl]
                : undefined,
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
  }

  /**
   * 이벤트 리스너 등록
   */
  on<K extends keyof WalletEvents>(event: K, listener: WalletEvents[K]): this {
    super.on(event as string, listener as (...args: unknown[]) => void);
    return this;
  }

  /**
   * 이벤트 리스너 제거
   */
  off<K extends keyof WalletEvents>(event: K, listener: WalletEvents[K]): this {
    super.off(event as string, listener as (...args: unknown[]) => void);
    return this;
  }

  /**
   * 지갑 제공자 객체 반환
   */
  private getProvider(): EthereumProvider | Window['klaytn'] {
    switch (this.walletProvider) {
      case WalletProvider.KAIKAS:
        if (!window.klaytn || !window.klaytn.isKaikas) {
          throw new Error('Kaikas 지갑을 찾을 수 없습니다.');
        }
        return window.klaytn;
      case WalletProvider.METAMASK: {
        // MetaMask 찾기 - 여러 위치에서 검색
        let metamaskProvider = null;

        // 1. 기본 ethereum 객체 확인
        if (
          window.ethereum &&
          (window.ethereum as any).isMetaMask &&
          !(window.ethereum as any).isPhantom
        ) {
          metamaskProvider = window.ethereum;
        }

        // 2. ethereum.providers 배열에서 MetaMask 찾기 (여러 지갑 설치시)
        if (!metamaskProvider && (window.ethereum as any)?.providers) {
          metamaskProvider = (window.ethereum as any).providers.find(
            (provider: { isMetaMask?: boolean; isPhantom?: boolean }) =>
              provider.isMetaMask && !provider.isPhantom
          );
        }

        // 3. window.ethereum이 배열인 경우 (일부 환경)
        if (!metamaskProvider && Array.isArray(window.ethereum)) {
          metamaskProvider = window.ethereum.find(
            (provider: { isMetaMask?: boolean; isPhantom?: boolean }) =>
              provider.isMetaMask && !provider.isPhantom
          );
        }

        if (!metamaskProvider) {
          throw new Error(
            'MetaMask 지갑을 찾을 수 없습니다. Phantom이 간섭하고 있을 수 있습니다.'
          );
        }

        console.log('🔍 MetaMask provider found:', {
          isMetaMask: metamaskProvider.isMetaMask,
          isPhantom: metamaskProvider.isPhantom,
          providerType: typeof metamaskProvider,
        });

        return metamaskProvider;
      }
      default:
        throw new Error(`지원하지 않는 지갑 제공자: ${this.walletProvider}`);
    }
  }

  /**
   * 이벤트 리스너 설정
   */
  private setupEventListeners(): void {
    if (!this.isAvailable() || this.isEventListenersSetup) return;

    try {
      const provider = this.getProvider();

      // 기존 이벤트 리스너 제거
      this.removeProviderEventListeners();

      // 계정 변경 이벤트 리스너 생성 및 등록
      const accountsChangedListener = (accounts: string[]) => {
        console.log('🔄 계정 변경 이벤트:', accounts);
        this.emit('accountsChanged', accounts);
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.getAccount().then((account) => {
            if (account) {
              this.updateState({ account });
            }
          });
        }
      };

      // 네트워크 변경 이벤트 리스너 생성
      let networkChangedListener: (param: string) => void;

      if (this.walletProvider === WalletProvider.KAIKAS) {
        // Kaikas는 networkChanged 이벤트 사용
        networkChangedListener = (networkId: string) => {
          console.log('🔄 네트워크 변경 이벤트 (Kaikas):', networkId);
          this.emit('chainChanged', networkId);
          this.getNetwork().then((network) => {
            this.updateState({ network });
          });
        };
      } else {
        // MetaMask는 chainChanged 이벤트 사용
        networkChangedListener = (chainId: string) => {
          console.log('🔄 네트워크 변경 이벤트 (MetaMask):', chainId);
          this.emit('chainChanged', chainId);
          this.getNetwork().then((network) => {
            this.updateState({ network });
          });
        };
      }

      // 연결 해제 이벤트 리스너 생성
      const disconnectListener = () => {
        console.log('🔄 연결 해제 이벤트');
        this.disconnect();
      };

      // 이벤트 리스너 등록 및 저장
      provider.on('accountsChanged', accountsChangedListener);
      this.providerEventListeners.set(
        'accountsChanged',
        accountsChangedListener
      );

      const networkEventName =
        this.walletProvider === WalletProvider.KAIKAS
          ? 'networkChanged'
          : 'chainChanged';
      provider.on(networkEventName, networkChangedListener);
      this.providerEventListeners.set(networkEventName, networkChangedListener);

      provider.on('disconnect', disconnectListener);
      this.providerEventListeners.set('disconnect', disconnectListener);

      this.isEventListenersSetup = true;
      console.log('✅ 이벤트 리스너 설정 완료');
    } catch (error) {
      console.warn('이벤트 리스너 설정 중 오류:', error);
    }
  }
}
