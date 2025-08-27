import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TermsProps {
  language?: 'ko' | 'en';
}

const Terms = ({ language = 'ko' }: TermsProps) => {
  const navigate = useNavigate();

  const content = {
    ko: {
      title: '이용약관',
      subtitle: 'K-Citizenship Pass 서비스 이용약관',
      sections: [
        {
          title: '제1조 (목적)',
          content: '이 약관은 K-Citizenship Pass(이하 "회사")가 제공하는 디지털 신분증 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.'
        },
        {
          title: '제2조 (정의)',
          content: '1. "서비스"란 회사가 제공하는 블록체인 기반 디지털 신분증 발급 및 인증 서비스를 의미합니다.\n2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.\n3. "디지털 신분증"이란 블록체인 기술을 이용하여 발급되는 전자적 신원 증명서를 의미합니다.'
        },
        {
          title: '제3조 (약관의 효력 및 변경)',
          content: '1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.\n2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지됩니다.'
        },
        {
          title: '제4조 (서비스의 제공 및 변경)',
          content: '1. 회사는 다음과 같은 서비스를 제공합니다:\n   - 디지털 신분증 발급\n   - 신분증 조회 및 검증\n   - Web3 여권 서비스\n   - 기타 관련 부가 서비스\n2. 회사는 서비스의 내용을 변경할 수 있으며, 변경사항은 사전에 공지됩니다.'
        }
      ],
      backButton: '홈으로 돌아가기'
    },
    en: {
      title: 'Terms of Service',
      subtitle: 'K-Citizenship Pass Service Terms of Use',
      sections: [
        {
          title: 'Article 1 (Purpose)',
          content: 'These terms aim to define the conditions and procedures for using the digital identity service (hereinafter "Service") provided by K-Citizenship Pass (hereinafter "Company"), as well as the rights, obligations, responsibilities, and other necessary matters between the Company and users.'
        },
        {
          title: 'Article 2 (Definitions)',
          content: '1. "Service" means the blockchain-based digital identity issuance and authentication service provided by the Company.\n2. "User" refers to members and non-members who receive services provided by the Company in accordance with these terms.\n3. "Digital ID" means an electronic identity certificate issued using blockchain technology.'
        },
        {
          title: 'Article 3 (Effectiveness and Amendment of Terms)',
          content: '1. These terms shall be effective for all users who wish to use the Service.\n2. The Company may amend these terms when deemed necessary, and the amended terms will be announced through service notices.'
        },
        {
          title: 'Article 4 (Provision and Changes of Service)',
          content: '1. The Company provides the following services:\n   - Digital ID issuance\n   - ID verification and validation\n   - Web3 passport service\n   - Other related additional services\n2. The Company may change the content of services, and changes will be announced in advance.'
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
            <FileText className="w-8 h-8 text-lime-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">{content[language].title}</h1>
              <p className="text-slate-300">{content[language].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {content[language].sections.map((section, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lime-400">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </CardContent>
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

export default Terms;