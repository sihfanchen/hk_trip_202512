import React, { useState } from 'react';
import { Plane, Hotel, MapPin, Clock, Info, Train, Utensils, Camera, ChevronDown, ChevronUp, Map, ExternalLink } from 'lucide-react';

// 1. 定義資料型別 (TypeScript Interface)
interface FlightDetail {
  outbound: string;
  inbound: string;
}

interface TripInfo {
  dates: string;
  hotel: string;
  flights: FlightDetail;
}

interface TripEvent {
  time: string;
  location: string;
  activity: string;
  type: string;
  note?: string;
  mapQuery?: string; // 可選：如果需要精確搜尋，可以手動指定關鍵字，否則預設用 location
}

interface DayItinerary {
  day: number;
  date: string;
  title: string;
  summary: string; // 新增：顯示在折疊狀態的小標題/摘要
  events: TripEvent[];
}

const HongKongItinerary: React.FC = () => {
  // 修改狀態：控制哪一天展開 (null 代表都沒展開，預設展開第一天：0)
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  // Google Map 連結產生器
  const getMapLink = (location: string, customQuery?: string) => {
    const query = customQuery || location;
    // 使用 Google Maps Search API
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("香港 " + query)}`;
  };

  const tripInfo: TripInfo = {
    dates: "2024/12/13 - 12/17",
    hotel: "旺角安達賓館 (新興大廈)",
    flights: {
      outbound: "CX461 (TPE 12:25 → HKG 14:15)",
      inbound: "CX472 (HKG 15:45 → TPE 17:35)"
    }
  };

  const itinerary: DayItinerary[] = [
    {
      day: 1,
      date: "12/13 (六)",
      title: "抵港、九龍迎賓與維港夜色",
      summary: "機場接機 • 旺角安頓 • 維港燈光秀 • 廟街宵夜",
      events: [
        { time: "08:00", location: "台中/桃園機場", activity: "搭乘高鐵至桃園機場", type: "transport", note: "提前 3 小時抵達機場，時間充裕。" },
        { time: "14:15", location: "香港國際機場", activity: "抵達、入境、領行李", type: "arrival", note: "準備：在機場快線櫃檯購買或確認八達通卡。" },
        { time: "15:30", location: "機場地面運輸中心", activity: "搭乘城巴 A21 (約 HKD 34.6)", type: "transport", note: "車程約 60-75 分鐘。下車點：「旺角中心」或「銀行中心」。" },
        { time: "16:30", location: "旺角安達賓館", activity: "Check-in", type: "hotel", note: "新興大廈週末電梯等待時間可能較長，請保持耐心。" },
        { time: "17:30", location: "尖沙咀", activity: "晚餐 & 準備看秀", type: "food", note: "地鐵至尖沙咀站。晚餐：海港城附近或蘭芳園（重慶大廈）。" },
        { time: "19:40", location: "尖沙咀星光大道", activity: "星光大道卡位", type: "sight", note: "尋找面向香港島的最佳位置。" },
        { time: "20:00", location: "維多利亞港", activity: "幻彩詠香江 (A Symphony of Lights)", type: "sight", note: "燈光秀約 15 分鐘。" },
        { time: "21:00", location: "佐敦佳佳甜品", activity: "宵夜與甜品", type: "food", note: "必點：芝麻糊、核桃露。也可去澳洲牛奶公司。" },
        { time: "22:00", location: "舊油麻地警署", activity: "港片經典場景", type: "sight", note: "打卡拍照。走路約 10 分鐘回旺角飯店。" }
      ]
    },
    {
      day: 2,
      date: "12/14 (日)",
      title: "深水埗道地體驗與旺角購物",
      summary: "傳統早餐 • 鴨寮街尋寶 • 花鳥魚市場 • 旺角商圈",
      events: [
        { time: "09:00", location: "深水埗", activity: "最道地的早餐", type: "food", note: "合益泰豬腸粉、公和荳品廠。注意：通常只收現金。" },
        { time: "10:30", location: "鴨寮街", activity: "電子街尋寶 & 玩具街", type: "shopping", note: "電子零件、舊物、福榮街買公仔。" },
        { time: "13:00", location: "維記咖啡粉麵", activity: "地道午餐", type: "food", note: "招牌：豬潤麵。或選劉森記麵家。" },
        { time: "14:30", location: "旺角花墟", activity: "花、鳥、魚主題街", type: "sight", note: "花墟、金魚街、雀鳥花園。步行約 15 分鐘。" },
        { time: "16:30", location: "金華冰廳", activity: "傳奇下午茶", type: "food", note: "號稱全港第一的菠蘿油配熱奶茶。" },
        { time: "18:00", location: "波鞋街", activity: "購物衝刺 (主場優勢)", type: "shopping", note: "花園街(波鞋)、朗豪坊、女人街。" },
        { time: "20:30", location: "富記粥品", activity: "晚餐/宵夜", type: "food", note: "燒鵝粥一絕。或者吃點點心。" }
      ]
    },
    {
      day: 3,
      date: "12/15 (一)",
      title: "中上環美食、香氛與太平山",
      summary: "澳牛早餐 • 堅尼地城步行至上環 • 兆成行 • 太平山夜景",
      events: [
        { time: "08:00", location: "澳洲牛奶公司", activity: "經典早餐體驗", type: "food", note: "體驗光速餐點服務與炒蛋多士。建議早到。" },
        // 修改：精確定位在籃球場，步行至上環
        { time: "09:30", location: "堅尼地城", activity: "海邊散步 (籃球場) & 經香港大學步行", type: "sight", note: "步行路線：籃球場 → 香港大學 → 上環。路徑順暢且省交通費。", mapQuery: "堅尼地城籃球場" },
        // 修改：兆成行移到午餐前
        { time: "11:00", location: "上環兆成行", activity: "購買知名香薰油", type: "shopping", note: "步行抵達蘇杭街。建議停留 30-40 分鐘。", mapQuery: "上環兆成行" },
        // 修改：午餐地點在中環/上環銜接處，並排除牛肉
        { time: "12:00", location: "中環", activity: "午餐：一樂燒鵝 或 沾仔記", type: "food", note: "不吃牛首選：米其林一星燒鵝 或 鮮蝦雲吞麵。也可選勝香園 (蕃茄豬扒麵)。" },
        { time: "13:30", location: "大館", activity: "古蹟與時尚", type: "sight", note: "參觀前警署古蹟，走過石板街、半山手扶梯。" },
        { time: "16:30", location: "花園道纜車站", activity: "前往太平山", type: "transport", note: "步行或 15C 巴士。必備：纜車+凌霄閣套票。" },
        { time: "17:30", location: "太平山頂凌霄閣", activity: "百萬夜景 (日落→夜景)", type: "sight", note: "摩天台最佳觀景點，風大請帶外套。" },
        { time: "19:30", location: "中環", activity: "下山 & 晚餐", type: "transport", note: "若纜車人多可改搭 15 號巴士或 1 號小巴。" }
      ]
    },
    {
      day: 4,
      date: "12/16 (二)",
      title: "港島東慢遊與燒臘朝聖",
      summary: "怪獸大廈 • 叮叮車體驗 • 銅鑼灣 • 灣仔燒臘大餐",
      events: [
        { time: "08:30", location: "益昌大廈", activity: "怪獸大廈打卡", type: "sight", note: "太古站 B 出口。仰拍密集建築，請保持安靜。" },
        { time: "09:30", location: "英皇道", activity: "叮叮車體驗", type: "transport", note: "往「西行」方向，坐上層第一排至北角。" },
        { time: "10:30", location: "春秧街", activity: "市場奇景", type: "sight", note: "電車穿行菜市場。可留意德成號蛋捲。" },
        { time: "12:00", location: "銅鑼灣", activity: "午餐與購物", type: "food", note: "何洪記粥麵、榮記粉麵。逛 SOGO、時代廣場。" },
        { time: "14:30", location: "灣仔藍屋", activity: "老區歷史與文創", type: "sight", note: "藍屋建築群、太原街玩具街、利東街。" },
        { time: "17:00", location: "甘牌燒鵝", activity: "燒臘大餐 (平日制霸)", type: "food", note: "或選再興燒臘。建議避開尖峰時段。" },
        { time: "19:00", location: "灣仔碼頭", activity: "天星小輪回尖沙咀", type: "transport", note: "欣賞華燈初上，最便宜的觀光遊船。" }
      ]
    },
    {
      day: 5,
      date: "12/17 (三)",
      title: "優雅離港",
      summary: "最後採買 • 市區預辦登機 • 機場免稅店",
      events: [
        { time: "09:00", location: "旺角", activity: "最後衝刺 & Check-out", type: "shopping", note: "超市買伴手禮。退房。" },
        { time: "09:30", location: "香港站", activity: "市區預辦登機 (重要)", type: "transport", note: "刷機場快線票進站→託運行李→領登機證。" },
        { time: "10:00", location: "中環海濱活動空間", activity: "兩手空空漫遊", type: "sight", note: "金紫荊廣場、摩天輪周邊。找茶餐廳享用早午餐。" },
        { time: "13:30", location: "香港站", activity: "搭乘機場快線", type: "transport", note: "最晚搭車時間 (車程 24 分鐘)。" },
        { time: "14:00", location: "香港國際機場", activity: "安檢 & 免稅店", type: "shopping", note: "逛迪士尼商店、最後採買。" },
        { time: "15:45", location: "香港國際機場", activity: "CX472 航班起飛", type: "arrival", note: "平安回家。" }
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'transport': return <Train size={18} className="text-blue-500" />;
      case 'arrival': return <Plane size={18} className="text-blue-600" />;
      case 'hotel': return <Hotel size={18} className="text-indigo-500" />;
      case 'food': return <Utensils size={18} className="text-orange-500" />;
      case 'sight': return <Camera size={18} className="text-emerald-500" />;
      case 'shopping': return <MapPin size={18} className="text-pink-500" />;
      default: return <Clock size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-xl font-sans text-gray-800 flex flex-col">
      {/* Header (標頭) */}
      <div className="bg-red-700 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <Plane size={120} />
        </div>
        <h1 className="text-2xl font-bold mb-2">香港 5 天 4 夜深度遊</h1>
        <p className="text-red-100 flex items-center text-sm mb-4">
          <Clock size={14} className="mr-1" /> {tripInfo.dates}
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm border border-white/20">
          <div className="flex items-center mb-2">
            <Hotel size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{tripInfo.hotel}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-red-100">
            <span>去: CX461 (12:25)</span>
            <span>回: CX472 (15:45)</span>
          </div>
        </div>
      </div>

      {/* Accordion Content (折疊式行程內容) */}
      <div className="flex-1 p-4 pb-8 overflow-y-auto space-y-4 mt-2">
        {itinerary.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
              expandedDay === index ? 'border-red-200 ring-2 ring-red-50' : 'border-gray-100'
            }`}
          >
            {/* Day Header (可點擊的日標題) */}
            <button
              onClick={() => toggleDay(index)}
              className="w-full text-left"
            >
              <div className="p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      expandedDay === index ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      Day {item.day}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{item.title}</h3>
                  {/* 小標題/摘要顯示區 */}
                  <p className="text-xs text-gray-500 line-clamp-1 flex items-center">
                    <MapPin size={10} className="mr-1 inline" />
                    {item.summary}
                  </p>
                </div>
                <div className={`transform transition-transform duration-300 mt-2 ${expandedDay === index ? 'rotate-180' : ''}`}>
                  {expandedDay === index ? <ChevronUp className="text-red-500" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>
            </button>

            {/* Expanded Timeline Content (展開的時間軸) */}
            {expandedDay === index && (
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                <div className="relative border-l-2 border-gray-200 ml-2 space-y-6 my-2">
                  {item.events.map((event, idx) => (
                    <div key={idx} className="relative pl-6">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-0 bg-white border-2 border-gray-300 rounded-full p-1 z-10">
                        {getIcon(event.type)}
                      </div>

                      {/* Event Details */}
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600">
                            {event.time}
                          </span>
                          
                          {/* Google Map Link Button */}
                          <a 
                            href={getMapLink(event.location, event.mapQuery)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-blue-500 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-full transition-colors"
                          >
                            <Map size={12} className="mr-1" />
                            地圖
                            <ExternalLink size={10} className="ml-1" />
                          </a>
                        </div>
                        
                        <h4 className="font-bold text-gray-800 mb-1">{event.activity}</h4>
                        
                        <div className="flex items-start text-xs text-gray-500 mb-2">
                          <MapPin size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        
                        {event.note && (
                          <div className="bg-yellow-50 text-yellow-800 text-xs p-2 rounded border border-yellow-100 flex items-start">
                            <Info size={14} className="mr-1.5 mt-0.5 flex-shrink-0 text-yellow-600" />
                            <span className="leading-relaxed">{event.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer (頁腳) */}
      <div className="p-4 bg-white border-t border-gray-100 text-center text-xs text-gray-400">
        <p>祝旅途愉快！ Have a nice trip.</p>
      </div>
    </div>
  );
};

export default HongKongItinerary;