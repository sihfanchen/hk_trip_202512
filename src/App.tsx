import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plane, Home, Calendar, Clock, MapPin, ShoppingBag, Utensils, Zap } from 'lucide-react';

// 由於這是一個純粹的展示應用，我們不需要 Firestore/Auth 邏輯，但仍需定義全局變數以符合 Canvas 環境要求。
const __app_id = 'hk-itinerary-app';
const __firebase_config = '{}';
const __initial_auth_token = '';

const itineraryData = [
  {
    date: '12/13',
    day: '第一天 (六)',
    theme: '抵港、九龍迎賓與維港夜色',
    color: 'bg-red-100 border-red-500',
    activities: [
      { time: '08:00', region: '台中', detail: '搭乘高鐵至桃園機場', notes: '提前 3 小時抵達機場，時間充裕。', icon: Plane },
      { time: '14:15', region: '香港機場', detail: '抵達香港國際機場 (HKG)', notes: '辦理事項： 入境、領行李。準備： 在機場快線櫃檯購買或確認八達通卡。', icon: Plane },
      { time: '15:30', region: '機場 → 旺角', detail: '搭乘城巴 A21 (約 HKD 34.6)', notes: '車程： 約 60-75 分鐘。下車點： 「旺角中心」或「銀行中心」站，離賓館最近。', icon: MapPin },
      { time: '16:30', region: '旺角', detail: '安達賓館 Check-in', notes: '提醒： 新興大廈週末電梯等待時間可能較長，請保持耐心。', icon: Home },
      { time: '17:30', region: '尖沙咀', detail: '晚餐 & 準備看秀', notes: '地鐵至尖沙咀站。晚餐可選擇海港城附近或蘭芳園。', icon: Utensils },
      { time: '19:40', region: '尖沙咀海旁', detail: '星光大道卡位', notes: '尋找面向香港島的最佳位置，準備迎接燈光秀。', icon: Zap },
      { time: '20:00', region: '維港', detail: '幻彩詠香江 (A Symphony of Lights)', notes: '燈光秀約 15 分鐘，結束後開始向佐敦移動。', icon: Zap },
      { time: '21:00', region: '佐敦', detail: '宵夜與甜品', notes: '美食推薦： 佳佳甜品、澳洲牛奶公司（若未關）。', icon: Utensils },
      { time: '22:00', region: '油麻地', detail: '舊油麻地警署', notes: '港片經典場景，晚上打燈氣氛極佳（僅在門口拍照）。', icon: MapPin },
    ],
  },
  {
    date: '12/14',
    day: '第二天 (日)',
    theme: '深水埗與旺角購物',
    color: 'bg-yellow-100 border-yellow-500',
    activities: [
      { time: '09:00', region: '深水埗', detail: '最道地的早餐', notes: '必吃： 合益泰豬腸粉、公和荳品廠。注意： 這些老店通常只收現金。', icon: Utensils },
      { time: '10:30', region: '深水埗', detail: '鴨寮街尋寶', notes: '電子零件、舊物古玩、玩具街 (福榮街) 買公仔和紀念品。', icon: ShoppingBag },
      { time: '13:00', region: '深水埗', detail: '地道午餐', notes: '推薦： 維記咖啡粉麵（豬潤麵）、劉森記麵家（竹昇麵）。', icon: Utensils },
      { time: '14:30', region: '太子', detail: '花、鳥、魚主題街', notes: '逛花墟、金魚街、雀鳥花園，感受週末市集氣氛。', icon: MapPin },
      { time: '16:30', region: '太子/旺角', detail: '金華冰廳下午茶', notes: '號稱全港第一的菠蘿油配熱奶茶。', icon: Utensils },
      { time: '18:00', region: '旺角', detail: '購物衝刺', notes: '飯店主場優勢！逛波鞋街 (花園街)、朗豪坊、女人街。', icon: ShoppingBag },
      { time: '20:30', region: '旺角', detail: '晚餐/宵夜', notes: '飯店周邊覓食：富記粥品 (燒鵝粥) 或 點點心 (港點)。', icon: Utensils },
    ],
  },
  {
    date: '12/15',
    day: '第三天 (一)',
    theme: '港島東慢遊與燒臘朝聖',
    color: 'bg-blue-100 border-blue-500',
    activities: [
      { time: '08:30', region: '太古', detail: '怪獸大廈 (益昌大廈)', notes: '仰拍密集的壓迫感建築，拍照請保持安靜。', icon: MapPin },
      { time: '09:30', region: '港島東', detail: '叮叮車體驗', notes: '坐上層第一排至北角，享受懷舊體驗。', icon: MapPin },
      { time: '10:30', region: '北角', detail: '春秧街市場奇景', notes: '看電車如何在菜市場人潮中穿行。可留意德成號蛋捲。', icon: ShoppingBag },
      { time: '12:00', region: '銅鑼灣', detail: '午餐與購物', notes: '推薦： 何洪記粥麵 或 榮記粉麵。逛 SOGO、時代廣場。', icon: Utensils },
      { time: '14:30', region: '灣仔', detail: '老區歷史與文創', notes: '藍屋建築群、太原街玩具街、利東街 (歐風步行街)。', icon: MapPin },
      { time: '17:00', region: '灣仔', detail: '燒臘大餐 (平日制霸)', notes: '鎖定米其林名店 甘牌燒鵝 或 再興燒臘。避開尖峰時段。', icon: Utensils },
      { time: '19:00', region: '灣仔 → 尖沙咀', detail: '天星小輪', notes: '欣賞華燈初上的維港景色。', icon: MapPin },
    ],
  },
  {
    date: '12/16',
    day: '第四天 (二)',
    theme: '中上環美食與太平山壓軸',
    color: 'bg-green-100 border-green-500',
    activities: [
      { time: '08:00', region: '佐敦', detail: '澳洲牛奶公司早餐', notes: '體驗經典的炒蛋多士。建議早到，減少排隊時間。', icon: Utensils },
      { time: '09:30', region: '堅尼地城', detail: '海邊與港大', notes: '海旁散步，可在 % Arabica 喝咖啡。順遊香港大學。', icon: MapPin },
      { time: '12:00', region: '中上環', detail: '傳奇老店午餐', notes: '選擇：九記牛腩、勝香園 (大排檔)、沾仔記 (雲吞麵)。建議 12:00 前抵達避開人潮。', icon: Utensils },
      { time: '14:00', region: '中環', detail: '歷史與時尚交錯', notes: '參觀前警署古蹟 大館。走過石板街，搭乘半山手扶梯。', icon: MapPin },
      { time: '16:30', region: '中環', detail: '太平山纜車', notes: '必備： 事先購買纜車+凌霄閣套票+搶靠右座位。', icon: MapPin },
      { time: '17:30', region: '太平山頂', detail: '觀賞日落與夜景', notes: '搶凌霄閣摩天台最佳觀景點，觀賞日景→黃昏→夜景的變化。', icon: Zap },
      { time: '19:30', region: '下山', detail: '纜車或巴士/小巴', notes: '若纜車排隊太久，可改搭 15 號巴士或 1 號小巴下山。', icon: MapPin },
    ],
  },
  {
    date: '12/17',
    day: '第五天 (三)',
    theme: '優雅離港',
    color: 'bg-purple-100 border-purple-500',
    activities: [
      { time: '09:00', region: '旺角', detail: '最後衝刺與 Check-out', notes: '在飯店附近購買伴手禮和藥品。退房。', icon: ShoppingBag },
      { time: '09:30', region: '香港站', detail: '市區預辦登機', notes: '核心： 刷卡進站後，先到國泰櫃檯託運行李、領登機證。', icon: Plane },
      { time: '10:00', region: '中環/灣仔', detail: '兩手空空漫遊', notes: '在中環海濱或灣仔的利東街、金紫荊廣場做最後巡禮。找一家茶餐廳享用早午餐。', icon: MapPin },
      { time: '13:00', region: '香港站', detail: '搭乘機場快線', notes: '搭車時間。 車程僅 24 分鐘。', icon: Plane },
      { time: '13:15', region: '香港站', detail: '搭乘機場快線', notes: '搭車時間。 車程僅 24 分鐘。', icon: Plane },
      { time: '13:30', region: '香港站', detail: '搭乘機場快線', notes: '最晚搭車時間。 車程僅 24 分鐘。', icon: Plane },
      { time: '14:00', region: '香港機場', detail: '機場免稅店/貴賓室', notes: '過安檢、出境。逛迪士尼商店、化妝品免稅店等。', icon: ShoppingBag },
      { time: '15:45', region: '離港', detail: 'CX472 航班起飛', notes: '結束美好的香港之旅。', icon: Plane },
    ],
  },
];

