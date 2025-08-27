import { useState } from 'react';
import { ArrowLeft, Building, MapPin, Star, Calendar, Users, Wifi, Car, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AccommodationDetail = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: ''
  });

  const handleSearchAccommodation = () => {
    window.open('https://www.booking.com', '_blank');
  };

  const handleBookNow = (accommodationId: number) => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('체크인/체크아웃 날짜를 선택해주세요.');
      return;
    }
    alert(`예약이 완료되었습니다!\n숙소 ID: ${accommodationId}\n체크인: ${bookingData.checkIn}\n체크아웃: ${bookingData.checkOut}`);
  };

  const accommodations = [
    {
      id: 1,
      name: 'KAIA 게스트하우스 강남점',
      location: '서울 강남구',
      price: '₩89,000',
      originalPrice: '₩120,000',
      rating: 4.8,
      reviews: 156,
      image: '/placeholder.svg',
      amenities: ['Wifi', '주차', '조식'],
      verified: true,
      type: '게스트하우스'
    },
    {
      id: 2,
      name: '부산 해운대 오션뷰 호텔',
      location: '부산 해운대구',
      price: '₩145,000',
      originalPrice: '₩180,000',
      rating: 4.9,
      reviews: 203,
      image: '/placeholder.svg',
      amenities: ['Wifi', '수영장', '스파'],
      verified: true,
      type: '호텔'
    },
    {
      id: 3,
      name: '제주 블록체인 카페 펜션',
      location: '제주시',
      price: '₩78,000',
      originalPrice: '₩95,000',
      rating: 4.7,
      reviews: 89,
      image: '/placeholder.svg',
      amenities: ['Wifi', '카페', '정원'],
      verified: true,
      type: '펜션'
    },
    {
      id: 4,
      name: '경주 한옥 스테이',
      location: '경주시',
      price: '₩125,000',
      originalPrice: '₝150,000',
      rating: 4.6,
      reviews: 67,
      image: '/placeholder.svg',
      amenities: ['Wifi', '한식조식', '문화체험'],
      verified: true,
      type: '한옥스테이'
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case '주차': case '수영장': return <Car className="w-4 h-4" />;
      case '조식': case '카페': case '한식조식': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/accommodation')}
            className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500 px-6 py-3 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">숙박 예약</h1>
          </div>
        </div>

        {/* 예약 유형 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-500" />
              편안한 숙박을 위한 최고의 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '호텔', desc: '럭셔리 호텔에서 특별한 휴식을 즐기세요', action: '호텔 찾기', icon: Building },
                { name: '모텔', desc: '합리적인 가격의 편안한 모텔', action: '모텔 예약', icon: MapPin },
                { name: '펜션', desc: '자연 속에서 힐링할 수 있는 펜션', action: '펜션 보기', icon: Star }
              ].map((type) => (
                <Card key={type.name} className="text-center p-6">
                  <type.icon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{type.desc}</p>
                  <Button 
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={handleSearchAccommodation}
                  >
                    {type.action}
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 추천 숙소 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">추천 숙소</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodations.map((accommodation) => (
              <Card key={accommodation.id} className="hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto bg-gray-100 relative">
                    <img 
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                    {accommodation.verified && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        검증됨
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {accommodation.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{accommodation.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      {accommodation.location}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{accommodation.rating}</span>
                      <span className="text-sm text-gray-500">({accommodation.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {accommodation.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-orange-600">{accommodation.price}</span>
                      <span className="text-sm text-gray-500 line-through">{accommodation.originalPrice}</span>
                    </div>
                    <Button 
                      onClick={() => handleBookNow(accommodation.id)}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      예약하기
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 예약 혜택 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                VIP 혜택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 무료 업그레이드</li>
                <li>• 레이트 체크아웃</li>
                <li>• 웰컴 드링크</li>
                <li>• 전용 컨시어지</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                유연한 예약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 무료 취소</li>
                <li>• 날짜 변경 가능</li>
                <li>• 즉시 확정</li>
                <li>• 24시간 고객지원</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                안전 보장
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 신원 검증된 호스트</li>
                <li>• 안전한 결제</li>
                <li>• 보험 적용</li>
                <li>• 24시간 응급지원</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;