import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bell, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NoticeProps {
  language?: 'ko' | 'en';
}

const Notice = ({ language = 'ko' }: NoticeProps) => {
  const navigate = useNavigate();

  const content = {
    ko: {
      title: '공지사항',
      subtitle: 'K-Citizenship Pass 최신 소식',
      notices: [
        {
          id: 1,
          title: 'K-Citizenship Pass 정식 서비스 오픈 안내',
          content: 'K-Citizenship Pass 디지털 신분증 서비스가 정식으로 오픈되었습니다. 이제 누구나 안전하고 신뢰할 수 있는 디지털 신분증을 발급받을 수 있습니다.',
          date: '2024-01-15',
          type: 'important',
          isNew: true
        },
        {
          id: 2,
          title: '새로운 파트너 서비스 추가 안내',
          content: '팬커뮤니티, 온라인 스토어, 병원, 숙박업체, 스타트업 플랫폼 등 다양한 파트너 서비스가 추가되었습니다. K-Citizenship Pass로 더 많은 서비스를 이용해보세요.',
          date: '2024-01-10',
          type: 'update',
          isNew: true
        },
        {
          id: 3,
          title: '보안 강화 업데이트 완료',
          content: '사용자의 개인정보 보호를 위해 보안 시스템이 업데이트되었습니다. 더욱 안전한 서비스를 이용하실 수 있습니다.',
          date: '2024-01-05',
          type: 'maintenance',
          isNew: false
        },
        {
          id: 4,
          title: '고객센터 운영시간 변경 안내',
          content: '고객센터 운영시간이 기존 평일 9시-18시에서 24시간 운영으로 변경되었습니다. 언제든지 문의해주세요.',
          date: '2024-01-01',
          type: 'general',
          isNew: false
        }
      ],
      backButton: '홈으로 돌아가기',
      badges: {
        important: '중요',
        update: '업데이트',
        maintenance: '점검',
        general: '일반'
      }
    },
    en: {
      title: 'Notice',
      subtitle: 'K-Citizenship Pass Latest News',
      notices: [
        {
          id: 1,
          title: 'K-Citizenship Pass Official Service Launch Notice',
          content: 'K-Citizenship Pass digital ID service has officially launched. Now anyone can get a secure and reliable digital ID.',
          date: '2024-01-15',
          type: 'important',
          isNew: true
        },
        {
          id: 2,
          title: 'New Partner Services Added',
          content: 'Various partner services including fan communities, online stores, hospitals, accommodations, and startup platforms have been added. Try more services with K-Citizenship Pass.',
          date: '2024-01-10',
          type: 'update',
          isNew: true
        },
        {
          id: 3,
          title: 'Security Enhancement Update Completed',
          content: 'The security system has been updated to protect user privacy. You can now use safer services.',
          date: '2024-01-05',
          type: 'maintenance',
          isNew: false
        },
        {
          id: 4,
          title: 'Customer Service Hours Change Notice',
          content: 'Customer service hours have changed from weekdays 9AM-6PM to 24-hour operation. Please contact us anytime.',
          date: '2024-01-01',
          type: 'general',
          isNew: false
        }
      ],
      backButton: 'Back to Home',
      badges: {
        important: 'Important',
        update: 'Update',
        maintenance: 'Maintenance',
        general: 'General'
      }
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'important': return 'bg-red-600';
      case 'update': return 'bg-blue-600'; 
      case 'maintenance': return 'bg-orange-600';
      default: return 'bg-gray-600';
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
            <Bell className="w-8 h-8 text-lime-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">{content[language].title}</h1>
              <p className="text-slate-300">{content[language].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {content[language].notices.map((notice) => (
            <Card key={notice.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lime-400">{notice.title}</CardTitle>
                      {notice.isNew && (
                        <Badge className="bg-lime-600 text-white">NEW</Badge>
                      )}
                    </div>
                    <Badge className={`${getBadgeColor(notice.type)} text-white`}>
                      {content[language].badges[notice.type as keyof typeof content[typeof language]['badges']]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {notice.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  {notice.content}
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

export default Notice;