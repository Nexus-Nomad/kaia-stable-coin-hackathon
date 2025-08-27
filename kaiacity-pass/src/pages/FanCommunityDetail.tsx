import { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Heart, Share2, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const FanCommunityDetail = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleJoinCommunity = () => {
    window.open('https://discord.com/invite/kaia-community', '_blank');
  };

  const handleCreateEvent = () => {
    alert('이벤트 생성 페이지로 이동합니다');
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      alert(`새 게시물이 등록되었습니다: ${newPost}`);
      setNewPost('');
    }
  };

  const posts = [
    {
      id: 1,
      author: 'KaiaFan123',
      content: 'KAIA 블록체인의 새로운 업데이트가 정말 혁신적이네요! 🚀',
      likes: 24,
      comments: 8,
      time: '2시간 전'
    },
    {
      id: 2,
      author: 'CryptoExplorer',
      content: 'Web3 생태계에서 KAIA의 역할이 점점 중요해지고 있어요',
      likes: 18,
      comments: 5,
      time: '4시간 전'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/fan-community')}
            className="bg-pink-500 text-white hover:bg-pink-600 border-pink-500 px-6 py-3 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">팬 커뮤니티</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 팬클럽 가입 */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-500" />
                  팬클럽 가입
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-4">
                  공식 팬클럽에 가입하고 특별한 혜택을 받으세요
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="font-semibold">VIP 혜택</div>
                    <div className="text-sm text-gray-600">우선 예약, 할인 혜택</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold">독점 콘텐츠</div>
                    <div className="text-sm text-gray-600">비하인드 스토리, 사진</div>
                  </div>
                </div>
                <Button 
                  onClick={handleJoinCommunity}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  가입하기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  팬 랭킹
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-4">
                  활동 점수를 쌓아 팬 랭킹에 도전하세요
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-semibold">🥇 TopFan2024</div>
                      <div className="text-sm text-gray-600">12,450점</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">🥈 KaiaLover</div>
                      <div className="text-sm text-gray-600">9,230점</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">🥉 FanClub123</div>
                      <div className="text-sm text-gray-600">7,890점</div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleCreateEvent}
                  variant="outline"
                  className="w-full"
                >
                  랭킹 보기
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 게시물 영역 */}
          <div className="lg:col-span-2">
            {/* 팬 게시판 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  팬 게시판
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  다른 팬들과 자유롭게 소통하고 정보를 공유하세요
                </p>
                <div className="space-y-4">
                  <Textarea
                    placeholder="팬들과 소통하고 정보를 공유해보세요..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handlePostSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    게시판 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 게시물 목록 */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{post.author[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-sm text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-blue-500">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-500">
                            <Share2 className="w-4 h-4 mr-1" />
                            공유
                          </Button>
                        </div>
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
  );
};

export default FanCommunityDetail;