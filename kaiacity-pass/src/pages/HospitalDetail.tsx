import { useState } from 'react';
import { ArrowLeft, Hospital as HospitalIcon, Calendar, User, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const HospitalDetail = () => {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    department: '',
    doctor: '',
    date: '',
    time: '',
    symptoms: ''
  });

  const handleEmergencyCall = () => {
    window.open('tel:119', '_blank');
  };

  const handleFindHospital = () => {
    window.open('https://www.hira.or.kr/dummy/main.do', '_blank');
  };

  const handleBookAppointment = () => {
    if (!appointmentData.department || !appointmentData.date) {
      alert('진료과와 날짜를 선택해주세요.');
      return;
    }
    alert(`예약이 완료되었습니다!\n진료과: ${appointmentData.department}\n날짜: ${appointmentData.date}\n시간: ${appointmentData.time}`);
  };

  const departments = [
    '내과', '외과', '소아과', '산부인과', '정형외과', 
    '신경과', '피부과', '안과', '이비인후과', '치과'
  ];

  const doctors = {
    '내과': ['김내과 교수', '이내과 교수', '박내과 교수'],
    '외과': ['김외과 교수', '이외과 교수', '박외과 교수'],
    '소아과': ['김소아 교수', '이소아 교수', '박소아 교수']
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/hospital')}
            className="bg-green-500 text-white hover:bg-green-600 border-green-500 px-6 py-3 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로 돌아가기
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <HospitalIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">병원 예약 시스템</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 진료 예약 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                진료 예약
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">진료과</label>
                <Select onValueChange={(value) => setAppointmentData({...appointmentData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="진료과를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {appointmentData.department && (
                <div>
                  <label className="block text-sm font-medium mb-2">담당의</label>
                  <Select onValueChange={(value) => setAppointmentData({...appointmentData, doctor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="담당의를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {(doctors[appointmentData.department as keyof typeof doctors] || []).map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">진료 날짜</label>
                <Input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">진료 시간</label>
                <Select onValueChange={(value) => setAppointmentData({...appointmentData, time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="시간을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">증상 설명</label>
                <Textarea
                  placeholder="현재 증상을 자세히 설명해주세요"
                  value={appointmentData.symptoms}
                  onChange={(e) => setAppointmentData({...appointmentData, symptoms: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                onClick={handleBookAppointment}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                예약하기
              </Button>
            </CardContent>
          </Card>

          {/* 건강검진 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HospitalIcon className="w-5 h-5 text-blue-500" />
                건강검진
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                정기 건강검진으로 건강을 관리하세요
              </p>
              <div>
                <label className="block text-sm font-medium mb-2">검진 항목</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="검진을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">기본 건강검진</SelectItem>
                    <SelectItem value="comprehensive">종합 건강검진</SelectItem>
                    <SelectItem value="cancer">암 검진</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                검진예약
              </Button>
            </CardContent>
          </Card>

          {/* 응급실 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Phone className="w-5 h-5" />
                응급실
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                24시간 응급실 운영 및 응급차서
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-700">응급실 대기시간</div>
                  <div className="text-sm text-gray-600">약 15분</div>
                </div>
                <Button 
                  onClick={handleEmergencyCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  응급실 정보
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 진료과별 안내 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>진료과별 안내</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: '내과', desc: '일반내과, 소화기내과, 심장내과', time: '평일 09:00-18:00 토 09:00-13:00', color: 'bg-blue-500' },
                { name: '외과', desc: '일반외과, 정형외과, 신경외과', time: '평일 09:00-18:00 토 09:00-13:00', color: 'bg-red-500' },
                { name: '소아과', desc: '소아청소년과, 신생아과', time: '평일 09:00-18:00 토 09:00-13:00', color: 'bg-yellow-500' },
                { name: '산부인과', desc: '산과, 부인과, 불임클리닉', time: '평일 09:00-18:00 토 09:00-13:00', color: 'bg-pink-500' }
              ].map((dept, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className={`w-16 h-16 ${dept.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <HospitalIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dept.desc}</p>
                  <p className="text-xs text-gray-500">{dept.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDetail;