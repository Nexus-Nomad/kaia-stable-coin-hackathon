import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrivacyProps {
  language?: 'ko' | 'en';
}

const Privacy = ({ language = 'ko' }: PrivacyProps) => {
  const navigate = useNavigate();

  const content = {
    ko: {
      title: '개인정보처리방침',
      subtitle: 'K-Citizenship Pass 개인정보 보호 정책',
      sections: [
        {
          title: '1. 개인정보의 처리목적',
          content: 'K-Citizenship Pass는 다음의 목적을 위하여 개인정보를 처리합니다:\n- 디지털 신분증 발급 및 관리\n- 본인 확인 및 신원 인증\n- 서비스 제공 및 계약 이행\n- 고객 상담 및 불만 처리'
        },
        {
          title: '2. 개인정보의 처리 및 보유기간',
          content: '개인정보는 수집·이용에 관한 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지 보유·이용됩니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:\n- 신분증 발급 정보: 발급일로부터 10년\n- 서비스 이용 기록: 3년'
        },
        {
          title: '3. 개인정보의 제3자 제공',
          content: '회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:\n- 이용자가 사전에 동의한 경우\n- 법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우'
        },
        {
          title: '4. 개인정보의 안전성 확보조치',
          content: '회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:\n- 블록체인 기술을 활용한 데이터 암호화\n- 접근권한의 제한 및 관리\n- 개인정보 취급자에 대한 정기적인 교육\n- 개인정보 처리시스템 접근기록의 보관 및 점검'
        }
      ],
      backButton: '홈으로 돌아가기'
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'K-Citizenship Pass Privacy Protection Policy',
      sections: [
        {
          title: '1. Purpose of Personal Information Processing',
          content: 'K-Citizenship Pass processes personal information for the following purposes:\n- Digital ID issuance and management\n- Identity verification and authentication\n- Service provision and contract fulfillment\n- Customer consultation and complaint handling'
        },
        {
          title: '2. Processing and Retention Period of Personal Information',
          content: 'Personal information is retained and used from the date of consent for collection and use until the purpose of personal information collection and use is achieved. However, the following information is preserved for the specified period for the reasons below:\n- ID issuance information: 10 years from issuance date\n- Service usage records: 3 years'
        },
        {
          title: '3. Provision of Personal Information to Third Parties',
          content: 'The Company does not, in principle, provide users\' personal information to external parties. However, exceptions are made in the following cases:\n- When users have given prior consent\n- When required by law or requested by investigative agencies according to procedures and methods defined by law for investigative purposes'
        },
        {
          title: '4. Security Measures for Personal Information',
          content: 'The Company takes the following measures to ensure the security of personal information:\n- Data encryption using blockchain technology\n- Limiting and managing access permissions\n- Regular training for personal information handlers\n- Storage and inspection of personal information processing system access records'
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
            <Shield className="w-8 h-8 text-lime-400" />
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

export default Privacy;