const ItineraryHeader = () => (
  <div className="p-4 sm:p-6 bg-white shadow-xl rounded-xl mb-8 border-t-4 border-blue-600">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
      <Plane className="w-8 h-8 mr-3 text-blue-600" />
      🇭🇰 香港 5 天 4 夜深度遊行程總覽
    </h1>
    <p className="text-sm sm:text-base text-gray-500 font-medium mb-4">日期：12/13 (六) - 12/17 (三)</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
      <div className="flex items-start p-3 bg-gray-50 rounded-lg shadow-inner">
        <Plane className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-700">航班資訊</h4>
          <p className="text-gray-600">
            去程: CX461 (TPE 12:25 → HKG 14:15)
            <br />
            回程: CX472 (HKG 15:45 → TPE 17:35)
          </p>
        </div>
      </div>
      <div className="flex items-start p-3 bg-gray-50 rounded-lg shadow-inner">
        <Home className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-700">住宿資訊</h4>
          <p className="text-gray-600">
            旺角安達賓館 (新興大廈)
            <br />
            交通便利，九龍核心區。
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DayItineraryCard = ({ dayPlan, isExpanded, onToggle }) => {
  const Icon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className={`rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300 ${dayPlan.color} border-l-8`}>
      {/* Header (Accordion Toggle) */}
      <button
        onClick={onToggle}
        className={`w-full text-left p-4 sm:p-6 flex justify-between items-center text-gray-900 transition-colors duration-200 ${
          isExpanded ? 'bg-white/80' : 'hover:bg-white/50 bg-white'
        }`}
      >
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-500 flex items-center mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            {dayPlan.day} ({dayPlan.date})
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold">{dayPlan.theme}</h2>
        </div>
        <Icon className="w-6 h-6 text-gray-600" />
      </button>

      {/* Content (Collapsible) */}
      <div
        className={`px-4 sm:px-6 overflow-hidden transition-max-height duration-500 ease-in-out ${
          isExpanded ? 'max-h-[2000px] py-4 sm:py-6' : 'max-h-0'
        } bg-white`}
      >
        {/* Responsive Table for Desktop */}
        <div className="hidden lg:block w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  時間
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  區域
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
                  行程細節
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">
                  交通與提醒
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dayPlan.activities.map((activity, index) => {
                const ActivityIcon = activity.icon;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <div className='flex items-center'>
                        <Clock className='w-4 h-4 mr-2 text-indigo-500' />
                        {activity.time}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-blue-600 font-medium">
                      {activity.region}
                    </td>
                    <td className="p-3 text-sm text-gray-800 flex items-start">
                      <ActivityIcon className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                      {activity.detail}
                    </td>
                    <td className="p-3 text-xs text-gray-500 italic">
                      {activity.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View (List Style) */}
        <div className="lg:hidden space-y-4">
          {dayPlan.activities.map((activity, index) => {
            const ActivityIcon = activity.icon;
            return (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center space-x-3 mb-1">
                  <Clock className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <p className="font-bold text-lg text-gray-900">{activity.time}</p>
                  <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                    {activity.region}
                  </span>
                </div>
                <div className="pl-8">
                  <p className="text-gray-800 flex items-start mb-2">
                    <ActivityIcon className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                    {activity.detail}
                  </p>
                  <p className="text-xs italic text-gray-500 border-l-2 border-gray-200 pl-3">
                    {activity.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // 設置 state 來控制哪個行程日是展開的
  const [expandedDay, setExpandedDay] = useState('第一天 (六)');

  const handleToggle = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <ItineraryHeader />
        
        <div className="space-y-6">
          {itineraryData.map((dayPlan) => (
            <DayItineraryCard
              key={dayPlan.day}
              dayPlan={dayPlan}
              isExpanded={expandedDay === dayPlan.day}
              onToggle={() => handleToggle(dayPlan.day)}
            />
          ))}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 py-4">
          <p>© 2025/12 香港深度遊行程 (數據靜態展示)</p>
          <p>祝您旅途愉快！</p>
        </footer>
      </div>
    </div>
  );
};

export default App;