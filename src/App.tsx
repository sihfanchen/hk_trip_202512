import React, { useState } from 'react';
import { Plane, Hotel, MapPin, Clock, Info, Train, Utensils, Camera } from 'lucide-react';

// 1. 定義資料型別 (TypeScript Interface)
// 這些介面告訴 TypeScript 我們的資料長什麼樣子，解決 'any' type 錯誤
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
  note?: string; // ? 表示這個欄位是可選的
}

interface DayItinerary {
  day: number;
  date: string;
  title: string;
  events: TripEvent[];
}

const HongKongItinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(0);

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
      events: [
        { time: "08:00", location: "台中/桃園機場", activity: "搭乘高鐵至桃園機場", type: "transport", note: "提前 3 小時抵達機場，時間充裕。" },
        { time: "14:15", location: "香港機場 (HKG)", activity: "抵達、入境、領行李", type: "arrival", note: "準備：在機場快線櫃檯購買或確認八達通卡。" },
        { time: "15:30", location: "機場 → 旺角", activity: "搭乘城巴 A21 (約 HKD 34.6)", type: "transport", note: "車程約 60-75 分鐘。下車點：「旺角中心」或「銀行中心」。" },
        { time: "16:30", location: "旺角", activity: "安達賓館 Check-in", type: "hotel", note: "新興大廈週末電梯等待時間可能較長，請保持耐心。" },
        { time: "17:30", location: "尖沙咀", activity: "晚餐 & 準備看秀", type: "food", note: "地鐵至尖沙咀站。晚餐：海港城附近或蘭芳園（重慶大廈）。" },
        { time: "19:40", location: "尖沙咀海旁", activity: "星光大道卡位", type: "sight", note: "尋找面向香港島的最佳位置。" },
        { time: "20:00", location: "維多利亞港", activity: "幻彩詠香江 (A Symphony of Lights)", type: "sight", note: "燈光秀約 15 分鐘。" },
        { time: "21:00", location: "佐敦", activity: "宵夜與甜品", type: "food", note: "佳佳甜品、澳洲牛奶公司。沿彌敦道步行或地鐵一站。" },
        { time: "22:00", location: "油麻地", activity: "舊油麻地警署", type: "sight", note: "港片經典場景打卡。走路約 10 分鐘回旺角飯店。" }
      ]
    },
    {
      day: 2,
      date: "12/14 (日)",
      title: "深水埗與旺角購物",
      events: [
        { time: "09:00", location: "深水埗", activity: "最道地的早餐", type: "food", note: "合益泰豬腸粉、公和荳品廠。注意：通常只收現金。" },
        { time: "10:30", location: "深水埗", activity: "鴨寮街尋寶 & 玩具街", type: "shopping", note: "電子零件、舊物、福榮街買公仔。" },
        { time: "13:00", location: "深水埗", activity: "地道午餐", type: "food", note: "維記咖啡粉麵（豬潤麵）、劉森記麵家。" },
        { time: "14:30", location: "太子", activity: "花、鳥、魚主題街", type: "sight", note: "花墟、金魚街、雀鳥花園。步行約 15 分鐘。" },
        { time: "16:30", location: "太子/旺角", activity: "金華冰廳下午茶", type: "food", note: "號稱全港第一的菠蘿油配熱奶茶。" },
        { time: "18:00", location: "旺角", activity: "購物衝刺 (主場優勢)", type: "shopping", note: "波鞋街、朗豪坊、女人街。" },
        { time: "20:30", location: "旺角", activity: "晚餐/宵夜", type: "food", note: "富記粥品 (燒鵝粥) 或 點點心。" }
      ]
    },
    {
      day: 3,
      date: "12/15 (一)",
      title: "港島東慢遊與燒臘朝聖",
      events: [
        { time: "08:30", location: "太古", activity: "怪獸大廈 (益昌大廈)", type: "sight", note: "太古站 B 出口。拍照請保持安靜。" },
        { time: "09:30", location: "港島東", activity: "叮叮車體驗", type: "transport", note: "英皇道上車，往「西行」方向，坐上層第一排至北角。" },
        { time: "10:30", location: "北角", activity: "春秧街市場奇景", type: "sight", note: "電車穿行菜市場。可留意德成號蛋捲。" },
        { time: "12:00", location: "銅鑼灣", activity: "午餐與購物", type: "food", note: "何洪記粥麵、榮記粉麵。逛 SOGO、時代廣場。" },
        { time: "14:30", location: "灣仔", activity: "老區歷史與文創", type: "sight", note: "藍屋、太原街玩具街、利東街。" },
        { time: "17:00", location: "灣仔", activity: "燒臘大餐 (平日制霸)", type: "food", note: "甘牌燒鵝 或 再興燒臘。避開尖峰時段。" },
        { time: "19:00", location: "灣仔 → 尖沙咀", activity: "天星小輪", type: "transport", note: "灣仔碼頭搭乘，欣賞維港夜景。" }
      ]
    },
    {
      day: 4,
      date: "12/16 (二)",
      title: "中上環美食與太平山壓軸",
      events: [
        { time: "08:00", location: "佐敦", activity: "澳洲牛奶公司早餐", type: "food", note: "體驗光速餐點服務與炒蛋多士。建議早到。" },
        { time: "09:30", location: "堅尼地城", activity: "海邊散步 & 港大", type: "sight", note: "% Arabica 咖啡、香港大學。" },
        { time: "12:00", location: "中上環", activity: "傳奇老店午餐", type: "food", note: "九記牛腩、勝香園或沾仔記。建議 12:00 前抵達。" },
        { time: "14:00", location: "中環", activity: "大館 & 半山手扶梯", type: "sight", note: "參觀前警署古蹟，走過石板街。" },
        { time: "16:30", location: "中環", activity: "前往太平山纜車站", type: "transport", note: "步行或 15C 巴士。必備：纜車+凌霄閣套票。" },
        { time: "17:30", location: "太平山頂", activity: "百萬夜景 (日落→夜景)", type: "sight", note: "凌霄閣摩天台最佳觀景點。" },
        { time: "19:30", location: "中環/旺角", activity: "下山 & 晚餐", type: "transport", note: "若纜車人多可搭 15 號巴士或 1 號小巴。" }
      ]
    },
    {
      day: 5,
      date: "12/17 (三)",
      title: "優雅離港",
      events: [
        { time: "09:00", location: "旺角", activity: "最後衝刺 & Check-out", type: "shopping", note: "超市買伴手禮。退房。" },
        { time: "09:30", location: "香港站", activity: "市區預辦登機 (重要)", type: "transport", note: "刷機場快線票進站→託運行李→領登機證。" },
        { time: "10:00", location: "中環/灣仔", activity: "兩手空空最後漫遊", type: "sight", note: "中環海濱、金紫荊廣場。早午餐。" },
        { time: "13:30", location: "香港站", activity: "搭乘機場快線", type: "transport", note: "最晚搭車時間 (車程 24 分鐘)。" },
        { time: "14:00", location: "香港機場", activity: "安檢 & 免稅店", type: "shopping", note: "逛迪士尼商店、最後採買。" },
        { time: "15:45", location: "香港機場", activity: "CX472 航班起飛", type: "arrival", note: "平安回家。" }
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
      {/* Header */}
      <div className="bg-red-700 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
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

      {/* Tabs */}
      <div className="flex overflow-x-auto p-4 gap-2 no-scrollbar bg-gray-50 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-90">
        {itinerary.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeDay === index
                ? 'bg-red-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Day {item.day}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            {itinerary[activeDay].date}
          </h2>
          <p className="text-red-600 font-medium text-sm">{itinerary[activeDay].title}</p>
        </div>

        <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
          {itinerary[activeDay].events.map((event, idx) => (
            <div key={idx} className="relative pl-6">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 bg-white border-2 border-gray-300 rounded-full p-1">
                {getIcon(event.type)}
              </div>

              {/* Event Card */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600">
                    {event.time}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center">
                    <MapPin size={10} className="mr-1" />
                    {event.location}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-800 text-lg mb-2">{event.activity}</h3>
                
                {event.note && (
                  <div className="bg-yellow-50 text-yellow-800 text-sm p-3 rounded-lg flex items-start mt-2 border border-yellow-100">
                    <Info size={16} className="mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span className="leading-relaxed">{event.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer / Quick Actions */}
      <div className="p-4 bg-white border-t border-gray-100 text-center text-xs text-gray-400">
        <p>祝旅途愉快！ Have a nice trip.</p>
      </div>
    </div>
  );
};

export default HongKongItinerary;