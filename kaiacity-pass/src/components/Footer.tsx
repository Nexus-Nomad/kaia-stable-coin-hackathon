import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  language: 'ko' | 'en';
  onLanguageChange?: (lang: 'ko' | 'en') => void;
}

const Footer = ({ language, onLanguageChange }: FooterProps) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const scrollToElementWithOffset = (element: HTMLElement) => {
      const headerHeight = 80; // sticky 헤더의 높이
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    };

    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          scrollToElementWithOffset(element);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        scrollToElementWithOffset(element);
      }
    }
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('K-Citizenship 문의');
    const body = encodeURIComponent(
      '안녕하세요,\n\nK-Citizenship에 대해 문의드립니다.\n\n'
    );
    window.open(
      `mailto:contact@k-citizenship.com?subject=${subject}&body=${body}`,
      '_blank'
    );
  };

  const handleLanguageToggle = () => {
    if (onLanguageChange) {
      onLanguageChange(language === 'ko' ? 'en' : 'ko');
    }
  };
  const content = {
    ko: {
      tagline: 'Web3 시대의 디지털 시민권',
      description:
        'K-Citizenship Pass로 안전하고 편리한 디지털 생활을 시작하세요.',
      quickLinks: '빠른 링크',
      services: '서비스',
      contact: '연락처',
      address: '서울특별시 강남구 테헤란로 123',
      email: 'contact@k-citizenship.com',
      phone: '+82-2-1234-5678',
      copyright: '© 2025 K-Citizenship. All rights reserved.',
    },
    en: {
      tagline: 'Digital Citizenship for the Web3 Era',
      description:
        'Start your safe and convenient digital life with K-Citizenship Pass.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      address: '123 Teheran-ro, Gangnam-gu, Seoul, South Korea',
      email: 'contact@k-citizenship.com',
      phone: '+82-2-1234-5678',
      copyright: '© 2025 K-Citizenship. All rights reserved.',
    },
  };

  const links = {
    ko: ['DID', '팬커뮤니티', '스토어', '병원', '숙박', '스타트업'],
    en: [
      'DID',
      'Fan Community',
      'Store',
      'Hospital',
      'Accommodation',
      'Startup',
    ],
  };

  const services = {
    ko: ['신분증 발급', '신분증 조회', 'Web3 여권', '파트너십', '개발자 API'],
    en: [
      'ID Issuance',
      'ID Verification',
      'Web3 Passport',
      'Partnership',
      'Developer API',
    ],
  };

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">
                  K-Citizenship
                </span>
              </div>
              <p className="text-lg text-white/80 mb-4">
                {content[language].tagline}
              </p>
              <p className="text-white/60 mb-6 max-w-md">
                {content[language].description}
              </p>
              <div className="flex space-x-4">
                <div
                  className="w-10 h-10 bg-accent-lime/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent-lime/30 transition-smooth"
                  onClick={handleLanguageToggle}
                >
                  <Globe className="w-5 h-5 text-accent-lime" />
                </div>
                <div
                  className="w-10 h-10 bg-accent-sky/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent-sky/30 transition-smooth"
                  onClick={handleEmailClick}
                >
                  <Mail className="w-5 h-5 text-accent-sky" />
                </div>
              </div>
            </div>

            {/* Services section - moved to left */}
            <div className="text-right">
              <h3 className="text-lg font-semibold text-white mb-6">
                {content[language].services}
              </h3>
              <ul className="space-y-3">
                {services[language].map((service, index) => {
                  const handleServiceClick = (serviceIndex: number) => {
                    switch (serviceIndex) {
                      case 0: // 신분증 발급 / ID Issuance
                        navigate('/id-issuance');
                        break;
                      case 1: // 신분증 조회 / ID Verification
                        navigate('/id-verification');
                        break;
                      case 2: // Web3 여권 / Web3 Passport
                        navigate('/web3-passport');
                        break;
                      case 3: // 파트너십 / Partnership
                        scrollToSection('partners');
                        break;
                      case 4: // 개발자 API / Developer API
                        navigate('/developer-api');
                        break;
                    }
                  };

                  return (
                    <li key={index}>
                      <button
                        onClick={() => handleServiceClick(index)}
                        className="text-white/70 hover:text-accent-sky transition-smooth"
                      >
                        {service}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Links - positioned with proper spacing and moved right */}
            <div className="text-right ml-20">
              <h3 className="text-lg font-semibold text-white mb-6">
                {content[language].quickLinks}
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-white/70 hover:text-accent-lime transition-smooth"
                  >
                    {language === 'ko' ? 'DID' : 'DID'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-white/70 hover:text-accent-lime transition-smooth"
                  >
                    {language === 'ko' ? '서비스' : 'Services'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('stats')}
                    className="text-white/70 hover:text-accent-lime transition-smooth"
                  >
                    {language === 'ko' ? '통계' : 'Statistics'}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-emerald" />
                <span className="text-white/70">서울 강남구 역삼동</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-accent-sky" />
                <span className="text-white/70">contact@k-citizenship.com</span>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <Phone className="w-5 h-5 text-accent-lime" />
                <span className="text-white/70">+82-2-1234-5678</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="text-center mb-4">
              <p className="text-white font-semibold text-lg mb-4">
                K-Citizenship
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/70">
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-accent-lime transition-smooth"
                >
                  이용약관
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-accent-lime transition-smooth"
                >
                  개인정보처리방침
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-accent-lime transition-smooth"
                >
                  FAQ
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={() => navigate('/notice')}
                  className="hover:text-accent-lime transition-smooth"
                >
                  공지사항
                </button>
                <span className="text-gray-500">|</span>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-accent-lime transition-smooth"
                >
                  문의하기
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/60">{content[language].copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
