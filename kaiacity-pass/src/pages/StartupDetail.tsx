import { useState } from 'react';
import { ArrowLeft, Rocket, TrendingUp, Users, DollarSign, Calendar, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const StartupDetail = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    companyName: '',
    category: '',
    description: '',
    fundingGoal: '',
    timeline: ''
  });

  const handleApplyIncubator = () => {
    window.open('https://www.k-startup.go.kr', '_blank');
  };

  const handleInvestmentPortal = () => {
    window.open('https://www.koreaangels.or.kr', '_blank');
  };

  const handleSubmitApplication = () => {
    if (!applicationData.companyName || !applicationData.description) {
      alert('기업명과 사업 설명을 입력해주세요.');
      return;
    }
    alert(`지원 신청이 완료되었습니다!\n기업명: ${applicationData.companyName}\n카테고리: ${applicationData.category}`);
  };

  const startups = [
    {
      id: 1,
      name: 'BlockChain Education',
      category: 'EdTech',
      description: '블록체인 기술을 활용한 온라인 교육 플랫폼',
      funding: '₩2.5억',
      stage: 'Series A',
      growth: '+230%',
      team: 12,
      featured: true
    },
    {
      id: 2,
      name: 'DeFi Solutions',
      category: 'FinTech',
      description: 'Web3 기반 탈중앙화 금융 서비스',
      funding: '₩5.2억',
      stage: 'Series B',
      growth: '+180%',
      team: 24,
      featured: true
    },
    {
      id: 3,
      name: 'NFT Marketplace',
      category: 'Platform',
      description: 'K-컨텐츠 특화 NFT 거래 플랫폼',
      funding: '₩1.8억',
      stage: 'Seed',
      growth: '+320%',
      team: 8,
      featured: false
    },
    {
      id: 4,
      name: 'Smart Healthcare',
      category: 'HealthTech',
      description: 'AI와 블록체인을 활용한 헬스케어 솔루션',
      funding: '₩3.1억',
      stage: 'Series A',
      growth: '+150%',
      team: 18,
      featured: true
    }
  ];

  const programs = [
    {
      name: 'KAIA 액셀러레이터',
      duration: '6개월',
      funding: '최대 ₩5억',
      equity: '5-10%',
      benefits: ['멘토링', '네트워킹', '투자 연결', '기술 지원']
    },
    {
      name: '블록체인 인큐베이터',
      duration: '12개월',
      funding: '최대 ₩10억',
      equity: '10-15%',
      benefits: ['오피스 제공', '법무 지원', '마케팅', '해외 진출']
    },
    {
      name: 'Web3 스타트업 캠프',
      duration: '3개월',
      funding: '최대 ₩2억',
      equity: '3-5%',
      benefits: ['교육 프로그램', '프로토타입', '데모데이', 'VC 미팅']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/startup')}
            className="bg-purple-500 text-white hover:bg-purple-600 border-purple-500 px-6 py-3 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">KAIA 스타트업 생태계</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 지원 신청 폼 */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  프로그램 지원
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="기업명"
                  value={applicationData.companyName}
                  onChange={(e) => setApplicationData({...applicationData, companyName: e.target.value})}
                />
                <Input
                  placeholder="사업 분야 (예: FinTech, EdTech)"
                  value={applicationData.category}
                  onChange={(e) => setApplicationData({...applicationData, category: e.target.value})}
                />
                <Textarea
                  placeholder="사업 아이디어를 간단히 설명해주세요"
                  value={applicationData.description}
                  onChange={(e) => setApplicationData({...applicationData, description: e.target.value})}
                  className="min-h-[100px]"
                />
                <Input
                  placeholder="목표 투자금액"
                  value={applicationData.fundingGoal}
                  onChange={(e) => setApplicationData({...applicationData, fundingGoal: e.target.value})}
                />
                <Input
                  placeholder="예상 개발 기간"
                  value={applicationData.timeline}
                  onChange={(e) => setApplicationData({...applicationData, timeline: e.target.value})}
                />
                <Button 
                  onClick={handleSubmitApplication}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  지원 신청
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  투자 연결
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleApplyIncubator}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  정부 지원사업 신청
                </Button>
                <Button 
                  onClick={handleInvestmentPortal}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  엔젤투자 연결
                </Button>
                <div className="text-sm text-gray-600">
                  <p>• 검증된 투자자 네트워크</p>
                  <p>• 1:1 멘토링 제공</p>
                  <p>• 피칭 연습 지원</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 성공 스타트업 */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">주목받는 스타트업</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startups.map((startup) => (
                  <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{startup.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {startup.category}
                          </Badge>
                        </div>
                        {startup.featured && (
                          <Badge className="bg-yellow-500">
                            <Award className="w-3 h-3 mr-1" />
                            주목
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{startup.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span>{startup.funding}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span>{startup.growth}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span>{startup.team}명</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-500" />
                          <span>{startup.stage}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 지원 프로그램 */}
            <div>
              <h2 className="text-2xl font-bold mb-6">지원 프로그램</h2>
              <div className="space-y-4">
                {programs.map((program, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          {program.name}
                        </CardTitle>
                        <Badge variant="outline">{program.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">투자금액</span>
                          <div className="font-semibold text-green-600">{program.funding}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">지분율</span>
                          <div className="font-semibold text-purple-600">{program.equity}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">기간</span>
                          <div className="font-semibold text-blue-600">{program.duration}</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">제공 혜택</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {program.benefits.map((benefit, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;