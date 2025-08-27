import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield,
  User,
  CreditCard,
  CheckCircle,
  Wallet,
  Download,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useKaiaWallet } from '@/hooks/use-kaia-wallet';
import { useKaiaDID } from '@/hooks/use-kaia-did';
import { WalletProvider } from '@/lib/kaia';

interface IdIssuanceProps {
  language?: 'ko' | 'en';
}

const IdIssuance = ({ language = 'ko' }: IdIssuanceProps) => {
  const navigate = useNavigate();
  const kaiaWallet = useKaiaWallet();
  const {
    walletState,
    isLoading,
    availableWallets,
    connectWallet,
    disconnectWallet,
    isConnected,
    account,
  } = kaiaWallet;

  const { isIssuing, issueIdentity, lastTransaction } = useKaiaDID(kaiaWallet);

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    address: '',
    phone: '',
  });

  const content = {
    ko: {
      title: '신분증 발급',
      subtitle: '블록체인 기반 디지털 신분증을 발급받으세요',
      connectWallet: '카이아 지갑 연결',
      walletConnected: '지갑 연결됨',
      personalInfo: '개인정보 입력',
      name: '이름',
      birthDate: '생년월일',
      address: '주소',
      phone: '전화번호',
      issue: '신분증 발급',
      backHome: '홈으로 돌아가기',
      noWalletsFound: '지갑이 감지되지 않았습니다',
      installWallet: '지갑을 설치해주세요',
      walletAddress: '지갑 주소',
      disconnect: '연결 해제',
      issuing: '발급 중...',
      fillAllFields: '모든 필드를 입력해주세요',
      transactionHash: '신분증 발급 완료',
      viewMyId: '신분증 조회하기',
      viewOnKaiascan: '카이아스캔에서 보기',
      invalidPhoneFormat:
        '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)',
      invalidBirthDate: '생년월일은 오늘 이전 날짜여야 합니다.',
    },
    en: {
      title: 'ID Issuance',
      subtitle: 'Issue your blockchain-based digital ID',
      connectWallet: 'Connect Kaia Wallet',
      walletConnected: 'Wallet Connected',
      personalInfo: 'Personal Information',
      name: 'Name',
      birthDate: 'Birth Date',
      address: 'Address',
      phone: 'Phone Number',
      issue: 'Issue ID',
      backHome: 'Back to Home',
      noWalletsFound: 'No wallets detected',
      installWallet: 'Please install a wallet',
      walletAddress: 'Wallet Address',
      disconnect: 'Disconnect',
      issuing: 'Issuing...',
      fillAllFields: 'Please fill in all fields',
      transactionHash: 'ID Issuance Completed',
      viewMyId: 'View My ID',
      viewOnKaiascan: 'View on Kaiascan',
      invalidPhoneFormat:
        'Please enter a valid phone number format. (e.g., 010-1234-5678)',
      invalidBirthDate: 'Birth date must be before today.',
    },
  };

  const handleWalletConnect = async (provider: WalletProvider) => {
    try {
      await connectWallet(provider);
    } catch (error) {
      console.error('지갑 연결 실패:', error);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('지갑 연결 해제 실패:', error);
    }
  };

  // 전화번호 형식 검증
  const validatePhoneNumber = (phone: string): boolean => {
    // 한국 전화번호 형식: 010-1234-5678, 02-123-4567, 031-123-4567 등
    const phoneRegex = /^(01[016789]|02|0[3-9][0-9])-?\d{3,4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // 생년월일 검증 (오늘 이후 날짜 방지)
  const validateBirthDate = (birthDate: string): boolean => {
    const today = new Date();
    const inputDate = new Date(birthDate);
    return inputDate <= today;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 디버깅: 현재 지갑 상태 출력
    console.log('🔍 발급 버튼 클릭 시 지갑 상태:', {
      isConnected,
      hasAccount: !!account,
      accountAddress: account?.address,
      walletStatus: walletState.status,
      networkChainId: walletState.network?.chainId,
      networkName: walletState.network?.name,
    });

    // 폼 데이터 검증
    if (
      !formData.name ||
      !formData.birthDate ||
      !formData.address ||
      !formData.phone
    ) {
      alert(content[language].fillAllFields);
      return;
    }

    // 전화번호 형식 검증
    if (!validatePhoneNumber(formData.phone)) {
      alert(content[language].invalidPhoneFormat);
      return;
    }

    // 생년월일 검증
    if (!validateBirthDate(formData.birthDate)) {
      alert(content[language].invalidBirthDate);
      return;
    }

    try {
      // 신분증 발급 트랜잭션 실행
      const result = await issueIdentity({
        name: formData.name,
        birthDate: formData.birthDate,
        address: formData.address,
        phone: formData.phone,
      });

      // 성공시 자동 이동하지 않음 - 사용자가 선택할 수 있도록 함
    } catch (error) {
      console.error('신분증 발급 실패:', error);
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Connection */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-lime-500" />
                {content[language].connectWallet}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 현재 지갑 상태 디버깅 정보 (항상 표시) */}
              <div className="mb-4 text-slate-500 text-xs bg-slate-800 p-3 rounded">
                <div className="font-medium mb-2 text-slate-300">
                  🔍 현재 지갑 상태:
                </div>
                <div className="space-y-1.5 text-xs">
                  <div>
                    연결상태:{' '}
                    {isConnected
                      ? '✅ 연결됨'
                      : walletState.status === 'connecting'
                      ? '🔄 연결중'
                      : '❌ 미연결'}
                  </div>
                  <div>
                    계정주소:{' '}
                    {account?.address
                      ? `${account.address.slice(
                          0,
                          6
                        )}...${account.address.slice(-4)}`
                      : '없음'}
                  </div>
                  <div>네트워크: {walletState.network?.name || '없음'}</div>
                  <div>
                    체인아이디: {walletState.network?.chainId || '없음'}
                  </div>
                  <div>
                    지갑종류:{' '}
                    {walletState.provider === 'kaikas'
                      ? 'Kaikas'
                      : walletState.provider === 'metamask'
                      ? '메타마스크'
                      : walletState.provider || '없음'}
                  </div>
                </div>
              </div>

              {!isConnected ? (
                <div className="space-y-4">
                  {availableWallets.length > 0 ? (
                    <div className="space-y-2">
                      {availableWallets.map((wallet) => (
                        <Button
                          key={wallet}
                          onClick={() => handleWalletConnect(wallet)}
                          className="w-full bg-lime-600 hover:bg-lime-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Wallet className="w-4 h-4 mr-2" />
                          )}
                          {wallet === WalletProvider.KAIKAS
                            ? 'Kaikas 지갑 연결하기'
                            : wallet === WalletProvider.METAMASK
                            ? 'MetaMask 지갑 연결하기'
                            : `${wallet} 연결하기`}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div>
                        <Download className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-slate-300 font-medium mb-1">
                          {content[language].noWalletsFound}
                        </p>
                        <p className="text-slate-400 text-sm mb-4">
                          {content[language].installWallet}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <a
                          href="https://app.kaikas.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Kaikas 설치하기
                          </Button>
                        </a>
                        <a
                          href="https://metamask.io/download/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            MetaMask 설치하기
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* 디버깅 도구 */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="text-slate-400 text-xs mb-2">
                      🔧 문제해결 도구:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => {
                          console.log('🔄 페이지 새로고침');
                          window.location.reload();
                        }}
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-400 hover:bg-slate-700"
                      >
                        페이지 새로고침
                      </Button>
                      <Button
                        onClick={() => {
                          const detectResult = {
                            카이아클래이튼지원: !!window.klaytn,
                            이더리움지원: !!window.ethereum,
                            카이카스감지됨: window.klaytn?.isKaikas,
                            메타마스크감지됨: (window.ethereum as any)
                              ?.isMetaMask,
                          };
                          console.log(
                            '🔍 브라우저 지갑 감지 결과:',
                            detectResult
                          );
                          alert(
                            `지갑 감지 결과:\nKaikas: ${
                              detectResult.카이카스감지됨
                                ? '✅ 설치됨'
                                : '❌ 미설치'
                            }\n메타마스크: ${
                              detectResult.메타마스크감지됨
                                ? '✅ 설치됨'
                                : '❌ 미설치'
                            }`
                          );
                        }}
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-400 hover:bg-slate-700"
                      >
                        지갑 설치 확인
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    {content[language].walletConnected}
                  </div>
                  {account && (
                    <div className="space-y-2">
                      <div className="text-slate-300 text-sm">
                        {content[language].walletAddress}:
                      </div>
                      <div className="text-slate-400 text-xs font-mono bg-slate-700 p-2 rounded">
                        {account.address}
                      </div>
                      {/* 디버깅 정보 표시 */}
                      <div className="text-slate-500 text-xs bg-slate-800 p-2 rounded">
                        <div>상태: {walletState.status}</div>
                        <div>
                          네트워크: {walletState.network?.name || 'Unknown'}
                        </div>
                        <div>
                          체인ID: {walletState.network?.chainId || 'Unknown'}
                        </div>
                        <div>isConnected: {isConnected.toString()}</div>
                      </div>
                      <Button
                        onClick={handleWalletDisconnect}
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                        disabled={isLoading}
                      >
                        {content[language].disconnect}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal Information Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-6 h-6 text-sky-500" />
                {content[language].personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    {content[language].name}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    placeholder={language === 'ko' ? '홍길동' : 'John Doe'}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    disabled={!isConnected}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate" className="text-slate-300">
                    {content[language].birthDate}
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    max={new Date().toISOString().split('T')[0]} // 오늘 이후 날짜 선택 불가
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    disabled={!isConnected}
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-slate-300">
                    {content[language].address}
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    placeholder={
                      language === 'ko'
                        ? '서울특별시 강남구 테헤란로 123'
                        : '123 Main St, Seoul, Korea'
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    disabled={!isConnected}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300">
                    {content[language].phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    placeholder="010-1234-5678"
                    pattern="^(01[016789]|02|0[3-9][0-9])-?\d{3,4}-?\d{4}$"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    disabled={!isConnected}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-lime-600 hover:bg-lime-700"
                  disabled={!isConnected || isIssuing}
                >
                  {isIssuing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {content[language].issuing}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      {content[language].issue}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 트랜잭션 상태 표시 */}
        {lastTransaction && (
          <Card className="bg-slate-800 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                {content[language].transactionHash}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-slate-300 text-sm font-mono bg-slate-700 p-2 rounded">
                  {lastTransaction.hash}
                </div>
                {lastTransaction.blockNumber && (
                  <div className="text-slate-400 text-xs">
                    Block: {lastTransaction.blockNumber}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://kairos.kaiascan.io/tx/${lastTransaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-400 hover:text-lime-300 text-sm underline"
                  >
                    {content[language].viewOnKaiascan}
                  </a>

                  {/* 신분증 조회하기 버튼 */}
                  <Button
                    onClick={() => navigate('/id-verification')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    {content[language].viewMyId}
                  </Button>
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

export default IdIssuance;
