import { ArrowLeft, Hospital as HospitalIcon, UserCheck, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Hospital = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'registration':
        navigate('/hospital-detail');
        break;
      case 'records':
        navigate('/hospital-detail');
        break;
      case 'appointment':
        navigate('/hospital-detail');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-green-500 text-white hover:bg-green-600 border-green-500 px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <HospitalIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">병원</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-500" />
                간편 접수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">디지털 신분증으로 병원 접수를 간편하고 빠르게 처리합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                의료기록 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">블록체인 기반으로 안전하게 의료기록을 보관하고 관리합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                실시간 예약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">실시간으로 의료진 스케줄을 확인하고 예약할 수 있습니다.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">디지털 의료 서비스</h2>
          <p className="text-gray-600 mb-6">
            K-Citizenship Pass를 활용한 혁신적인 의료 서비스를 경험하세요. 
            디지털 신분증 기반의 안전한 환자 인증과 블록체인 기술로 보호되는 의료 정보를 제공합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">의료 서비스</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 디지털 신분증 기반 접수</li>
                <li>• 온라인 진료 예약</li>
                <li>• 처방전 디지털 발급</li>
                <li>• 의료비 스테이블 코인 결제</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">보안 및 프라이버시</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HIPAA 준수 데이터 보호</li>
                <li>• 암호화된 의료 기록</li>
                <li>• 환자 중심 접근 제어</li>
                <li>• 의료 정보 무결성 보장</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;