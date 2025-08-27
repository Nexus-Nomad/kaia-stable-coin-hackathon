import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code,
  Database,
  Activity,
  Send,
  Shield,
  Key,
  Book,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeveloperAPIProps {
  language?: 'ko' | 'en';
}

const DeveloperAPI = ({ language = 'ko' }: DeveloperAPIProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const content = {
    ko: {
      title: '개발자 API',
      subtitle:
        '블록체인 데이터, 거래내역, 상태 등 정보를 조회하거나 트랜잭션 제출을 자동화하는 방법을 안내합니다',
      overview: '개요',
      blockchain: '블록데이터',
      transactions: '거래내역',
      status: '상태',
      automation: '트랜잭션 자동화',
      getStarted: '시작하기',
      documentation: '문서',
      apiKey: 'API 키 발급',
      examples: '예제 코드',
      backHome: '홈으로 돌아가기',
    },
    en: {
      title: 'Developer API',
      subtitle:
        'Guide to querying blockchain data, transaction history, status information, or automating transaction submission',
      overview: 'Overview',
      blockchain: 'Block Data',
      transactions: 'Transaction History',
      status: 'Status',
      automation: 'Transaction Automation',
      getStarted: 'Get Started',
      documentation: 'Documentation',
      apiKey: 'API Key Issuance',
      examples: 'Code Examples',
      backHome: 'Back to Home',
    },
  };

  const apiFeatures = [
    {
      icon: Database,
      title: language === 'ko' ? '블록데이터 조회' : 'Block Data Query',
      description:
        language === 'ko'
          ? '실시간 블록체인 데이터 조회 및 분석'
          : 'Real-time blockchain data query and analysis',
      endpoint: '/api/v1/blocks',
      color: 'accent-sky',
    },
    {
      icon: Activity,
      title: language === 'ko' ? '거래내역 추적' : 'Transaction Tracking',
      description:
        language === 'ko'
          ? '상세한 거래 기록 및 상태 확인'
          : 'Detailed transaction records and status verification',
      endpoint: '/api/v1/transactions',
      color: 'accent-emerald',
    },
    {
      icon: Shield,
      title: language === 'ko' ? '상태 모니터링' : 'Status Monitoring',
      description:
        language === 'ko'
          ? '네트워크 상태 및 노드 정보 확인'
          : 'Network status and node information verification',
      endpoint: '/api/v1/status',
      color: 'accent-lime',
    },
    {
      icon: Send,
      title: language === 'ko' ? '트랜잭션 자동화' : 'Transaction Automation',
      description:
        language === 'ko'
          ? '스마트 컨트랙트 실행 및 자동화'
          : 'Smart contract execution and automation',
      endpoint: '/api/v1/submit',
      color: 'accent-orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* API Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {apiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:border-lime-500 transition-smooth"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-300 mb-4">{feature.description}</p>
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-400"
                  >
                    {feature.endpoint}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Getting Started */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="w-6 h-6 text-lime-500" />
                {content[language].getStarted}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">1. API 키 발급</p>
                <code className="text-lime-400 text-sm">
                  curl -X POST https://api.k-citizenship.com/auth/key
                </code>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">2. 인증 헤더 설정</p>
                <code className="text-lime-400 text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">3. API 호출</p>
                <code className="text-lime-400 text-sm">
                  GET /api/v1/blocks/latest
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-sky-500" />
                {content[language].examples}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">JavaScript/Node.js</p>
                <code className="text-sky-400 text-sm block">
                  {`const response = await fetch(
  'https://api.k-citizenship.com/v1/blocks',
  { headers: { 'Authorization': 'Bearer ' + apiKey } }
);`}
                </code>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">Python</p>
                <code className="text-sky-400 text-sm block">
                  {`import requests
response = requests.get(
  'https://api.k-citizenship.com/v1/blocks',
  headers={'Authorization': f'Bearer {api_key}'}
)`}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className="bg-lime-600 hover:bg-lime-700 text-white">
            <Key className="w-4 h-4 mr-2" />
            {content[language].apiKey}
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Book className="w-4 h-4 mr-2" />
            {content[language].documentation}
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            API 테스트
          </Button>
        </div>

        <div className="text-center">
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

export default DeveloperAPI;
