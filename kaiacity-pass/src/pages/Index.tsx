import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureTabs from '@/components/FeatureTabs';
import ServiceSlider from '@/components/ServiceSlider';
import StatsSection from '@/components/StatsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import ChatHelper from '@/components/ChatHelper';

const Index = () => {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const handleLanguageChange = (lang: 'ko' | 'en') => {
    setLanguage(lang);
  };

  // 뒤로 돌아올 때 스크롤 위치 복원
  useEffect(() => {
    const fromServices = sessionStorage.getItem('fromServices');
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');

    if (fromServices === 'true' && savedScrollPosition) {
      // 페이지가 렌더링된 후 스크롤 위치 복원
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'smooth',
        });
        // 복원 후 sessionStorage 클리어
        sessionStorage.removeItem('fromServices');
        sessionStorage.removeItem('homeScrollPosition');
      }, 100);
    }
  }, []); // 의존성 배열을 빈 배열로 변경

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-sky/10 to-accent-lime/10">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <HeroSection language={language} />
        <FeatureTabs language={language} />
        <div style={{ background: '#152484' }}>
          <ServiceSlider language={language} />
        </div>
        <StatsSection language={language} />
        <PartnersSection language={language} />
      </main>
      <div className="bg-black">
        <Footer language={language} onLanguageChange={handleLanguageChange} />
      </div>
      <ChatHelper language={language} />
    </div>
  );
};

export default Index;
