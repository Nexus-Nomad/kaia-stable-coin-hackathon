import { Contract } from 'ethers';
import {
  KAIA_DID_CONTRACT,
  KAIA_DID_ABI,
  GAS_CONFIG,
} from '../config/contracts';
import { TransactionParams, TransactionResult } from '../types/wallet.types';

/**
 * 신분증 정보 인터페이스
 */
export interface IdentityInfo {
  name: string;
  birthDate: string;
  address: string;
  phone: string;
}

/**
 * KaiaDID3 DID 문서 정보
 */
export interface DIDDocument extends IdentityInfo {
  homeAddress: string; // 컨트랙트에서 반환하는 실제 필드명
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  version: number;
}

/**
 * 발급된 신분증 정보 (레거시 호환)
 */
export interface IssuedIdentity extends IdentityInfo {
  tokenId: string;
  issueDate: number;
  owner: string;
}

/**
 * 트랜잭션 상태
 */
export interface TransactionStatus {
  status: 'pending' | 'confirmed' | 'failed';
  hash?: string;
  blockNumber?: number;
  gasUsed?: string;
  error?: string;
}

/**
 * KaiaDID3 컨트랙트 서비스 - 향상된 기능들 포함
 */
export class KaiaDIDService {
  /**
   * 신분증 발급 트랜잭션 파라미터 생성
   */
  async createIssueIdentityTransaction(
    identityInfo: IdentityInfo,
    fromAddress?: string
  ): Promise<TransactionParams> {
    console.log('🔍 신분증 정보:', identityInfo);

    try {
      // 실제 KaiaDID3 컨트랙트 인스턴스 생성
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);

      // createDID 함수 호출 데이터 인코딩
      const data = contract.interface.encodeFunctionData('createDID', [
        identityInfo.name, // _name
        identityInfo.birthDate, // _birthDate
        identityInfo.address, // _homeAddress
        identityInfo.phone, // _phone
      ]);

      console.log('🔍 createDID 트랜잭션 생성:', {
        to: KAIA_DID_CONTRACT.address,
        data,
        functionName: 'createDID',
        params: {
          name: identityInfo.name,
          birthDate: identityInfo.birthDate,
          homeAddress: identityInfo.address,
          phone: identityInfo.phone,
        },
      });

      // Gas 설정 - 안전한 기본값 사용
      const gasLimit =
        GAS_CONFIG.issueIdentity?.gasLimit || GAS_CONFIG.gasLimit;
      const gasPrice =
        GAS_CONFIG.issueIdentity?.gasPrice || GAS_CONFIG.gasPrice;

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
        gas: gasLimit,
        gasPrice: gasPrice,
        value: '0',
      };
    } catch (error) {
      console.error('❌ createDID 트랜잭션 생성 실패:', error);
      throw error;
    }
  }

  /**
   * DID 업데이트 트랜잭션 파라미터 생성
   */
  async createUpdateDIDTransaction(
    identityInfo: IdentityInfo
  ): Promise<TransactionParams> {
    console.log('🔄 DID 업데이트 정보:', identityInfo);

    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);

      const data = contract.interface.encodeFunctionData('updateDID', [
        identityInfo.name,
        identityInfo.birthDate,
        identityInfo.address,
        identityInfo.phone,
      ]);

      // Gas 설정 - 안전한 기본값 사용
      const gasLimit = GAS_CONFIG.updateDID?.gasLimit || GAS_CONFIG.gasLimit;
      const gasPrice = GAS_CONFIG.updateDID?.gasPrice || GAS_CONFIG.gasPrice;

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
        gas: gasLimit,
        gasPrice: gasPrice,
        value: '0',
      };
    } catch (error) {
      console.error('❌ updateDID 트랜잭션 생성 실패:', error);
      throw error;
    }
  }

  /**
   * DID 비활성화 트랜잭션 파라미터 생성
   */
  async createDeactivateDIDTransaction(): Promise<TransactionParams> {
    console.log('🚫 DID 비활성화 트랜잭션 생성');

    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);

      const data = contract.interface.encodeFunctionData(
        'deactivateLatestDID',
        []
      );

      // Gas 설정 - 안전한 기본값 사용
      const gasLimit =
        GAS_CONFIG.deactivateDID?.gasLimit || GAS_CONFIG.gasLimit;
      const gasPrice =
        GAS_CONFIG.deactivateDID?.gasPrice || GAS_CONFIG.gasPrice;

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
        gas: gasLimit,
        gasPrice: gasPrice,
        value: '0',
      };
    } catch (error) {
      console.error('❌ deactivateLatestDID 트랜잭션 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 내 최신 DID 조회 파라미터 생성 - 단순화된 버전
   */
  createGetMyLatestDIDCall(): { to: string; data: string } {
    try {
      console.log('🔍 컨트랙트 주소:', KAIA_DID_CONTRACT.address);
      console.log(
        '🔍 사용할 ABI 함수들:',
        KAIA_DID_ABI.filter(
          (item) => item.type === 'function' && item.name?.includes('DID')
        )
      );

      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);

      // 함수가 ABI에 있는지 확인
      const fragment = contract.interface.getFunction('getMyLatestDID');
      console.log('🔍 찾은 함수 fragment:', fragment);

      const data = contract.interface.encodeFunctionData('getMyLatestDID', []);
      console.log('🔍 생성된 함수 데이터:', data);

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getMyLatestDID 호출 생성 실패:', error);
      console.error(
        '❌ 사용 가능한 함수들:',
        KAIA_DID_ABI.filter((item) => item.type === 'function').map(
          (f) => f.name
        )
      );
      throw error;
    }
  }

  /**
   * DID 조회 결과 디코딩
   */
  decodeDIDResult(data: string): DIDDocument | null {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const result = contract.interface.decodeFunctionResult(
        'getMyLatestDID',
        data
      );

      if (!result || !result[0]) {
        return null;
      }

      const didData = result[0];

      // 빈 DID인지 확인 (name이 비어있으면 DID가 없는 것으로 간주)
      if (!didData.name || didData.name === '') {
        return null;
      }

      return {
        name: didData.name,
        birthDate: didData.birthDate,
        address: didData.homeAddress, // homeAddress를 address로 매핑
        homeAddress: didData.homeAddress, // 기존 호환성을 위해 유지
        phone: didData.phone,
        isActive: didData.isActive,
        createdAt: Number(didData.createdAt),
        updatedAt: Number(didData.updatedAt),
        version: Number(didData.version),
      };
    } catch (error) {
      console.error('❌ DID 결과 디코딩 실패:', error);
      return null;
    }
  }

  /**
   * 내 모든 DID 히스토리 조회 파라미터 생성
   */
  createGetMyAllDIDHistoryCall(): { to: string; data: string } {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'getMyAllDIDHistory',
        []
      );

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getMyAllDIDHistory 호출 생성 실패:', error);
      throw error;
    }
  }

  /**
   * DID 보유 여부 확인 파라미터 생성
   */
  createHasActiveDIDCall(userAddress: string): { to: string; data: string } {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('hasActiveDIDPublic', [
        userAddress,
      ]);

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ hasActiveDIDPublic 호출 생성 실패:', error);
      throw error;
    }
  }

  /**
   * DID 버전 수 조회 파라미터 생성
   */
  createGetDIDVersionCountCall(userAddress: string): {
    to: string;
    data: string;
  } {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('getDIDVersionCount', [
        userAddress,
      ]);

      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getDIDVersionCount 호출 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 컨트랙트 통계 함수들
   */
  createGetTotalActiveDIDsCall() {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'getTotalActiveDIDs',
        []
      );
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getTotalActiveDIDs 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetTotalRegisteredAddressesCall() {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'getTotalRegisteredAddresses',
        []
      );
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getTotalRegisteredAddresses 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetAllActiveDIDAddressesCall() {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'getAllActiveDIDAddresses',
        []
      );
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getAllActiveDIDAddresses 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetAllRegisteredAddressesCall() {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'getAllRegisteredAddresses',
        []
      );
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getAllRegisteredAddresses 호출 생성 실패:', error);
      throw error;
    }
  }

  createHasRegisteredCall(userAddress: string) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('hasRegistered', [
        userAddress,
      ]);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ hasRegistered 호출 생성 실패:', error);
      throw error;
    }
  }

  // 추가된 모든 get 함수들
  createGetAllDIDHistoryCall(userAddress: string) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('getAllDIDHistory', [
        userAddress,
      ]);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getAllDIDHistory 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetDIDByVersionCall(userAddress: string, version: number) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('getDIDByVersion', [
        userAddress,
        version,
      ]);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getDIDByVersion 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetLatestDIDCall(userAddress: string) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('getLatestDID', [
        userAddress,
      ]);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ getLatestDID 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetOwnerCall() {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('owner', []);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ owner 호출 생성 실패:', error);
      throw error;
    }
  }

  createGetRegisteredAddressesCall(index: number) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData(
        'registeredAddresses',
        [index]
      );
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ registeredAddresses 호출 생성 실패:', error);
      throw error;
    }
  }

  createDidDocumentHistoryCall(userAddress: string, index: number) {
    try {
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const data = contract.interface.encodeFunctionData('didDocumentHistory', [
        userAddress,
        index,
      ]);
      return {
        to: KAIA_DID_CONTRACT.address,
        data,
      };
    } catch (error) {
      console.error('❌ didDocumentHistory 호출 생성 실패:', error);
      throw error;
    }
  }

  /**
   * DID 히스토리 결과 디코딩
   */
  decodeDIDHistoryResult(data: string): DIDDocument[] {
    try {
      console.log(
        '🔍 DID 히스토리 디코딩 시도:',
        data.substring(0, 100) + '...'
      );

      if (
        !data ||
        data === '0x' ||
        data ===
          '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000'
      ) {
        console.log('📭 빈 히스토리 데이터');
        return [];
      }

      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const decoded = contract.interface.decodeFunctionResult(
        'getMyAllDIDHistory',
        data
      );

      console.log('🔍 히스토리 디코딩된 결과:', decoded);

      const historyArray = decoded[0];

      if (!Array.isArray(historyArray) || historyArray.length === 0) {
        console.log('📭 빈 히스토리 배열');
        return [];
      }

      return historyArray.map((didData: any) => ({
        name: didData.name,
        birthDate: didData.birthDate,
        homeAddress: didData.homeAddress,
        phone: didData.phone,
        isActive: didData.isActive,
        createdAt: Number(didData.createdAt),
        updatedAt: Number(didData.updatedAt),
        version: Number(didData.version),
      }));
    } catch (error) {
      console.error('❌ DID 히스토리 디코딩 실패:', error);
      return [];
    }
  }

  /**
   * 주소 목록 디코딩
   */
  decodeAddressListResult(data: string): string[] {
    try {
      if (!data || data === '0x') {
        return [];
      }

      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const decoded = contract.interface.decodeFunctionResult(
        'getAllRegisteredAddresses',
        data
      );

      return decoded[0] || [];
    } catch (error) {
      console.error('❌ 주소 목록 디코딩 실패:', error);
      return [];
    }
  }
}
