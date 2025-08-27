import { ArrowLeft, Store as StoreIcon, ShoppingCart, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'shopping':
        navigate('/store-detail');
        break;
      case 'authentication':
        navigate('/store-detail');
        break;
      case 'payment':
        navigate('/store-detail');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500 px-4 py-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <StoreIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">스토어</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                안전한 쇼핑
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">블록체인 인증을 통한 신뢰할 수 있는 온라인 쇼핑 경험을 제공합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                상품 인증
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">모든 상품은 블록체인으로 진위여부가 검증되어 안전합니다.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-500" />
                스테이블 코인 결제
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">안정적인 암호화폐로 빠르고 안전한 결제가 가능합니다.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">블록체인 기반 온라인 스토어</h2>
          <p className="text-gray-600 mb-6">
            K-Citizenship Pass를 통해 검증된 판매자와 구매자만이 참여할 수 있는 안전한 온라인 쇼핑몰입니다. 
            모든 거래는 블록체인에 기록되어 투명성과 신뢰성을 보장합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">쇼핑 혜택</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 검증된 정품 상품만 판매</li>
                <li>• 투명한 가격 정책</li>
                <li>• 빠른 배송 서비스</li>
                <li>• 스테이블 코인 리워드</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">보안 시스템</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 디지털 신분증 기반 KYC</li>
                <li>• 스마트 컨트랙트 결제</li>
                <li>• 분산 저장 시스템</li>
                <li>• 실시간 사기 방지</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;