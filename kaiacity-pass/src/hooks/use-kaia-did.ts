import { useState, useCallback } from 'react';
import { useKaiaWallet } from './use-kaia-wallet';
import {
  KaiaDIDService,
  IdentityInfo,
  DIDDocument,
} from '@/lib/kaia/services/KaiaDIDService';
import { TransactionResult } from '@/lib/kaia/types/wallet.types';
import { toast } from './use-toast';
import { KAIA_DID_CONTRACT, KAIA_DID_ABI } from '@/lib/kaia/config/contracts';
import { Contract } from 'ethers';

// 전역 타입 정의
declare global {
  interface Window {
    klaytn?: {
      request(args: { method: string; params?: unknown[] }): Promise<unknown>;
      isKaikas?: boolean;
    };
    ethereum?: {
      request(args: { method: string; params?: unknown[] }): Promise<unknown>;
      isMetaMask?: boolean;
    };
  }
}

/**
 * KaiaDID 컨트랙트와 상호작용하는 커스텀 훅
 */
export const useKaiaDID = (
  walletInstance?: ReturnType<typeof useKaiaWallet>
) => {
  const defaultWallet = useKaiaWallet();
  const { isConnected, walletState, sendTransaction } =
    walletInstance || defaultWallet;
  const [isIssuing, setIsIssuing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [lastTransaction, setLastTransaction] =
    useState<TransactionResult | null>(null);
  const [myLatestDID, setMyLatestDID] = useState<DIDDocument | null>(null);
  const [myDIDHistory, setMyDIDHistory] = useState<DIDDocument[]>([]);
  const [isFetching, setIsFetching] = useState(false); // 중복 호출 방지

  const didService = new KaiaDIDService();

  /**
   * 신분증 발급
   */
  const issueIdentity = useCallback(
    async (identityInfo: IdentityInfo) => {
      // 디버깅 로그 추가
      console.log('🔍 신분증 발급 시도:', {
        isConnected,
        hasAccount: !!walletState.account,
        accountAddress: walletState.account?.address,
        walletStatus: walletState.status,
        networkChainId: walletState.network?.chainId,
      });

      if (!isConnected || !walletState.account) {
        console.error('❌ 지갑 연결 상태 확인 실패:', {
          isConnected,
          hasAccount: !!walletState.account,
        });

        toast({
          title: '지갑 연결 필요',
          description: '먼저 지갑을 연결해주세요.',
          variant: 'destructive',
        });
        return null;
      }

      // 카이아 테스트넷 확인
      if (walletState.network?.chainId !== 1001) {
        toast({
          title: '네트워크 오류',
          description: '카이아 테스트넷(Kairos)에 연결해주세요.',
          variant: 'destructive',
        });
        return null;
      }

      setIsIssuing(true);

      try {
        // 트랜잭션 파라미터 생성
        const txParams = await didService.createIssueIdentityTransaction(
          identityInfo
        );

        toast({
          title: '신분증 발급 중...',
          description: '트랜잭션을 처리하고 있습니다.',
        });

        // 실제 트랜잭션 전송
        const result = await sendTransaction(txParams);

        setLastTransaction(result);

        toast({
          title: '신분증 발급 성공!',
          description: `트랜잭션 해시: ${result.hash.slice(0, 10)}...`,
        });

        return result;
      } catch (error) {
        console.error('신분증 발급 실패:', error);
        toast({
          title: '신분증 발급 실패',
          description: (error as Error).message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsIssuing(false);
      }
    },
    [isConnected, walletState, sendTransaction, didService]
  );

  /**
   * DID 업데이트
   */
  const updateDID = useCallback(
    async (identityInfo: IdentityInfo) => {
      if (!isConnected || !walletState.account) {
        toast({
          title: '지갑 연결 필요',
          description: '먼저 지갑을 연결해주세요.',
          variant: 'destructive',
        });
        return null;
      }

      if (walletState.network?.chainId !== 1001) {
        toast({
          title: '네트워크 오류',
          description: '카이아 테스트넷(Kairos)에 연결해주세요.',
          variant: 'destructive',
        });
        return null;
      }

      setIsUpdating(true);

      try {
        const txParams = await didService.createUpdateDIDTransaction(
          identityInfo
        );

        toast({
          title: 'DID 업데이트 중...',
          description: '트랜잭션을 처리하고 있습니다.',
        });

        const result = await sendTransaction(txParams);
        setLastTransaction(result);

        toast({
          title: 'DID 업데이트 성공!',
          description: `트랜잭션 해시: ${result.hash.slice(0, 10)}...`,
        });

        return result;
      } catch (error) {
        console.error('DID 업데이트 실패:', error);
        toast({
          title: 'DID 업데이트 실패',
          description: (error as Error).message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [isConnected, walletState, sendTransaction, didService]
  );

  /**
   * DID 비활성화
   */
  const deactivateDID = useCallback(async () => {
    if (!isConnected || !walletState.account) {
      toast({
        title: '지갑 연결 필요',
        description: '먼저 지갑을 연결해주세요.',
        variant: 'destructive',
      });
      return null;
    }

    if (walletState.network?.chainId !== 1001) {
      toast({
        title: '네트워크 오류',
        description: '카이아 테스트넷(Kairos)에 연결해주세요.',
        variant: 'destructive',
      });
      return null;
    }

    setIsDeactivating(true);

    try {
      const txParams = await didService.createDeactivateDIDTransaction();

      toast({
        title: 'DID 비활성화 중...',
        description: '트랜잭션을 처리하고 있습니다.',
      });

      const result = await sendTransaction(txParams);
      setLastTransaction(result);

      toast({
        title: 'DID 비활성화 성공!',
        description: `트랜잭션 해시: ${result.hash.slice(0, 10)}...`,
      });

      return result;
    } catch (error) {
      console.error('DID 비활성화 실패:', error);
      toast({
        title: 'DID 비활성화 실패',
        description: (error as Error).message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsDeactivating(false);
    }
  }, [isConnected, walletState, sendTransaction, didService]);

  /**
   * 내 최신 DID 조회
   */
  const fetchMyLatestDID = useCallback(async () => {
    console.log('🔍 fetchMyLatestDID 호출됨:', {
      isConnected,
      hasAccount: !!walletState.account,
      chainId: walletState.network?.chainId,
      isFetching,
    });

    // 중복 호출 방지
    if (isFetching) {
      console.log('⏸️ 이미 조회 중입니다. 중복 호출을 방지합니다.');
      return myLatestDID;
    }

    if (!isConnected || !walletState.account) {
      console.warn('⚠️ 지갑이 연결되지 않았습니다');
      setMyLatestDID(null);
      return null;
    }

    setIsFetching(true);

    if (walletState.network?.chainId !== 1001) {
      console.warn(
        '⚠️ 카이아 테스트넷이 아닙니다. 현재 체인:',
        walletState.network?.chainId
      );
      setMyLatestDID(null);
      return null;
    }

    try {
      console.log('🔍 DID 조회 시작...');
      console.log('🔍 사용자 주소:', walletState.account.address);

      // window.klaytn 또는 window.ethereum을 직접 사용
      let provider: any = null;
      if (typeof window !== 'undefined') {
        provider = window.klaytn || window.ethereum;
      }

      if (!provider) {
        throw new Error('지갑 provider를 찾을 수 없습니다');
      }

      console.log(
        '🔍 사용할 provider:',
        provider.isKaikas ? 'Kaikas' : 'Unknown'
      );

      // 0단계: 네트워크 연결 테스트
      console.log('🔍 0단계: 네트워크 연결 테스트');
      try {
        const blockNumber = await provider.request({
          method: 'eth_blockNumber',
          params: [],
        });
        console.log('📡 현재 블록 번호:', blockNumber);

        // 컨트랙트 코드 확인
        const contractCode = await provider.request({
          method: 'eth_getCode',
          params: [KAIA_DID_CONTRACT.address, 'latest'],
        });
        console.log(
          '📡 컨트랙트 코드 존재 여부:',
          contractCode !== '0x' && contractCode !== '0x0'
        );

        if (contractCode === '0x' || contractCode === '0x0') {
          throw new Error('컨트랙트가 해당 주소에 배포되지 않았습니다');
        }
      } catch (networkError) {
        console.error('❌ 네트워크 테스트 실패:', networkError);
        throw networkError;
      }

      // 1단계: 먼저 간단한 함수부터 테스트 (hasActiveDIDPublic)
      console.log('🔍 1단계: hasActiveDIDPublic 테스트');
      try {
        const hasActiveDIDParams = didService.createHasActiveDIDCall(
          walletState.account.address
        );
        console.log('📋 hasActiveDIDPublic 호출 파라미터:', hasActiveDIDParams);

        const hasActiveDIDResult = await provider.request({
          method: 'eth_call',
          params: [
            {
              to: hasActiveDIDParams.to,
              data: hasActiveDIDParams.data,
            },
            'latest',
          ],
        });

        console.log('📡 hasActiveDIDPublic 결과:', hasActiveDIDResult);
        const hasDID =
          hasActiveDIDResult !==
          '0x0000000000000000000000000000000000000000000000000000000000000000';
        console.log('🔍 DID 보유 여부:', hasDID);

        if (!hasDID) {
          console.log('❌ hasActiveDIDPublic: DID가 존재하지 않습니다');
          setMyLatestDID(null);
          return null;
        }
      } catch (hasActiveError) {
        console.error('❌ hasActiveDIDPublic 실패:', hasActiveError);
        // hasActiveDIDPublic 실패해도 getMyLatestDID는 시도
      }

      // 2단계: 실제 DID 데이터 조회 및 파싱
      console.log('🔍 2단계: 실제 DID 데이터 조회');

      // getMyLatestDID는 Internal JSON-RPC error가 발생하므로 대신
      // getLatestDID(address)를 사용해서 직접 주소 전달
      try {
        console.log('🔍 getLatestDID(address)로 DID 조회 시도...');
        const latestParams = didService.createGetLatestDIDCall(
          walletState.account.address
        );
        console.log('📋 getLatestDID 호출 파라미터:', latestParams);

        const latestResult = await provider.request({
          method: 'eth_call',
          params: [
            {
              to: latestParams.to,
              data: latestParams.data,
              gas: '0x5F5E100',
            },
            'latest',
          ],
        });

        console.log(
          '📡 getLatestDID 조회 결과:',
          latestResult.substring(0, 200)
        );

        // getLatestDID 결과 디코딩 (getMyLatestDID와 동일한 구조)
        const latestDID = didService.decodeDIDResult(latestResult);
        if (latestDID) {
          console.log('✅ getLatestDID로 DID 조회 성공:', latestDID);
          setMyLatestDID(latestDID);
          return latestDID;
        } else {
          console.log('📭 getLatestDID 결과 없음');
        }
      } catch (latestError) {
        console.warn('⚠️ getLatestDID 실패, 히스토리로 대체:', latestError);
      }

      // getLatestDID 실패 시 getMyAllDIDHistory로 대체
      try {
        console.log('🔍 getMyAllDIDHistory로 대체 시도...');
        const historyParams = didService.createGetMyAllDIDHistoryCall();
        const historyResult = await provider.request({
          method: 'eth_call',
          params: [
            {
              to: historyParams.to,
              data: historyParams.data,
              gas: '0x5F5E100',
            },
            'latest',
          ],
        });

        console.log(
          '📡 getMyAllDIDHistory 조회 결과:',
          historyResult.substring(0, 100) + '...'
        );

        // 히스토리 디코딩
        const didHistory = didService.decodeDIDHistoryResult(historyResult);
        console.log('📚 디코딩된 DID 히스토리:', didHistory);

        if (didHistory && didHistory.length > 0) {
          // 활성화된 DID 중에서 가장 최신 버전 찾기
          const activeDIDs = didHistory.filter((did) => did.isActive);
          console.log('🔍 활성 DID 목록:', activeDIDs);
          console.log('📊 전체 히스토리 개수:', didHistory.length);
          console.log('📊 활성 DID 개수:', activeDIDs.length);

          let latestDID;
          if (activeDIDs.length > 0) {
            // 활성 DID 중 가장 높은 버전
            latestDID = activeDIDs.reduce((latest, current) =>
              current.version > latest.version ? current : latest
            );
            console.log('✅ 활성 DID 중 최신 선택:', latestDID);
          } else {
            // 활성 DID가 없으면 전체 중 가장 최신
            latestDID = didHistory.reduce((latest, current) =>
              current.version > latest.version ? current : latest
            );
            console.log('⚠️ 활성 DID 없음, 전체 중 최신 선택:', latestDID);
          }

          console.log('🎯 최종 setMyLatestDID 호출:', latestDID);
          setMyLatestDID(latestDID);
          return latestDID;
        } else {
          console.log('📭 DID 히스토리가 비어있음 - DID가 존재하지 않습니다');
          if (myLatestDID !== null) {
            setMyLatestDID(null);
          }
          return null;
        }
      } catch (historyError) {
        console.error('❌ getMyAllDIDHistory도 실패:', historyError);
        throw historyError;
      }
    } catch (error) {
      console.error('❌ DID 조회 실패:', error);
      console.error('❌ 오류 상세:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
      });
      setMyLatestDID(null);
      return null;
    } finally {
      setIsFetching(false); // 항상 플래그 해제
    }
  }, [isConnected, walletState.account?.address, walletState.network?.chainId]); // 필수 의존성만 유지

  /**
   * DID 보유 여부 확인
   */
  const checkHasDID = useCallback(async () => {
    if (!isConnected || !walletState.account) {
      return false;
    }

    try {
      // window.klaytn 또는 window.ethereum을 직접 사용
      let provider: any = null;
      if (typeof window !== 'undefined') {
        provider = window.klaytn || window.ethereum;
      }

      if (!provider) {
        console.error('지갑 provider를 찾을 수 없습니다');
        return false;
      }

      const callParams = didService.createHasActiveDIDCall(
        walletState.account.address
      );

      const result = await provider.request({
        method: 'eth_call',
        params: [
          {
            to: callParams.to,
            data: callParams.data,
          },
          'latest',
        ],
      });

      // boolean 결과 디코딩 (0x0000...01 = true, 0x0000...00 = false)
      const hasDID =
        result !==
        '0x0000000000000000000000000000000000000000000000000000000000000000';

      console.log('🔍 DID 보유 여부:', hasDID);
      return hasDID;
    } catch (error) {
      console.error('❌ DID 보유 확인 실패:', error);
      return false;
    }
  }, [isConnected, walletState, didService]);

  /**
   * 컨트랙트 함수들 테스트
   */
  const testContractFunctions = useCallback(async () => {
    if (!isConnected || !walletState.account) {
      console.warn('⚠️ 지갑이 연결되지 않았습니다');
      return;
    }

    const provider = window.klaytn || window.ethereum;
    if (!provider) {
      console.error('❌ 지갑 provider를 찾을 수 없습니다');
      return;
    }

    console.log('🧪 컨트랙트 함수들 테스트 시작...');
    const userAddress = walletState.account.address;

    try {
      // 1. 기본 정보 및 통계 함수들
      console.log('📊 === 기본 정보 및 통계 함수들 ===');

      const ownerRaw = await provider.request({
        method: 'eth_call',
        params: [didService.createGetOwnerCall(), 'latest'],
      });

      // owner 주소 디코딩
      const contract = new Contract(KAIA_DID_CONTRACT.address, KAIA_DID_ABI);
      const decodedOwner = contract.interface.decodeFunctionResult(
        'owner',
        ownerRaw
      );
      const ownerAddress = decodedOwner[0];
      console.log('👑 컨트랙트 소유자 (raw):', ownerRaw);
      console.log('👑 컨트랙트 소유자 (파싱됨):', ownerAddress);

      const totalActiveDIDs = await provider.request({
        method: 'eth_call',
        params: [didService.createGetTotalActiveDIDsCall(), 'latest'],
      });
      console.log('📈 전체 활성 DID 수:', parseInt(totalActiveDIDs, 16));

      const totalRegistered = await provider.request({
        method: 'eth_call',
        params: [didService.createGetTotalRegisteredAddressesCall(), 'latest'],
      });
      console.log('📈 전체 등록 주소 수:', parseInt(totalRegistered, 16));

      // 2. 현재 사용자별 함수들 테스트
      console.log('👤 === 현재 사용자별 함수들 ===');

      const hasRegistered = await provider.request({
        method: 'eth_call',
        params: [didService.createHasRegisteredCall(userAddress), 'latest'],
      });
      const isRegistered =
        hasRegistered !==
        '0x0000000000000000000000000000000000000000000000000000000000000000';
      console.log('✅ 등록 여부 (hasRegistered):', isRegistered);

      const hasActiveDID = await provider.request({
        method: 'eth_call',
        params: [didService.createHasActiveDIDCall(userAddress), 'latest'],
      });
      const hasActive =
        hasActiveDID !==
        '0x0000000000000000000000000000000000000000000000000000000000000000';
      console.log('✅ 활성 DID 보유 (hasActiveDIDPublic):', hasActive);

      const versionCount = await provider.request({
        method: 'eth_call',
        params: [
          didService.createGetDIDVersionCountCall(userAddress),
          'latest',
        ],
      });
      const versions = parseInt(versionCount, 16);
      console.log('📊 DID 버전 수:', versions);

      // 3. 사용자 DID 상세 조회
      console.log('📋 === 사용자 DID 상세 조회 ===');

      // getMyLatestDID는 Internal JSON-RPC error가 발생하므로 건너뛰기
      console.log('⚠️ getMyLatestDID는 RPC 오류로 인해 건너뛰기');

      // getMyAllDIDHistory 실제 데이터 조회 및 파싱
      const myHistoryRaw = await provider.request({
        method: 'eth_call',
        params: [didService.createGetMyAllDIDHistoryCall(), 'latest'],
      });
      console.log(
        '📚 내 DID 히스토리 (raw):',
        myHistoryRaw.substring(0, 100) + '...'
      );

      const myHistoryParsed = didService.decodeDIDHistoryResult(myHistoryRaw);
      if (myHistoryParsed && myHistoryParsed.length > 0) {
        console.log('📚 내 DID 히스토리 (파싱됨):', myHistoryParsed);
        console.log(`📊 총 ${myHistoryParsed.length}개의 DID 버전이 있습니다`);
        myHistoryParsed.forEach((did, index) => {
          console.log(
            `  📄 버전 ${did.version}: ${did.name} (활성: ${did.isActive})`
          );
        });
      } else {
        console.log('📚 내 DID 히스토리: 없음');
      }

      // getLatestDID (다른 사용자 조회용)
      const latestDID = await provider.request({
        method: 'eth_call',
        params: [didService.createGetLatestDIDCall(userAddress), 'latest'],
      });
      console.log(
        '📄 특정 사용자 최신 DID (raw):',
        latestDID.substring(0, 100) + '...'
      );

      // getAllDIDHistory (다른 사용자 조회용)
      const allHistory = await provider.request({
        method: 'eth_call',
        params: [didService.createGetAllDIDHistoryCall(userAddress), 'latest'],
      });
      console.log(
        '📚 특정 사용자 DID 히스토리 (raw):',
        allHistory.substring(0, 100) + '...'
      );

      // 버전별 DID 조회 (버전이 있는 경우만)
      if (versions > 0) {
        const didByVersion = await provider.request({
          method: 'eth_call',
          params: [
            didService.createGetDIDByVersionCall(userAddress, 1),
            'latest',
          ],
        });
        console.log(
          '📄 버전 1 DID (raw):',
          didByVersion.substring(0, 100) + '...'
        );
      }

      // 4. 전체 목록 함수들 (onlyOwner 제한으로 건너뛰기)
      console.log('📋 === 전체 목록 함수들 ===');
      console.log(
        '⚠️ getAllRegisteredAddresses와 getAllActiveDIDAddresses는 onlyOwner 제한으로 건너뛰기'
      );
      console.log('👑 현재 컨트랙트 소유자만 호출 가능한 함수들입니다');
      console.log('🔍 대신 컨트랙트 소유자를 확인해보겠습니다...');

      // 현재 사용자가 소유자인지 확인
      if (ownerAddress.toLowerCase() === userAddress.toLowerCase()) {
        console.log(
          '✅ 현재 사용자가 컨트랙트 소유자입니다! 목록 함수들을 호출합니다.'
        );

        try {
          const allRegisteredAddressesRaw = await provider.request({
            method: 'eth_call',
            params: [
              didService.createGetAllRegisteredAddressesCall(),
              'latest',
            ],
          });
          const allRegisteredAddresses = didService.decodeAddressListResult(
            allRegisteredAddressesRaw
          );
          console.log('📋 전체 등록 주소 목록:', allRegisteredAddresses);

          const allActiveDIDAddressesRaw = await provider.request({
            method: 'eth_call',
            params: [didService.createGetAllActiveDIDAddressesCall(), 'latest'],
          });
          const contract = new Contract(
            KAIA_DID_CONTRACT.address,
            KAIA_DID_ABI
          );
          const decodedActiveDIDs = contract.interface.decodeFunctionResult(
            'getAllActiveDIDAddresses',
            allActiveDIDAddressesRaw
          );
          console.log(
            '📋 전체 활성 DID 주소 목록:',
            decodedActiveDIDs[0] || []
          );
        } catch (ownerError) {
          console.log('❌ 소유자 전용 함수 호출 실패:', ownerError);
        }
      } else {
        console.log('❌ 현재 사용자는 컨트랙트 소유자가 아닙니다');
        console.log(`👑 소유자: ${ownerAddress}`);
        console.log(`👤 현재 사용자: ${userAddress}`);
      }

      // 5. 인덱스 기반 조회 (등록된 주소가 있는 경우만)
      const totalRegisteredNumber = parseInt(totalRegistered, 16);
      if (totalRegisteredNumber > 0) {
        console.log('🔍 === 인덱스 기반 조회 ===');

        // 첫 번째 등록된 주소 조회
        const firstRegisteredAddressRaw = await provider.request({
          method: 'eth_call',
          params: [didService.createGetRegisteredAddressesCall(0), 'latest'],
        });

        // 주소 디코딩
        const decodedFirstAddress = contract.interface.decodeFunctionResult(
          'registeredAddresses',
          firstRegisteredAddressRaw
        );
        const firstRegisteredAddress = decodedFirstAddress[0];
        console.log('🔍 첫 번째 등록된 주소 (raw):', firstRegisteredAddressRaw);
        console.log('🔍 첫 번째 등록된 주소 (파싱됨):', firstRegisteredAddress);

        // 해당 주소의 첫 번째 DID 히스토리 조회
        try {
          const firstDIDHistory = await provider.request({
            method: 'eth_call',
            params: [
              didService.createDidDocumentHistoryCall(
                firstRegisteredAddress,
                0
              ),
              'latest',
            ],
          });
          console.log(
            '📚 첫 번째 주소의 첫 DID (raw):',
            firstDIDHistory.substring(0, 100) + '...'
          );
        } catch (historyError) {
          console.log(
            '📚 첫 번째 주소의 DID 히스토리 조회 실패:',
            historyError
          );
        }
      }

      console.log('🎉 === 모든 컨트랙트 get 함수 테스트 완료! ===');
    } catch (error) {
      console.error('❌ 컨트랙트 함수 테스트 실패:', error);
    }
  }, [isConnected, walletState, didService]);

  return {
    // 상태
    isIssuing,
    isUpdating,
    isDeactivating,
    isFetching,
    lastTransaction,
    myLatestDID,
    myDIDHistory,
    isConnected,
    account: walletState.account,
    network: walletState.network,

    // 함수
    issueIdentity,
    updateDID,
    deactivateDID,
    fetchMyLatestDID,
    checkHasDID,
    testContractFunctions,
  };
};
