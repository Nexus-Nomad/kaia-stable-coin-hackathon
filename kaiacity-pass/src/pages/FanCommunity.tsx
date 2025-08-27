import { ArrowLeft, Users, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FanCommunity = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'follow':
        navigate('/fan-community-detail');
        break;
      case 'chat':
        navigate('/fan-community-detail');
        break;
      case 'share':
        navigate('/fan-community-detail');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-purple-500 text-white hover:bg-purple-600 border-purple-500 px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">팬커뮤니티</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                아티스트 팔로우
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">좋아하는 아티스트를 팔로우하고 최신 소식을 받아보세요.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                팬 채팅
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">다른 팬들과 실시간으로 소통하고 의견을 나누세요.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-green-500" />
                콘텐츠 공유
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">팬 아트, 영상, 사진 등을 안전하게 공유하세요.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Web3 기반 팬커뮤니티</h2>
          <p className="text-gray-600 mb-6">
            블록체인 기술을 활용한 투명하고 안전한 팬커뮤니티 플랫폼입니다. 
            K-Citizenship Pass를 통해 검증된 사용자만이 참여할 수 있어 더욱 신뢰할 수 있는 환경을 제공합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">주요 기능</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• NFT 기반 팬 배지 시스템</li>
                <li>• 암호화된 개인 메시지</li>
                <li>• 토큰 기반 리워드 시스템</li>
                <li>• 탈중앙화 콘텐츠 저장</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">보안 특징</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 디지털 신분증 기반 인증</li>
                <li>• 블록체인 기반 투명성</li>
                <li>• 개인정보 보호 보장</li>
                <li>• 스마트 컨트랙트 보안</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanCommunity;