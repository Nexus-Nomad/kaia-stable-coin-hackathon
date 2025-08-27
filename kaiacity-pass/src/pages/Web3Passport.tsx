import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Plane,
  Shield,
  CheckCircle,
  Star,
  Calendar,
  Wallet,
  Loader2,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useKaiaWallet } from '@/hooks/use-kaia-wallet';

interface Web3PassportProps {
  language?: 'ko' | 'en';
}

const Web3Passport = ({ language = 'ko' }: Web3PassportProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('passport');
  const {
    isConnected,
    isLoading,
    account,
    network,
    availableWallets,
    connectWallet,
    disconnectWallet,
  } = useKaiaWallet();

  const content = {
    ko: {
      title: 'Web3 여권',
      subtitle: '글로벌 디지털 신원 인증 여권',
      passport: '여권 정보',
      travels: '여행 기록',
      achievements: '성취 기록',
      issueDate: '발급일',
      expiryDate: '만료일',
      nationality: '국적',
      passportNumber: '여권번호',
      backHome: '홈으로 돌아가기',
      connectWallet: '지갑 연결',
      disconnectWallet: '지갑 연결 해제',
      walletConnected: '지갑 연결됨',
      walletAddress: '지갑 주소',
      network: '네트워크',
      connectToAccess: 'Kaikas 지갑을 연결하여 Web3 여권에 액세스하세요',
      installWallet: '지갑 설치',
      noWalletsFound: 'Kaikas 지갑이 설치되지 않았습니다',
      installKaikas: 'Kaikas 설치하기',
    },
    en: {
      title: 'Web3 Passport',
      subtitle: 'Global Digital Identity Authentication Passport',
      passport: 'Passport Info',
      travels: 'Travel Records',
      achievements: 'Achievements',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',
      nationality: 'Nationality',
      passportNumber: 'Passport Number',
      backHome: 'Back to Home',
      connectWallet: 'Connect Wallet',
      disconnectWallet: 'Disconnect Wallet',
      walletConnected: 'Wallet Connected',
      walletAddress: 'Wallet Address',
      network: 'Network',
      connectToAccess: 'Connect Kaikas wallet to access Web3 Passport',
      installWallet: 'Install Wallet',
      noWalletsFound: 'Kaikas wallet not found',
      installKaikas: 'Install Kaikas',
    },
  };

  // Mock data
  const passportData = {
    name: '홍길동',
    nationality: '대한민국',
    passportNumber: 'K12345678',
    issueDate: '2025-01-01',
    expiryDate: '2035-01-01',
    travels: [
      { country: '일본', date: '2025-02-15', purpose: '관광' },
      { country: '싱가포르', date: '2025-03-20', purpose: '비즈니스' },
      { country: '미국', date: '2025-04-10', purpose: '컨퍼런스' },
      { country: '프랑스', date: '2025-05-05', purpose: '문화체험' },
      { country: '독일', date: '2025-06-12', purpose: '기술박람회' },
      { country: '호주', date: '2025-07-20', purpose: '휴가' },
      { country: '태국', date: '2025-08-14', purpose: '워케이션' },
      { country: '영국', date: '2025-09-08', purpose: '학회참석' },
      { country: '캐나다', date: '2025-10-25', purpose: '이민상담' },
    ],
    achievements: [
      {
        title: 'Web3 Pioneer',
        description: 'Early adopter of blockchain technology',
        date: '2025-02-01',
      },
      {
        title: 'Digital Nomad',
        description: 'Completed 10+ international trips across 5 continents',
        date: '2025-12-01',
      },
      {
        title: 'Verified Citizen',
        description:
          'Successfully verified digital identity on Kaia blockchain',
        date: '2025-01-15',
      },
      {
        title: 'DeFi Expert',
        description: 'Completed advanced DeFi protocol development course',
        date: '2025-03-20',
      },
      {
        title: 'Smart Contract Developer',
        description: 'Deployed 50+ smart contracts on Kaia network',
        date: '2025-04-05',
      },
      {
        title: 'Global Connector',
        description: 'Built international business partnerships in 8 countries',
        date: '2025-08-01',
      },
      {
        title: 'Tech Conference Speaker',
        description: 'Keynote speaker at blockchain conferences worldwide',
        date: '2025-05-12',
      },
      {
        title: 'Innovation Leader',
        description: 'Led development of next-gen identity verification system',
        date: '2025-06-18',
      },
      {
        title: 'Community Builder',
        description: 'Founded Web3 developer community with 10K+ members',
        date: '2025-09-22',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-slate-300">{content[language].subtitle}</p>

          {/* Wallet Connection Status */}
          <div className="mt-6">
            {isConnected ? (
              <div className="bg-slate-800 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-medium">
                    {content[language].walletConnected}
                  </span>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-400">
                      {content[language].walletAddress}:{' '}
                    </span>
                    <span className="font-mono">
                      {account?.address.slice(0, 6)}...
                      {account?.address.slice(-4)}
                    </span>
                  </div>
                  {network && (
                    <div>
                      <span className="text-slate-400">
                        {content[language].network}:{' '}
                      </span>
                      <span>{network.name}</span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="mt-3 border-slate-600 text-slate-300 hover:bg-slate-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wallet className="w-4 h-4 mr-2" />
                  )}
                  {content[language].disconnectWallet}
                </Button>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-slate-300 mb-4">
                  {content[language].connectToAccess}
                </p>
                <div className="space-y-2">
                  {availableWallets.map((wallet) => (
                    <Button
                      key={wallet}
                      onClick={() => connectWallet(wallet)}
                      className="w-full bg-lime-600 hover:bg-lime-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Wallet className="w-4 h-4 mr-2" />
                      )}
                      Kaikas 지갑 연결하기
                    </Button>
                  ))}
                  {availableWallets.length === 0 && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <Download className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-slate-300 font-medium mb-1">
                          {content[language].noWalletsFound}
                        </p>
                        <p className="text-slate-400 text-sm mb-4">
                          Kaia 네트워크를 사용하려면 지갑을 설치해야 합니다
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={() =>
                            window.open(
                              'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
                              '_blank'
                            )
                          }
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {content[language].installKaikas}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <div className="text-xs text-slate-500 text-center mt-3">
                        설치 후 페이지를 새로고침하세요
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Only show when wallet is connected */}
        {isConnected && (
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setActiveTab('passport')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'passport'
                    ? 'bg-lime-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 mr-2 inline" />
                {content[language].passport}
              </button>
              <button
                onClick={() => setActiveTab('travels')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'travels'
                    ? 'bg-lime-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Plane className="w-4 h-4 mr-2 inline" />
                {content[language].travels}
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'achievements'
                    ? 'bg-lime-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Star className="w-4 h-4 mr-2 inline" />
                {content[language].achievements}
              </button>
            </div>
          </div>
        )}

        {/* Passport Information - Only show when wallet is connected */}
        {isConnected && activeTab === 'passport' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-700 border-0 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <CardTitle>Web3 Passport</CardTitle>
                  </div>
                  <Badge className="bg-white/20 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{passportData.name}</div>
                <div className="space-y-3 text-white/90">
                  <div className="flex justify-between">
                    <span>{content[language].nationality}:</span>
                    <span>{passportData.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{content[language].passportNumber}:</span>
                    <span className="font-mono">
                      {passportData.passportNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{content[language].issueDate}:</span>
                    <span>{passportData.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{content[language].expiryDate}:</span>
                    <span>{passportData.expiryDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Digital Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-300">Blockchain Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-300">
                      Cross-border Compatible
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-300">Biometric Secured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-300">Real-time Validation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Travel Records - Only show when wallet is connected */}
        {isConnected && activeTab === 'travels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passportData.travels.map((travel, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plane className="w-5 h-5 text-sky-500" />
                    {travel.country}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{travel.date}</span>
                    </div>
                    <div>목적: {travel.purpose}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements - Only show when wallet is connected */}
        {isConnected && activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passportData.achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-slate-300">
                    <p className="text-sm">{achievement.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

export default Web3Passport;
