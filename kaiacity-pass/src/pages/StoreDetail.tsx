import { useState } from 'react';
import { ArrowLeft, Store as StoreIcon, Search, ShoppingCart, Star, Filter, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const StoreDetail = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);

  const handlePayWithKaia = () => {
    window.open('https://kaiawallet.io', '_blank');
  };

  const handleViewProduct = (productId: number) => {
    alert(`상품 상세페이지로 이동: 상품 ID ${productId}`);
  };

  const handleAddToCart = (productId: number) => {
    setCart([...cart, productId]);
    alert('장바구니에 추가되었습니다!');
  };

  const products = [
    {
      id: 1,
      name: 'KAIA 공식 후드티',
      price: '89,000원',
      originalPrice: '120,000원',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 124,
      verified: true,
      category: '의류'
    },
    {
      id: 2,
      name: 'Web3 개발자 키보드',
      price: '245,000원',
      originalPrice: '290,000원',
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 89,
      verified: true,
      category: '전자제품'
    },
    {
      id: 3,
      name: 'NFT 아트북 컬렉션',
      price: '156,000원',
      originalPrice: '180,000원',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 56,
      verified: true,
      category: '도서'
    },
    {
      id: 4,
      name: '블록체인 스터디 노트',
      price: '32,000원',
      originalPrice: '45,000원',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 78,
      verified: true,
      category: '교육'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/store')}
            className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500 px-6 py-3 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <StoreIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">KAIA 스토어</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-500" />
                  상품 검색
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="상품명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  검색
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-green-500" />
                  카테고리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">의류</Button>
                  <Button variant="ghost" className="w-full justify-start">전자제품</Button>
                  <Button variant="ghost" className="w-full justify-start">도서</Button>
                  <Button variant="ghost" className="w-full justify-start">교육</Button>
                  <Button variant="ghost" className="w-full justify-start">액세서리</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-purple-500" />
                  장바구니
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{cart.length}</div>
                  <div className="text-sm text-gray-600 mb-4">개 상품</div>
                  <Button 
                    onClick={handlePayWithKaia}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    KAIA로 결제
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 상품 목록 */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">인기 상품</h2>
              <div className="text-sm text-gray-600">
                총 {filteredProducts.length}개 상품
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-t-lg relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    {product.verified && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        검증됨
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-blue-600">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewProduct(product.id)}
                        variant="outline" 
                        className="flex-1"
                      >
                        상세보기
                      </Button>
                      <Button 
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        담기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;