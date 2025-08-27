import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ChatHelperProps {
  language: 'ko' | 'en';
}

const ChatHelper = ({ language }: ChatHelperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    ko: {
      title: '도움이 필요하신가요?',
      placeholder: '무엇을 도와드릴까요?',
      send: '전송'
    },
    en: {
      title: 'Need help?',
      placeholder: 'How can we help you?',
      send: 'Send'
    }
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#00B900] hover:bg-[#009900] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96">
          <Card className="w-full h-full shadow-xl border-0">
            <div className="bg-[#00B900] text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-medium">LINE 고객지원</span>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex-1 bg-gray-50 rounded-lg p-3 mb-4 overflow-y-auto">
                <div className="bg-white rounded-lg p-3 shadow-sm mb-2">
                  <p className="text-sm text-gray-700">
                    {content[language].title}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={content[language].placeholder}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B900]"
                />
                <Button size="sm" className="bg-[#00B900] hover:bg-[#009900] text-white">
                  {content[language].send}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatHelper;