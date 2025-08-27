import { Card, CardContent } from '@/components/ui/card';
import hospitalImg from '@/assets/hospital.jpg';
import fanCommunityImg from '@/assets/fan-community.jpg';
import startupImg from '@/assets/startup.jpg';
import accommodationImg from '@/assets/accommodation.jpg';
import storeImg from '@/assets/store.jpg';

interface StatsSectionProps {
  language: 'ko' | 'en';
}

const StatsSection = ({ language }: StatsSectionProps) => {
  const stats = {
    ko: [
      {
        id: 'users',
        title: '활성 사용자',
        value: '2.8M+',
        subtitle: '월간 활성 사용자 수',
        image: fanCommunityImg,
        color: 'accent-emerald',
      },
      {
        id: 'verifications',
        title: '신원 인증',
        value: '156K+',
        subtitle: '누적 신원 인증 건수',
        image: hospitalImg,
        color: 'accent-sky',
      },
      {
        id: 'transactions',
        title: '거래 총량',
        value: '₩892B+',
        subtitle: '누적 거래 총액',
        image: startupImg,
        color: 'accent-lime',
      },
      {
        id: 'partners',
        title: '파트너사',
        value: '340+',
        subtitle: '등록된 파트너 기업',
        image: accommodationImg,
        color: 'accent-purple',
      },
      {
        id: 'services',
        title: '제공 서비스',
        value: '12+',
        subtitle: '다양한 디지털 서비스',
        image: storeImg,
        color: 'accent-orange',
      },
    ],
    en: [
      {
        id: 'users',
        title: 'Active Users',
        value: '2.8M+',
        subtitle: 'Monthly Active Users',
        image: fanCommunityImg,
        color: 'accent-emerald',
      },
      {
        id: 'verifications',
        title: 'ID Verifications',
        value: '156K+',
        subtitle: 'Total Identity Verifications',
        image: hospitalImg,
        color: 'accent-sky',
      },
      {
        id: 'transactions',
        title: 'Transaction Volume',
        value: '₩892B+',
        subtitle: 'Total Transaction Amount',
        image: startupImg,
        color: 'accent-lime',
      },
      {
        id: 'partners',
        title: 'Partner Companies',
        value: '340+',
        subtitle: 'Registered Partner Businesses',
        image: accommodationImg,
        color: 'accent-purple',
      },
      {
        id: 'services',
        title: 'Digital Services',
        value: '12+',
        subtitle: 'Various Digital Services',
        image: storeImg,
        color: 'accent-orange',
      },
    ],
  };

  return (
    <section
      id="stats"
      className="py-16 bg-gradient-to-br from-accent-lime/20 to-accent-sky/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'ko' ? '실시간 통계' : 'Live Statistics'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'ko'
                ? 'K-Citizenship Pass 생태계의 성장을 확인하세요'
                : 'Witness the growth of K-Citizenship Pass ecosystem'}
            </p>
          </div>

          {/* Stats grid - varied sizes with bright colors and hover effects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {/* Large card 1 */}
            <Card className="stats-card col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl border-0 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative h-64">
                <img
                  src={stats[language][0].image}
                  alt={stats[language][0].title}
                  className="w-full h-full object-cover brightness-125 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl md:text-5xl font-black mb-2">
                      {stats[language][0].value}
                    </div>
                    <p className="text-lg opacity-95">
                      {stats[language][0].title}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Small card 1 */}
            <Card className="stats-card bg-gradient-to-br from-orange-400 to-red-500 shadow-xl border-0 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative h-full">
                <img
                  src={stats[language][1].image}
                  alt={stats[language][1].title}
                  className="w-full h-full object-cover brightness-125 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-red-600/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-black mb-2">
                      {stats[language][1].value}
                    </div>
                    <p className="text-base opacity-95">
                      {stats[language][1].title}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Large card 2 */}
            <Card className="stats-card row-span-2 bg-gradient-to-t from-blue-500 to-cyan-400 shadow-xl border-0 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative h-full min-h-[360px]">
                <img
                  src={stats[language][2].image}
                  alt={stats[language][2].title}
                  className="w-full h-full object-cover brightness-125 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-cyan-500/60" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <div className="text-4xl font-black mb-2">
                    {stats[language][2].value}
                  </div>
                  <p className="text-lg">{stats[language][2].title}</p>
                </div>
              </div>
            </Card>

            {/* Small card 2 */}
            <Card className="stats-card bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl border-0 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative h-full">
                <img
                  src={stats[language][3].image}
                  alt={stats[language][3].title}
                  className="w-full h-full object-cover brightness-125 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-emerald-600/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-black mb-2">
                      {stats[language][3].value}
                    </div>
                    <p className="text-base opacity-95">
                      {stats[language][3].title}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bottom large card */}
            <Card className="stats-card col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl border-0 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative h-64">
                <img
                  src={stats[language][4].image}
                  alt={stats[language][4].title}
                  className="w-full h-full object-cover brightness-125 contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-700/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl md:text-5xl font-black mb-2">
                      {stats[language][4].value}
                    </div>
                    <p className="text-lg opacity-95">
                      {stats[language][4].title}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
