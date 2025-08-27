import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  User,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  WalletCards,
  Clock,
  Wallet,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useKaiaWallet } from '@/hooks/use-kaia-wallet';
import { useKaiaDID } from '@/hooks/use-kaia-did';
import { DIDDocument } from '@/lib/kaia/services/KaiaDIDService';
import { WalletProvider } from '@/lib/kaia';

interface IdVerificationProps {
  language?: 'ko' | 'en';
}

const IdVerification = ({ language = 'ko' }: IdVerificationProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialLoad, setHasInitialLoad] = useState(false); // 초기 로딩 완료 여부

  // 훅들을 IdIssuance와 동일한 방식으로 호출
  const kaiaWallet = useKaiaWallet();
  const {
    walletState,
    isLoading: walletLoading,
    availableWallets,
    connectWallet,
    disconnectWallet,
    isConnected,
    account,
  } = kaiaWallet;

  const { fetchMyLatestDID, checkHasDID, myLatestDID } = useKaiaDID(kaiaWallet);

  // 디버깅용 로그 추가
  console.log('🔍 IdVerification 렌더링:', {
    isConnected,
    account: account?.address,
    walletState: walletState?.status,
    availableWallets: availableWallets?.length,
  });

  const content = {
    ko: {
      title: '신분증 조회',
      subtitle: '발급된 디지털 신분증을 확인하세요',
      verify: '신분증 확인',
      verified: '검증됨',
      personalInfo: '개인정보',
      issueDate: '발급일',
      expiryDate: '만료일',
      status: '상태',
      active: '활성',
      inactive: '비활성',
      backHome: '홈으로 돌아가기',
      connectWallet: '카이아 지갑 연결',
      noIdFound: '신분증이 없습니다',
      noIdMessage: '아직 발급된 디지털 신분증이 없습니다.',
      goToIssuance: '신분증 발급하기',
      checking: '조회 중...',
      refresh: '새로고침',
      version: '버전',
      createdAt: '생성일',
      updatedAt: '수정일',
      blockchainVerified: '블록체인 검증 완료',
      identityConfirmed: '신원 정보 확인됨',
      digitalSignatureValid: '디지털 서명 유효',
      noWalletsFound: '지갑이 감지되지 않았습니다',
      installWallet: '지갑을 설치해주세요',
    },
    en: {
      title: 'ID Verification',
      subtitle: 'Verify your issued digital ID',
      verify: 'Verify ID',
      verified: 'Verified',
      personalInfo: 'Personal Information',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      backHome: 'Back to Home',
      connectWallet: 'Connect Kaia Wallet',
      noIdFound: 'No ID Found',
      noIdMessage: "You don't have any issued digital ID yet.",
      goToIssuance: 'Issue New ID',
      checking: 'Checking...',
      refresh: 'Refresh',
      version: 'Version',
      createdAt: 'Created',
      updatedAt: 'Updated',
      blockchainVerified: 'Blockchain Verified',
      identityConfirmed: 'Identity Confirmed',
      digitalSignatureValid: 'Digital Signature Valid',
      noWalletsFound: 'No wallets detected',
      installWallet: 'Please install a wallet',
    },
  };

  // 지갑 연결 함수들 (IdIssuance와 동일) - useCallback으로 메모이제이션
  const handleWalletConnect = useCallback(
    async (provider: WalletProvider) => {
      try {
        await connectWallet(provider);
      } catch (error) {
        console.error('지갑 연결 실패:', error);
      }
    },
    [connectWallet]
  );

  const handleWalletDisconnect = useCallback(async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('지갑 연결 해제 실패:', error);
    }
  }, [disconnectWallet]);

  // DID 조회 및 지갑 연결 체크
  useEffect(() => {
    console.log('🔄 useEffect 실행됨:', {
      isConnected,
      fetchMyLatestDID: !!fetchMyLatestDID,
    });

    if (!isConnected) {
      // 지갑이 연결되지 않았으면 조회 중지
      setIsChecking(false);
      setHasInitialLoad(false); // 초기 로딩 상태 리셋
      return;
    }

    // 지갑이 연결되었으면 DID 조회 시작
    const checkDID = async () => {
      if (!fetchMyLatestDID) {
        console.warn('⚠️ fetchMyLatestDID 함수가 준비되지 않음');
        setIsChecking(false);
        return;
      }

      setIsChecking(true);
      setError(null);
      try {
        console.log('🔍 DID 조회 시작...');
        await fetchMyLatestDID();
      } catch (error) {
        console.error('DID 조회 실패:', error);
        setError('DID 조회 중 오류가 발생했습니다.');
      } finally {
        setIsChecking(false);
        setHasInitialLoad(true); // 초기 로딩 완료 표시
      }
    };

    // 타이머를 사용하여 안전하게 실행
    const timer = setTimeout(() => {
      checkDID();
    }, 100); // 타이머 시간 단축

    return () => clearTimeout(timer);
  }, [isConnected]); // fetchMyLatestDID 의존성 제거하여 무한 루프 방지

  const handleVerify = useCallback(async () => {
    if (!fetchMyLatestDID) {
      alert(
        language === 'ko'
          ? '시스템 오류가 발생했습니다'
          : 'System error occurred'
      );
      return;
    }

    setIsChecking(true); // 조회 중 상태로 변경
    setError(null);
    try {
      const result = await fetchMyLatestDID();

      // 조회 결과에 따라 팝업 표시
      if (result) {
        alert(
          language === 'ko'
            ? `✅ 신분증 확인 완료!\n\n이름: ${result.name}\n생년월일: ${
                result.birthDate
              }\n주소: ${result.address}\n전화번호: ${result.phone}\n상태: ${
                result.isActive ? '활성' : '비활성'
              }\n버전: ${result.version}`
            : `✅ ID Verification Complete!\n\nName: ${
                result.name
              }\nBirth Date: ${result.birthDate}\nAddress: ${
                result.address
              }\nPhone: ${result.phone}\nStatus: ${
                result.isActive ? 'Active' : 'Inactive'
              }\nVersion: ${result.version}`
        );
      } else {
        alert(
          language === 'ko'
            ? '❌ 등록된 신분증이 없습니다.\n신분증을 먼저 발급받아주세요.'
            : '❌ No registered ID found.\nPlease issue an ID first.'
        );
      }
    } catch (error) {
      console.error('Verify 오류:', error);
      setError('신분증 확인 중 오류가 발생했습니다.');
      alert(
        language === 'ko'
          ? '❌ 신분증 확인에 실패했습니다'
          : '❌ Failed to verify ID'
      );
    } finally {
      setIsChecking(false);
    }
  }, [fetchMyLatestDID, language]);

  const handleRefresh = useCallback(async () => {
    if (!isConnected || !fetchMyLatestDID) return;
    setIsChecking(true);
    setError(null);
    try {
      await fetchMyLatestDID();
    } catch (error) {
      console.error('Refresh 오류:', error);
      setError('새로고침 중 오류가 발생했습니다.');
    } finally {
      setIsChecking(false);
      setHasInitialLoad(true); // 새로고침 후에도 초기 로딩 완료 표시
    }
  }, [isConnected, fetchMyLatestDID]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString(
      language === 'ko' ? 'ko-KR' : 'en-US'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-slate-300">{content[language].subtitle}</p>
        </div>

        {/* 에러 발생 시 */}
        {error && (
          <Card className="bg-red-800/20 border-red-600 mb-8">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                오류 발생
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-200">{error}</p>
              <Button
                onClick={() => setError(null)}
                variant="outline"
                className="mt-3 border-red-500 text-red-300 hover:bg-red-500/20"
              >
                닫기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 조건별 컨텐츠 표시 */}
        {!isConnected ? (
          // 1. 지갑 연결이 안 되어 있을 때
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <WalletCards className="w-6 h-6 text-sky-500" />
                {content[language].connectWallet}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                {language === 'ko'
                  ? '신분증을 조회하려면 먼저 카이아 지갑을 연결해주세요.'
                  : 'Please connect your Kaia wallet to view your ID.'}
              </p>
              <div className="space-y-2">
                {availableWallets && availableWallets.length > 0 ? (
                  availableWallets.map((wallet) => (
                    <Button
                      key={wallet}
                      onClick={() => handleWalletConnect(wallet)}
                      className="w-full bg-lime-600 hover:bg-lime-700 text-white"
                      disabled={walletLoading}
                    >
                      {walletLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Wallet className="w-4 h-4 mr-2" />
                      )}
                      {walletLoading
                        ? language === 'ko'
                          ? '연결 중...'
                          : 'Connecting...'
                        : wallet === WalletProvider.KAIKAS
                        ? 'Kaikas 지갑 연결하기'
                        : wallet === WalletProvider.METAMASK
                        ? 'MetaMask 지갑 연결하기'
                        : `${wallet} 연결하기`}
                    </Button>
                  ))
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-slate-400">
                      {content[language].noWalletsFound}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {content[language].installWallet}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : isChecking || !hasInitialLoad ? (
          // 2. 조회 중이거나 초기 로딩이 완료되지 않았을 때
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 animate-spin" />
                <span>{content[language].checking}</span>
              </div>
            </CardContent>
          </Card>
        ) : myLatestDID ? (
          // 3. DID가 있을 때
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ID Card Display */}
            <Card className="bg-gradient-to-br from-lime-600 to-lime-700 border-0 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <CardTitle>K-Citizenship Pass</CardTitle>
                  </div>
                  <Badge
                    className={`text-white ${
                      myLatestDID.isActive ? 'bg-white/20' : 'bg-red-500/80'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {myLatestDID.isActive
                      ? content[language].verified
                      : content[language].inactive}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">{myLatestDID.name}</div>
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{myLatestDID.birthDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{myLatestDID.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{myLatestDID.phone}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/70">
                    {content[language].createdAt}:{' '}
                    {formatDate(myLatestDID.createdAt)}
                  </div>
                  <div className="text-sm text-white/70">
                    {content[language].updatedAt}:{' '}
                    {formatDate(myLatestDID.updatedAt)}
                  </div>
                  <div className="text-sm text-white/70">
                    {content[language].version}: {myLatestDID.version}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-sky-500" />
                  {content[language].verify}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-slate-300">
                      {content[language].status}
                    </span>
                    <Badge
                      className={
                        myLatestDID.isActive
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }
                    >
                      {myLatestDID.isActive
                        ? content[language].active
                        : content[language].inactive}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-300">
                        {content[language].blockchainVerified}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-300">
                        {content[language].identityConfirmed}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-300">
                        {content[language].digitalSignatureValid}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={handleVerify}
                      className="flex-1 bg-sky-600 hover:bg-sky-700"
                      disabled={isChecking}
                    >
                      {isChecking ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {language === 'ko' ? '조회 중...' : 'Checking...'}
                        </div>
                      ) : (
                        content[language].verify
                      )}
                    </Button>
                    <Button
                      onClick={handleRefresh}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      disabled={isChecking}
                    >
                      {content[language].refresh}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // 4. DID가 없을 때
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                {content[language].noIdFound}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="py-8">
                <div className="mb-4">
                  <Shield className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                </div>
                <p className="text-slate-300 text-lg mb-6">
                  {content[language].noIdMessage}
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => navigate('/id-issuance')}
                      className="bg-lime-600 hover:bg-lime-700"
                    >
                      {content[language].goToIssuance}
                    </Button>
                    <Button
                      onClick={handleRefresh}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      disabled={isChecking}
                    >
                      {content[language].refresh}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {content[language].backHome}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdVerification;
