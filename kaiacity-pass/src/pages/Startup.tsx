import { ArrowLeft, Rocket, TrendingUp, Users2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Startup = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'investment':
        navigate('/startup-detail');
        break;
      case 'networking':
        navigate('/startup-detail');
        break;
      case 'mentoring':
        navigate('/startup-detail');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-500 px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">스타트업</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                투자 매칭
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">검증된 투자자와 스타트업을 안전하게 매칭해드립니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-blue-500" />
                네트워킹
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Web3 생태계의 창업가들과 네트워킹 기회를 제공합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                멘토링
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">경험있는 멘토들의 전문적인 조언과 가이드를 받으세요.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Web3 스타트업 생태계</h2>
          <p className="text-gray-600 mb-6">
            K-Citizenship Pass 기반의 검증된 Web3 스타트업 생태계에 참여하세요. 
            블록체인 기술을 활용한 혁신적인 비즈니스 모델과 투명한 투자 환경을 제공합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">지원 서비스</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 스마트 컨트랙트 개발 지원</li>
                <li>• 토큰 이코노미 설계</li>
                <li>• 법적 컴플라이언스 가이드</li>
                <li>• 마케팅 및 커뮤니티 구축</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">투자 및 펀딩</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 검증된 투자자 네트워크</li>
                <li>• 투명한 투자 프로세스</li>
                <li>• 스테이블 코인 기반 펀딩</li>
                <li>• DAO 거버넌스 시스템</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startup;