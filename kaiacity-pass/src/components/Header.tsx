import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Globe, Menu, X, Shield, Wallet } from 'lucide-react';
import { useKaiaWallet } from '@/hooks/use-kaia-wallet';
import { WalletProvider } from '@/lib/kaia';

interface HeaderProps {
  language: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  const {
    walletState,
    isLoading,
    availableWallets,
    connectWallet,
    disconnectWallet,
    isConnected,
  } = useKaiaWallet();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // 메인 페이지에 있을 때는 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 다른 페이지에 있을 때는 메인 페이지로 이동
      navigate('/');
    }
  };

  const menuItems = {
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

  const walletText = {
    ko: 'KAIA 월렛 카카오페이 연결',
    en: 'KAIA Wallet KakaoPay Connect',
  };

  const handleWalletConnect = async (provider: WalletProvider) => {
    try {
      await connectWallet(provider);
      setIsWalletDialogOpen(false);
    } catch (error) {
      console.error('지갑 연결 실패:', error);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('지갑 연결 해제 실패:', error);
    }
  };

  const handleKaiaButtonClick = () => {
    if (isConnected) {
      handleWalletDisconnect();
    } else {
      setIsWalletDialogOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 gradient-dark shadow-medium">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src="/team-logo.png"
              alt="K-Citizenship Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-white">K-Citizenship</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a
              href="#features"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[50px] text-center"
            >
              {language === 'ko' ? 'DID' : 'DID'}
            </a>
            <a
              href="#services"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[80px] text-center"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const fanButton = document.querySelector(
                      '[data-service="fan-community"]'
                    ) as HTMLButtonElement;
                    if (fanButton) fanButton.click();
                  }, 500);
                }
              }}
            >
              {language === 'ko' ? '팬커뮤니티' : 'Fan Community'}
            </a>
            <a
              href="#services"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[60px] text-center"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const storeButton = document.querySelector(
                      '[data-service="store"]'
                    ) as HTMLButtonElement;
                    if (storeButton) storeButton.click();
                  }, 500);
                }
              }}
            >
              {language === 'ko' ? '스토어' : 'Store'}
            </a>
            <a
              href="#services"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[60px] text-center"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const hospitalButton = document.querySelector(
                      '[data-service="hospital"]'
                    ) as HTMLButtonElement;
                    if (hospitalButton) hospitalButton.click();
                  }, 500);
                }
              }}
            >
              {language === 'ko' ? '병원' : 'Hospital'}
            </a>
            <a
              href="#services"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[80px] text-center"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const accommodationButton = document.querySelector(
                      '[data-service="accommodation"]'
                    ) as HTMLButtonElement;
                    if (accommodationButton) accommodationButton.click();
                  }, 500);
                }
              }}
            >
              {language === 'ko' ? '숙박' : 'Accommodation'}
            </a>
            <a
              href="#services"
              className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium min-w-[70px] text-center"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const startupButton = document.querySelector(
                      '[data-service="startup"]'
                    ) as HTMLButtonElement;
                    if (startupButton) startupButton.click();
                  }, 500);
                }
              }}
            >
              {language === 'ko' ? '스타트업' : 'Startup'}
            </a>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-lime-400 to-lime-500 text-black border-0 hover:from-lime-300 hover:to-lime-400 px-4 py-2 text-sm font-medium min-w-[120px] rounded-full"
              onClick={handleKaiaButtonClick}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wallet className="w-4 h-4" />
                ) : (
                  <img
                    src="/lovable-uploads/2cf75df1-b579-4502-b86f-0972d49bff2a.png"
                    alt="Kaia W Logo"
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span>
                  {isConnected
                    ? language === 'ko'
                      ? '연결됨'
                      : 'Connected'
                    : language === 'ko'
                    ? 'Kaia'
                    : 'Kaia'}
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-0 hover:from-yellow-300 hover:to-yellow-400 px-4 py-2 text-sm font-medium min-w-[120px] rounded-full"
            >
              Kakao Pay
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(language === 'ko' ? 'en' : 'ko')}
              className="text-dark-section-foreground hover:text-accent-lime min-w-[60px]"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'ko' ? 'EN' : '한'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-dark-section-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              {menuItems[language].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-dark-section-foreground hover:text-accent-lime transition-smooth font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  className="text-dark-section-foreground border-accent-sky bg-accent-sky/20 hover:bg-accent-sky hover:text-accent-sky-foreground"
                  onClick={handleKaiaButtonClick}
                  disabled={isLoading}
                >
                  {isConnected
                    ? language === 'ko'
                      ? '지갑 연결됨'
                      : 'Wallet Connected'
                    : language === 'ko'
                    ? 'KAIA 월렛'
                    : 'KAIA Wallet'}
                </Button>
                <Button
                  variant="outline"
                  className="text-dark-section-foreground border-accent-lime bg-accent-lime/20 hover:bg-accent-lime hover:text-accent-lime-foreground"
                >
                  {language === 'ko' ? '카카오페이' : 'KakaoPay'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onLanguageChange(language === 'ko' ? 'en' : 'ko');
                    setIsMenuOpen(false);
                  }}
                  className="text-dark-section-foreground hover:text-accent-lime justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'ko' ? 'English' : '한국어'}
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* 지갑 연결 다이얼로그 */}
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'ko' ? '지갑 연결' : 'Connect Wallet'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {language === 'ko'
                ? 'KAIA 네트워크와 호환되는 지갑을 선택하세요.'
                : 'Select a wallet compatible with KAIA network.'}
            </p>

            {availableWallets.length === 0 ? (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ko'
                    ? '사용 가능한 지갑이 없습니다. Kaikas 또는 MetaMask를 설치해주세요.'
                    : 'No wallets available. Please install Kaikas or MetaMask.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableWallets.map((provider) => (
                  <Button
                    key={provider}
                    variant="outline"
                    className="w-full flex items-center gap-3 p-4 h-auto"
                    onClick={() => handleWalletConnect(provider)}
                    disabled={isLoading}
                  >
                    <div className="w-8 h-8 flex-shrink-0">
                      {provider === WalletProvider.KAIKAS ? (
                        <img
                          src="/lovable-uploads/2cf75df1-b579-4502-b86f-0972d49bff2a.png"
                          alt="Kaikas"
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            M
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">
                        {provider === WalletProvider.KAIKAS
                          ? 'Kaikas'
                          : 'MetaMask'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {provider === WalletProvider.KAIKAS
                          ? language === 'ko'
                            ? 'Kaia 네트워크 전용 지갑'
                            : 'Kaia Network Wallet'
                          : language === 'ko'
                          ? '이더리움 호환 지갑'
                          : 'Ethereum Compatible Wallet'}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
