import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureTabsProps {
  language: 'ko' | 'en';
}

const FeatureTabs = ({ language }: FeatureTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('issue');
  const navigate = useNavigate();

  const features = {
    ko: [
      {
        id: 'issue',
        title: '신분증 발급',
        subtitle: '신분증 발급',
        description: '블록체인 기반의 안전한 디지털 신분증을 발급받으세요. 개인정보 보호와 보안을 최우선으로 하여 신뢰할 수 있는 디지털 신원 확인 시스템을 제공합니다.',
        route: '/id-issuance'
      },
      {
        id: 'verify', 
        title: '신분증 조회',
        subtitle: '신분증 조회',
        description: '발급된 디지털 신분증을 실시간으로 조회하고 검증할 수 있습니다. 즉시 인증이 가능하며 안전한 신원 확인 프로세스를 통해 신뢰성을 보장합니다.',
        route: '/id-verification'
      },
      {
        id: 'passport',
        title: 'Web3 여권',
        subtitle: 'Web3 여권', 
        description: 'Web3 생태계에서 사용할 수 있는 글로벌 디지털 여권입니다. 국경을 넘나드는 디지털 신원 인증을 위한 상호 운용 가능한 솔루션을 제공합니다.',
        route: '/web3-passport'
      }
    ],
    en: [
      {
        id: 'issue',
        title: 'ID Issuance',
        subtitle: 'ID Issuance',
        description: 'Issue blockchain-based digital IDs quickly and securely. We provide a trusted digital identity verification system with privacy and security as our top priorities.',
        route: '/id-issuance'
      },
      {
        id: 'verify',
        title: 'ID Verification', 
        subtitle: 'ID Verification',
        description: 'Real-time verification of issued digital IDs with instant authentication and secure identity confirmation process to ensure trustworthiness.',
        route: '/id-verification'
      },
      {
        id: 'passport',
        title: 'Web3 Passport',
        subtitle: 'Web3 Passport',
        description: 'A global digital passport for the Web3 ecosystem. Provides interoperable solutions for cross-border digital identity authentication.',
        route: '/web3-passport'
      }
    ]
  };

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-accent-lime/20 to-accent-sky/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-700 rounded-lg p-2 flex">
              {features[language].map((feature) => (
                <Button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`mx-1 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === feature.id
                      ? 'bg-lime-500 text-black shadow-lg'
                      : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  {feature.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-slate-800 rounded-lg p-8 min-h-[300px] border border-slate-600">
            {features[language].map((feature) => (
              activeTab === feature.id && (
                <div key={feature.id} className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{feature.subtitle}</h2>
                  <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-10 max-w-4xl mx-auto">
                    {feature.description}
                  </p>
                  <Button
                    onClick={() => handleFeatureClick(feature.route)}
                    className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-8 py-3 rounded-lg text-lg"
                  >
                    {language === 'ko' ? '시작하기' : 'Get Started'}
                  </Button>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTabs;