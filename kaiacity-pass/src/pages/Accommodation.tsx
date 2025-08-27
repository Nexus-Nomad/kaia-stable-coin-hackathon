import { ArrowLeft, Building, MapPin, Star, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Accommodation = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'search':
        navigate('/accommodation-detail');
        break;
      case 'reviews':
        navigate('/accommodation-detail');
        break;
      case 'checkin':
        navigate('/accommodation-detail');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500 px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">숙박</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                위치 기반 검색
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">원하는 위치에서 검증된 숙박시설을 쉽게 찾을 수 있습니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                신뢰 기반 리뷰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">검증된 사용자만의 신뢰할 수 있는 리뷰 시스템을 제공합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-500" />
                스마트 체크인
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">디지털 신분증으로 빠르고 안전한 체크인이 가능합니다.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">안전한 숙박 예약 서비스</h2>
          <p className="text-gray-600 mb-6">
            K-Citizenship Pass로 검증된 신원을 바탕으로 안전하고 신뢰할 수 있는 숙박 서비스를 이용하세요. 
            블록체인 기술을 통해 투명한 예약과 결제 시스템을 제공합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">예약 혜택</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 검증된 숙박시설만 등록</li>
                <li>• 투명한 가격 정보</li>
                <li>• 즉시 예약 확정</li>
                <li>• 스테이블 코인 할인</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">안전 시스템</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 디지털 신분증 기반 인증</li>
                <li>• 스마트 컨트랙트 보호</li>
                <li>• 실시간 사기 방지</li>
                <li>• 24/7 고객 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;