import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ContactProps {
  language?: 'ko' | 'en';
}

const Contact = ({ language = 'ko' }: ContactProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(language === 'ko' ? '문의가 접수되었습니다.' : 'Your inquiry has been submitted.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const content = {
    ko: {
      title: '문의하기',
      subtitle: 'K-Citizenship Pass 고객지원',
      form: {
        name: '이름',
        email: '이메일',
        subject: '제목',
        message: '문의내용',
        submit: '문의하기',
        namePlaceholder: '홍길동',
        emailPlaceholder: 'hong@example.com',
        subjectPlaceholder: '문의 제목을 입력해주세요',
        messagePlaceholder: '문의하실 내용을 자세히 입력해주세요'
      },
      contact: {
        info: '연락처 정보',
        phone: '고객센터',
        phoneNumber: '1588-0000',
        email: '이메일',
        emailAddress: 'support@k-citizenship.com',
        address: '주소',
        addressText: '서울특별시 강남구 테헤란로 123',
        hours: '운영시간',
        hoursText: '24시간 (연중무휴)'
      },
      backButton: '홈으로 돌아가기'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'K-Citizenship Pass Customer Support',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Submit',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@example.com',
        subjectPlaceholder: 'Enter your inquiry subject',
        messagePlaceholder: 'Please enter your inquiry in detail'
      },
      contact: {
        info: 'Contact Information',
        phone: 'Customer Service',
        phoneNumber: '1588-0000',
        email: 'Email',
        emailAddress: 'support@k-citizenship.com',
        address: 'Address',
        addressText: '123 Teheran-ro, Gangnam-gu, Seoul',
        hours: 'Operating Hours',
        hoursText: '24 Hours (Year-round)'
      },
      backButton: 'Back to Home'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center mb-8 pt-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:text-lime-400 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-lime-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">{content[language].title}</h1>
              <p className="text-slate-300">{content[language].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lime-400">{content[language].form.submit}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">{content[language].form.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content[language].form.namePlaceholder}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">{content[language].form.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content[language].form.emailPlaceholder}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-slate-300">{content[language].form.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={content[language].form.subjectPlaceholder}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-300">{content[language].form.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={content[language].form.messagePlaceholder}
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-lime-600 hover:bg-lime-700 text-white">
                  {content[language].form.submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lime-400">{content[language].contact.info}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-lime-400" />
                <div>
                  <p className="text-slate-300 font-medium">{content[language].contact.phone}</p>
                  <p className="text-white text-lg">{content[language].contact.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-lime-400" />
                <div>
                  <p className="text-slate-300 font-medium">{content[language].contact.email}</p>
                  <p className="text-white">{content[language].contact.emailAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-lime-400" />
                <div>
                  <p className="text-slate-300 font-medium">{content[language].contact.address}</p>
                  <p className="text-white">{content[language].contact.addressText}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-lime-400" />
                <div>
                  <p className="text-slate-300 font-medium">{content[language].contact.hours}</p>
                  <p className="text-white">{content[language].contact.hoursText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default Contact;