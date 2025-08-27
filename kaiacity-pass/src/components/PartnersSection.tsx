interface PartnersSectionProps {
  language: 'ko' | 'en';
}

const PartnersSection = ({ language }: PartnersSectionProps) => {
  const content = {
    ko: {
      title: '신뢰받는 파트너들',
      subtitle: 'K-Citizenship Pass와 함께하는 글로벌 파트너'
    },
    en: {
      title: 'Trusted Partners',
      subtitle: 'Global partners working with K-Citizenship Pass'
    }
  };

  const partners = [
    'KakaoPay', 'LINE', 'KAIA', 'Democratic Party', 'TechFlow', 'InnovateLab', 
    'CryptoCore', 'DataStream', 'NextChain', 'SmartHub', 
    'CodeVault', 'WebForge', 'TechPrime', 'DigitalEdge', 'CloudSync', 'MetaLink'
  ];

  return (
    <section id="partners" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-section-foreground mb-4">
              {language === 'ko' ? '파트너' : 'Partners'}
            </h2>
            <p className="text-lg text-dark-section-foreground/80">
              {language === 'ko' 
                ? '함께하는 글로벌 파트너들' 
                : 'Global partners working with us'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 hover:bg-white/10 rounded-lg transition-smooth cursor-pointer group"
              >
                <span className="text-sm md:text-base font-medium text-dark-section-foreground/70 group-hover:text-dark-section-foreground transition-smooth text-center">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;