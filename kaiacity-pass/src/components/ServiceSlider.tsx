import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Store,
  Hospital,
  Building,
  Rocket,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import fanCommunityImg from '@/assets/fan-community.jpg';
import storeImg from '@/assets/store.jpg';
import hospitalImg from '@/assets/hospital.jpg';
import accommodationImg from '@/assets/accommodation.jpg';
import startupImg from '@/assets/startup.jpg';

interface ServiceSliderProps {
  language: 'ko' | 'en';
}

const ServiceSlider = ({ language }: ServiceSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const services = {
    ko: [
      {
        id: 'fan-community',
        title: '팬커뮤니티',
        icon: Users,
        image: fanCommunityImg,
        description: '아티스트와 팬을 연결하는 Web3 기반 커뮤니티 플랫폼',
        additionalDescription:
          '블록체인 기술을 활용한 투명하고 안전한 팬커뮤니티입니다.',
        color: 'accent-lime',
        route: '/fan-community',
      },
      {
        id: 'store',
        title: '스토어',
        icon: Store,
        image: storeImg,
        description: '블록체인 인증을 통한 안전한 온라인 쇼핑몰',
        additionalDescription: '검증된 상품과 안전한 결제 시스템을 제공합니다.',
        color: 'accent-sky',
        route: '/store',
      },
      {
        id: 'hospital',
        title: '병원',
        icon: Hospital,
        image: hospitalImg,
        description: '디지털 신분증으로 간편한 의료 서비스 이용',
        additionalDescription:
          '안전한 의료 정보 관리와 빠른 진료 예약이 가능합니다.',
        color: 'accent-emerald',
        route: '/hospital',
      },
      {
        id: 'accommodation',
        title: '숙박',
        icon: Building,
        image: accommodationImg,
        description: '검증된 신원으로 안전한 숙박 예약 서비스',
        additionalDescription:
          '신뢰할 수 있는 숙박 시설과 투명한 예약 시스템입니다.',
        color: 'accent-lime',
        route: '/accommodation',
      },
      {
        id: 'startup',
        title: '스타트업',
        icon: Rocket,
        image: startupImg,
        description: '혁신적인 Web3 스타트업 생태계 지원',
        additionalDescription:
          '검증된 투자자와 창업가를 연결하는 플랫폼입니다.',
        color: 'accent-sky',
        route: '/startup',
      },
    ],
    en: [
      {
        id: 'fan-community',
        title: 'Fan Community',
        icon: Users,
        image: fanCommunityImg,
        description:
          'Web3-based community platform connecting artists and fans',
        additionalDescription:
          'A transparent and secure fan community using blockchain technology.',
        color: 'accent-lime',
        route: '/fan-community',
      },
      {
        id: 'store',
        title: 'Store',
        icon: Store,
        image: storeImg,
        description: 'Secure online shopping with blockchain authentication',
        additionalDescription: 'Verified products and safe payment systems.',
        color: 'accent-sky',
        route: '/store',
      },
      {
        id: 'hospital',
        title: 'Hospital',
        icon: Hospital,
        image: hospitalImg,
        description: 'Convenient medical services with digital ID',
        additionalDescription:
          'Secure medical information management and fast appointment booking.',
        color: 'accent-emerald',
        route: '/hospital',
      },
      {
        id: 'accommodation',
        title: 'Accommodation',
        icon: Building,
        image: accommodationImg,
        description: 'Safe accommodation booking with verified identity',
        additionalDescription:
          'Trusted accommodation facilities and transparent booking system.',
        color: 'accent-lime',
        route: '/accommodation',
      },
      {
        id: 'startup',
        title: 'Startup',
        icon: Rocket,
        image: startupImg,
        description: 'Supporting innovative Web3 startup ecosystem',
        additionalDescription:
          'A platform connecting verified investors and entrepreneurs.',
        color: 'accent-sky',
        route: '/startup',
      },
    ],
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services[language].length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + services[language].length) % services[language].length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(currentSlide);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (walk > 50) {
      prevSlide();
      setIsDragging(false);
    } else if (walk < -50) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleIconClick = (route: string) => {
    // 현재 스크롤 위치를 sessionStorage에 저장
    const currentScrollPosition = window.scrollY;
    sessionStorage.setItem(
      'homeScrollPosition',
      currentScrollPosition.toString()
    );
    sessionStorage.setItem('fromServices', 'true');
    navigate(route);
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-12">
              {language === 'ko' ? '서비스 영역' : 'Service Areas'}
            </h2>
            <p className="text-2xl text-slate-200 mt-12">
              {language === 'ko'
                ? 'K-Citizenship Pass로 이용할 수 있는 다양한 서비스'
                : 'Various services available with K-Citizenship Pass'}
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl" ref={sliderRef}>
              <div
                className="flex transition-transform duration-500 ease-in-out cursor-grab select-none"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {services[language].map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.id} className="w-full flex-shrink-0 px-2">
                      <Card className="bg-white shadow-strong border-0 overflow-hidden hover:shadow-glow transition-smooth h-[720px] flex flex-col">
                        <div
                          className="relative h-[520px] flex-shrink-0 cursor-pointer"
                          onClick={() => handleIconClick(service.route)}
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-8 left-4 right-4">
                            <div
                              className={`w-16 h-16 bg-${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIconClick(service.route);
                              }}
                            >
                              <Icon className={`w-8 h-8 text-white`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 text-center">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                        <CardContent className="p-8 flex-1 flex flex-col justify-center text-center">
                          <p className="text-muted-foreground leading-relaxed font-medium text-lg mb-3">
                            {service.description}
                          </p>
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {service.additionalDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-medium"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-medium"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {services[language].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  currentSlide === index
                    ? 'bg-lime-500 shadow-glow'
                    : 'bg-slate-300 hover:bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Quick navigation menu */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {services[language].map((service, index) => (
              <Button
                key={service.id}
                data-service={service.id}
                variant={currentSlide === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToSlide(index)}
                className={`transition-smooth min-w-[120px] ${
                  currentSlide === index
                    ? 'bg-lime-500 text-white shadow-glow border-lime-500'
                    : 'border-slate-300 text-slate-300 bg-slate-700/30 hover:border-lime-500 hover:text-lime-400 hover:bg-white/10'
                }`}
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlider;
