import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface FAQProps {
  language?: 'ko' | 'en';
}

const FAQ = ({ language = 'ko' }: FAQProps) => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const content = {
    ko: {
      title: '자주 묻는 질문',
      subtitle: 'K-Citizenship Pass 관련 FAQ',
      faqs: [
        {
          id: 'what-is-k-citizenship',
          question: 'K-Citizenship Pass란 무엇인가요?',
          answer: 'K-Citizenship Pass는 블록체인 기술을 기반으로 한 디지털 신분증 시스템입니다. 안전하고 신뢰할 수 있는 디지털 신원 인증을 제공하며, 다양한 온라인 서비스에서 사용할 수 있습니다.'
        },
        {
          id: 'how-to-issue',
          question: '디지털 신분증은 어떻게 발급받나요?',
          answer: '웹사이트에서 "신분증 발급" 메뉴를 클릭하고, 필요한 개인정보를 입력한 후 본인 인증 절차를 완료하면 됩니다. 발급 과정은 보통 5-10분 정도 소요됩니다.'
        },
        {
          id: 'is-it-safe',
          question: '개인정보가 안전하게 보호되나요?',
          answer: '네, 블록체인 기술과 고급 암호화 기술을 사용하여 개인정보를 보호합니다. 모든 데이터는 분산 저장되며, 사용자만이 자신의 정보에 대한 접근 권한을 가집니다.'
        },
        {
          id: 'where-to-use',
          question: '어디서 사용할 수 있나요?',
          answer: '팬커뮤니티, 온라인 스토어, 병원, 숙박업체, 스타트업 플랫폼 등 다양한 파트너 서비스에서 사용할 수 있습니다. 앞으로 더 많은 서비스가 추가될 예정입니다.'
        },
        {
          id: 'cost',
          question: '사용 비용은 얼마인가요?',
          answer: '기본적인 디지털 신분증 발급과 조회는 무료입니다. 일부 프리미엄 기능이나 특별 서비스의 경우 별도의 수수료가 있을 수 있습니다.'
        },
        {
          id: 'technical-support',
          question: '기술적인 문제가 있을 때는 어떻게 하나요?',
          answer: '고객센터(1588-0000)로 연락하시거나 웹사이트의 "문의하기" 메뉴를 통해 문의해 주세요. 24시간 고객 지원 서비스를 제공합니다.'
        }
      ],
      backButton: '홈으로 돌아가기'
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'K-Citizenship Pass FAQ',
      faqs: [
        {
          id: 'what-is-k-citizenship',
          question: 'What is K-Citizenship Pass?',
          answer: 'K-Citizenship Pass is a digital identity system based on blockchain technology. It provides secure and reliable digital identity authentication and can be used across various online services.'
        },
        {
          id: 'how-to-issue',
          question: 'How do I get a digital ID?',
          answer: 'Click the "ID Issuance" menu on the website, enter the required personal information, and complete the identity verification process. The issuance process usually takes 5-10 minutes.'
        },
        {
          id: 'is-it-safe',
          question: 'Is personal information safely protected?',
          answer: 'Yes, we use blockchain technology and advanced encryption to protect personal information. All data is stored in a distributed manner, and only users have access rights to their own information.'
        },
        {
          id: 'where-to-use',
          question: 'Where can I use it?',
          answer: 'You can use it on various partner services including fan communities, online stores, hospitals, accommodations, and startup platforms. More services will be added in the future.'
        },
        {
          id: 'cost',
          question: 'How much does it cost?',
          answer: 'Basic digital ID issuance and verification are free. Some premium features or special services may have separate fees.'
        },
        {
          id: 'technical-support',
          question: 'What should I do if I have technical issues?',
          answer: 'Please contact our customer service (1588-0000) or use the "Contact Us" menu on the website. We provide 24-hour customer support service.'
        }
      ],
      backButton: 'Back to Home'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8 pt-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:text-lime-400 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-lime-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">{content[language].title}</h1>
              <p className="text-slate-300">{content[language].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {content[language].faqs.map((faq) => (
            <Card key={faq.id} className="bg-slate-800 border-slate-700">
              <Collapsible
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-slate-700 transition-colors">
                    <CardTitle className="text-lime-400 flex items-center justify-between text-left">
                      {faq.question}
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${
                          openItems.includes(faq.id) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {content[language].backButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;