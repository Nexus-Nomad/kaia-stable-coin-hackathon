import { useState, useEffect, useCallback } from 'react';
import {
  WalletAdapter,
  WalletProvider,
  WalletState,
  WalletConnectionStatus,
  Account,
  Network,
  TransactionParams,
} from '@/lib/kaia';

import { toast } from '@/hooks/use-toast';

export const useKaiaWallet = () => {
  const [walletAdapter] = useState(() => new WalletAdapter());
  const [walletState, setWalletState] = useState<WalletState>({
    status: WalletConnectionStatus.DISCONNECTED,
    account: null,
    network: null,
    provider: null,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 지갑 상태 업데이트
  const updateWalletState = useCallback(() => {
    const currentWallet = walletAdapter.getCurrentWallet();
    console.log('🔍 updateWalletState 호출:', {
      hasCurrentWallet: !!currentWallet,
      currentWalletState: currentWallet?.getState(),
    });

    if (currentWallet) {
      const newState = currentWallet.getState();
      console.log('🔍 새로운 지갑 상태:', newState);
      setWalletState(newState);
    } else {
      console.log('❌ 현재 지갑이 없음, 상태를 DISCONNECTED로 설정');
      setWalletState({
        status: WalletConnectionStatus.DISCONNECTED,
        account: null,
        network: null,
        provider: null,
        error: null,
      });
    }
  }, [walletAdapter]);

  // 사용 가능한 지갑 목록 조회
  const getAvailableWallets = useCallback(() => {
    const wallets = walletAdapter.getAvailableWallets();
    console.log('🔍 Available wallets detected:', wallets);

    // 디버깅: window 객체의 지갑 관련 프로퍼티 확인
    if (typeof window !== 'undefined') {
      console.log('🔍 Window properties:', {
        hasKlaytn: !!window.klaytn,
        kaikasCheck: window.klaytn?.isKaikas,
        hasEthereum: !!window.ethereum,
        metamaskCheck: (window.ethereum as any)?.isMetaMask || false,
        phantomCheck: (window.ethereum as any)?.isPhantom || false,
        hasPhantom: !!window.phantom,
      });
    }

    return wallets;
  }, [walletAdapter]);

  // 지갑 연결
  const connectWallet = useCallback(
    async (provider: WalletProvider) => {
      console.log('🔍 지갑 연결 시도:', provider);
      setIsLoading(true);

      try {
        // 이전 연결 정리 (안전한 재시도를 위해)
        const currentWallet = walletAdapter.getCurrentWallet();
        if (
          currentWallet &&
          currentWallet.getState().status !== 'disconnected'
        ) {
          console.log('🔍 기존 지갑 연결 정리 중...');
          await currentWallet.disconnect();
        }

        const wallet = walletAdapter.selectWallet(provider);
        console.log('🔍 선택된 지갑:', wallet);

        // 이벤트 리스너는 지갑 서비스 내부에서 관리되므로 여기서는 제거
        // 대신 한 번만 등록하여 중복 방지
        const hasListeners = wallet.listenerCount('connect') > 0;

        if (!hasListeners) {
          wallet.on('connect', (account: Account) => {
            console.log('✅ 지갑 연결 이벤트 발생:', account);
            updateWalletState();
            toast({
              title: '지갑 연결 성공',
              description: `주소: ${account.address.slice(
                0,
                6
              )}...${account.address.slice(-4)}`,
            });
          });

          wallet.on('disconnect', () => {
            console.log('❌ 지갑 연결 해제 이벤트 발생');
            updateWalletState();
            toast({
              title: '지갑 연결 해제',
              description: '지갑 연결이 해제되었습니다.',
            });
          });

          wallet.on('error', (error: Error) => {
            console.error('❌ 지갑 오류 이벤트:', error);
            updateWalletState();
            toast({
              title: '지갑 오류',
              description: error.message,
              variant: 'destructive',
            });
          });

          wallet.on('accountsChanged', () => {
            console.log('🔄 계정 변경 이벤트 발생');
            updateWalletState();
            toast({
              title: '계정 변경',
              description: '지갑 계정이 변경되었습니다.',
            });
          });

          wallet.on('chainChanged', () => {
            console.log('🔄 네트워크 변경 이벤트 발생');
            updateWalletState();
            toast({
              title: '네트워크 변경',
              description: '네트워크가 변경되었습니다.',
            });
          });
        }

        console.log('🔍 지갑 연결 실행 중...');
        await wallet.connect();
        console.log('✅ 지갑 연결 완료, 상태 업데이트 중...');
        updateWalletState();

        // 연결 후 상태 재확인
        setTimeout(() => {
          console.log('🔍 연결 후 지갑 상태 재확인:');
          updateWalletState();
        }, 500);
      } catch (error) {
        console.error('❌ 지갑 연결 실패:', error);

        // 연결 실패 시 확실한 상태 정리
        updateWalletState();

        // 사용자 친화적 에러 메시지
        let errorMessage = (error as Error).message;
        if (errorMessage.includes('User rejected')) {
          errorMessage = '사용자가 지갑 연결을 거부했습니다.';
        } else if (errorMessage.includes('already pending')) {
          errorMessage =
            '이미 연결 요청이 진행 중입니다. 잠시 후 다시 시도해주세요.';
        }

        toast({
          title: '지갑 연결 실패',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [walletAdapter, updateWalletState]
  );

  // 지갑 연결 해제
  const disconnectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      await walletAdapter.disconnectAll();
      updateWalletState();
    } catch (error) {
      console.error('지갑 연결 해제 실패:', error);
      toast({
        title: '연결 해제 실패',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [walletAdapter, updateWalletState]);

  // 네트워크 변경
  const switchNetwork = useCallback(
    async (chainId: number) => {
      const currentWallet = walletAdapter.getCurrentWallet();
      if (!currentWallet) {
        toast({
          title: '지갑 미연결',
          description: '먼저 지갑을 연결해주세요.',
          variant: 'destructive',
        });
        return;
      }

      setIsLoading(true);
      try {
        await currentWallet.switchNetwork(chainId);
        updateWalletState();
        toast({
          title: '네트워크 변경 성공',
          description: '네트워크가 성공적으로 변경되었습니다.',
        });
      } catch (error) {
        console.error('네트워크 변경 실패:', error);
        toast({
          title: '네트워크 변경 실패',
          description: (error as Error).message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [walletAdapter, updateWalletState]
  );

  // 메시지 서명
  const signMessage = useCallback(
    async (message: string) => {
      const currentWallet = walletAdapter.getCurrentWallet();
      if (!currentWallet) {
        throw new Error('지갑이 연결되지 않았습니다.');
      }

      try {
        return await currentWallet.signMessage(message);
      } catch (error) {
        console.error('메시지 서명 실패:', error);
        toast({
          title: '서명 실패',
          description: (error as Error).message,
          variant: 'destructive',
        });
        throw error;
      }
    },
    [walletAdapter]
  );

  // 잔액 조회
  const getBalance = useCallback(
    async (address?: string) => {
      const currentWallet = walletAdapter.getCurrentWallet();
      if (!currentWallet) {
        throw new Error('지갑이 연결되지 않았습니다.');
      }

      try {
        return await currentWallet.getBalance(address);
      } catch (error) {
        console.error('잔액 조회 실패:', error);
        throw error;
      }
    },
    [walletAdapter]
  );

  // 초기화 시 상태 업데이트 (지갑 로딩 대기)
  useEffect(() => {
    // 즉시 한번 체크
    updateWalletState();

    // 지갑이 늦게 로드될 수 있으므로 지연 체크
    const timer = setTimeout(() => {
      console.log('🔍 Delayed wallet check...');
      updateWalletState();
    }, 1000);

    return () => clearTimeout(timer);
  }, [updateWalletState]);

  // 연결 상태 변경 감지 시 추가 검증
  useEffect(() => {
    if (
      walletState.status === WalletConnectionStatus.CONNECTED &&
      walletState.account
    ) {
      console.log('✅ 지갑 연결 상태 확인됨:', {
        address: walletState.account.address,
        network: walletState.network?.name,
      });
    }
  }, [walletState.status, walletState.account, walletState.network]);

  // 트랜잭션 전송
  const sendTransaction = useCallback(
    async (params: TransactionParams) => {
      const currentWallet = walletAdapter.getCurrentWallet();
      if (!currentWallet) {
        throw new Error('지갑이 연결되지 않았습니다.');
      }

      try {
        return await currentWallet.sendTransaction(params);
      } catch (error) {
        console.error('트랜잭션 전송 실패:', error);
        toast({
          title: '트랜잭션 실패',
          description: (error as Error).message,
          variant: 'destructive',
        });
        throw error;
      }
    },
    [walletAdapter]
  );

  // isConnected 상태 계산
  const isConnected = walletState.status === WalletConnectionStatus.CONNECTED;

  // 디버깅을 위한 로깅
  console.log('🔍 useKaiaWallet 상태:', {
    walletStatus: walletState.status,
    isConnected,
    hasAccount: !!walletState.account,
    accountAddress: walletState.account?.address,
    networkChainId: walletState.network?.chainId,
  });

  return {
    walletState,
    isLoading,
    availableWallets: getAvailableWallets(),
    connectWallet,
    disconnectWallet,
    switchNetwork,
    signMessage,
    getBalance,
    sendTransaction,
    isConnected,
    account: walletState.account,
    network: walletState.network,
    currentProvider: walletState.provider,
    walletAdapter, // 내부 사용을 위해 노출
  };
};
