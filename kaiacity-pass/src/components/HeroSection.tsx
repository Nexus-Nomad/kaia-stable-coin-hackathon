interface HeroSectionProps {
  language: 'ko' | 'en';
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    ko: {
      title: 'K-Citizenship Pass',
      subtitle: '디지털 시민권으로 자유롭게 스테이블 코인으로 편리하게',
    },
    en: {
      title: 'K-Citizenship Pass',
      subtitle:
        'Freedom with digital citizenship, convenience with stable coins',
    },
  };

  return (
    <section className="relative min-h-[8vh] flex items-center justify-center py-2 pt-16">
      {/* Content */}
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4 -translate-y-3">
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              {content[language].title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
