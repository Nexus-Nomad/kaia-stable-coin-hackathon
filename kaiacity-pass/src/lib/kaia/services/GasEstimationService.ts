import { ethers, Contract, JsonRpcProvider } from 'ethers';
import { GasEstimate, TransactionParams, Network } from '../types/wallet.types';
import {
  KAIA_DID_CONTRACT,
  KAIA_DID_ABI,
  GAS_CONFIG,
} from '../config/contracts';

/**
 * Gas 예측 및 최적화 서비스
 */
export class GasEstimationService {
  private provider: JsonRpcProvider;

  constructor(provider: JsonRpcProvider) {
    this.provider = provider;
  }

  /**
   * 트랜잭션의 Gas 사용량을 예측합니다
   */
  async estimateGas(
    txParams: Partial<TransactionParams>,
    from: string
  ): Promise<GasEstimate> {
    try {
      console.log('🔍 Gas 예측 시작:', { txParams, from });

      // Gas limit 예측
      const estimatedGasLimit = await this.provider.estimateGas({
        to: txParams.to,
        from: from,
        data: txParams.data || '0x',
        value: txParams.value || '0',
      });

      // 안전 마진 추가 (20% 여유)
      const gasLimitWithMargin = (estimatedGasLimit * 120n) / 100n;

      // Gas price 가져오기
      const gasPrice = await this.getOptimalGasPrice();

      // 예상 비용 계산
      const estimatedCost = gasLimitWithMargin * gasPrice;

      const result: GasEstimate = {
        gasLimit: gasLimitWithMargin.toString(),
        gasPrice: gasPrice.toString(),
        estimatedCost: estimatedCost.toString(),
      };

      console.log('✅ Gas 예측 완료:', result);
      return result;
    } catch (error) {
      console.error('❌ Gas 예측 실패:', error);

      // 예측 실패 시 기본값 반환
      return this.getFallbackGasEstimate();
    }
  }

  /**
   * 신분증 발급을 위한 Gas 예측
   */
  async estimateIssueIdentityGas(
    identityInfo: {
      name: string;
      birthDate: string;
      address: string;
      phone: string;
    },
    from: string
  ): Promise<GasEstimate> {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);

      // createDID 함수 호출 데이터 생성
      const data = contract.interface.encodeFunctionData('createDID', [
        identityInfo.name,
        identityInfo.birthDate,
        identityInfo.address,
        identityInfo.phone,
      ]);

      return await this.estimateGas(
        {
          to: KAIA_DID_CONTRACT.address,
          data,
          value: '0',
        },
        from
      );
    } catch (error) {
      console.error('❌ 신분증 발급 Gas 예측 실패:', error);

      // 신분증 발급용 기본 Gas 설정 반환
      const gasPrice = await this.getOptimalGasPrice();
      const gasLimit = GAS_CONFIG.issueIdentity?.gasLimit || '500000';

      return {
        gasLimit,
        gasPrice: gasPrice.toString(),
        estimatedCost: (BigInt(gasLimit) * gasPrice).toString(),
      };
    }
  }

  /**
   * 최적의 Gas Price를 계산합니다
   */
  async getOptimalGasPrice(): Promise<bigint> {
    try {
      // 현재 네트워크의 Gas Price 가져오기
      const currentGasPrice = await this.provider.getFeeData();

      // Kaia 네트워크의 경우 고정 Gas Price 사용
      const kaiaGasPrice = 25000000000n; // 25 Gwei

      // 현재 Gas Price와 설정된 Gas Price 중 더 높은 값 사용
      const networkGasPrice = currentGasPrice.gasPrice || kaiaGasPrice;
      return networkGasPrice > kaiaGasPrice ? networkGasPrice : kaiaGasPrice;
    } catch (error) {
      console.error('❌ Gas Price 조회 실패:', error);

      // 기본 Gas Price 반환
      return BigInt(GAS_CONFIG.gasPrice);
    }
  }

  /**
   * 네트워크 상태에 따른 Gas Price 배수 적용
   */
  async getAdjustedGasPrice(multiplier: number = 1.0): Promise<string> {
    const baseGasPrice = await this.getOptimalGasPrice();
    const adjustedGasPrice =
      (baseGasPrice * BigInt(Math.floor(multiplier * 100))) / 100n;

    return adjustedGasPrice.toString();
  }

  /**
   * Gas 예측 실패 시 사용할 기본값
   */
  private getFallbackGasEstimate(): GasEstimate {
    return {
      gasLimit: GAS_CONFIG.gasLimit,
      gasPrice: GAS_CONFIG.gasPrice,
      estimatedCost: (
        BigInt(GAS_CONFIG.gasLimit) * BigInt(GAS_CONFIG.gasPrice)
      ).toString(),
    };
  }

  /**
   * 트랜잭션 실패 시 Gas 설정을 증가시킵니다
   */
  async getRetryGasSettings(
    previousEstimate: GasEstimate,
    retryCount: number
  ): Promise<GasEstimate> {
    // 재시도할 때마다 Gas를 점진적으로 증가
    const gasMultiplier = 1 + retryCount * 0.2; // 20%씩 증가
    const priceMultiplier = 1 + retryCount * 0.1; // 10%씩 증가

    const newGasLimit =
      (BigInt(previousEstimate.gasLimit) *
        BigInt(Math.floor(gasMultiplier * 100))) /
      100n;

    const newGasPrice =
      (BigInt(previousEstimate.gasPrice) *
        BigInt(Math.floor(priceMultiplier * 100))) /
      100n;

    return {
      gasLimit: newGasLimit.toString(),
      gasPrice: newGasPrice.toString(),
      estimatedCost: (newGasLimit * newGasPrice).toString(),
    };
  }

  /**
   * 현재 네트워크의 Gas 사용 통계를 확인합니다
   */
  async getNetworkGasStats(): Promise<{
    averageGasPrice: string;
    fastGasPrice: string;
    blockUtilization: number;
  }> {
    try {
      const feeData = await this.provider.getFeeData();
      const latestBlock = await this.provider.getBlock('latest');

      // 블록 사용률 계산 (가스 사용량/가스 한도)
      const blockUtilization = Number(
        (latestBlock!.gasUsed * 100n) / latestBlock!.gasLimit
      );

      const gasPrice = feeData.gasPrice || BigInt(GAS_CONFIG.gasPrice);

      return {
        averageGasPrice: gasPrice.toString(),
        fastGasPrice: ((gasPrice * 110n) / 100n).toString(), // 10% 더 높은 가격
        blockUtilization,
      };
    } catch (error) {
      console.error('❌ 네트워크 Gas 통계 조회 실패:', error);

      return {
        averageGasPrice: GAS_CONFIG.gasPrice,
        fastGasPrice: ((BigInt(GAS_CONFIG.gasPrice) * 110n) / 100n).toString(),
        blockUtilization: 50, // 기본값
      };
    }
  }
}
