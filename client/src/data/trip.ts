/**
 * Journey Replay 2026 — Complete Trip Data
 * Design: Topographic Narrative (dark cartographic theme)
 * 
 * Categories: nature | food | water | history | transport | accommodation
 * Each category maps to a terrain color in the UI.
 */

export interface MapPoint {
  id: string;
  label: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  type?: string;
}

export interface WeatherInfo {
  condition: string;
  temperature: number;
  icon: string;
  description?: string;
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  restaurant?: string;
}

export interface Moment {
  id: string;
  timeLabel: string;
  title: string;
  subtitle?: string;
  pointId: string;
  category: "nature" | "food" | "water" | "history" | "transport" | "accommodation";
  caption: string;
  meal?: Meal;
  highlight?: string;
}

export interface Day {
  id: string;
  date: string;
  headline: string;
  subtitle: string;
  city: string;
  weather: WeatherInfo;
  heroImage: string;
  map: {
    points: MapPoint[];
  };
  moments: Moment[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  days: Day[];
}

const HERO_IMAGES = {
  shaoxing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663448222829/BdvCCD9RKvWsRgU4EhCv5U/shaoxing-hero-W7Ys4sGfscSgjUgxz3nhpZ.webp",
  qiandaohu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663448222829/BdvCCD9RKvWsRgU4EhCv5U/qiandaohu-hero-KNUuhkkEJPvTx4UgNBiq2K.webp",
  hangzhou: "https://d2xsxph8kpxj0f.cloudfront.net/310519663448222829/BdvCCD9RKvWsRgU4EhCv5U/hangzhou-hero-cqfrE8D3U3hUm3oKGF8JB4.webp",
  suzhou: "https://d2xsxph8kpxj0f.cloudfront.net/310519663448222829/BdvCCD9RKvWsRgU4EhCv5U/suzhou-hero-j6wvtsgJfgYP6r6kju26oG.webp",
};

export const tripData: Trip = {
  id: "china-2026",
  title: "Journey Replay",
  destination: "江南 Jiangnan",
  days: [
    // ===== DAY 1: June 6 — Shanghai → Shaoxing =====
    {
      id: "day-1",
      date: "2026-06-06",
      headline: "抵达",
      subtitle: "Shanghai to Shaoxing",
      city: "绍兴 Shaoxing",
      weather: { condition: "Partly Cloudy", temperature: 28, icon: "⛅" },
      heroImage: HERO_IMAGES.shaoxing,
      map: {
        points: [
          { id: "p1-1", label: "浦东机场", x: 0.82, y: 0.25, type: "transport" },
          { id: "p1-2", label: "亚朵酒店", x: 0.35, y: 0.55, type: "accommodation" },
          { id: "p1-3", label: "鲁迅故里", x: 0.38, y: 0.50, type: "history" },
          { id: "p1-4", label: "仓桥直街", x: 0.30, y: 0.60, type: "history" },
          { id: "p1-5", label: "王阿姨面饽饽", x: 0.33, y: 0.52, type: "food" },
        ],
      },
      moments: [
        {
          id: "m1-1",
          timeLabel: "14:00",
          title: "落地上海",
          subtitle: "浦东国际机场",
          pointId: "p1-1",
          category: "transport",
          caption: "Touchdown in Shanghai. The journey begins.",
        },
        {
          id: "m1-2",
          timeLabel: "17:00",
          title: "抵达绍兴",
          subtitle: "鲁迅故里大悦城亚朵酒店",
          pointId: "p1-2",
          category: "accommodation",
          caption: "Check in at the hotel, right next to Lu Xun's former residence.",
        },
        {
          id: "m1-3",
          timeLabel: "18:00",
          title: "鲁迅故里",
          subtitle: "古城漫步",
          pointId: "p1-3",
          category: "history",
          caption: "Evening stroll through the literary heart of Shaoxing.",
          highlight: "鲁迅故里",
        },
        {
          id: "m1-4",
          timeLabel: "19:00",
          title: "仓桥直街",
          subtitle: "历史街区",
          pointId: "p1-4",
          category: "history",
          caption: "Ancient stone bridges and quiet canal-side lanes.",
          highlight: "仓桥直街",
        },
        {
          id: "m1-5",
          timeLabel: "20:00",
          title: "晚餐",
          subtitle: "王阿姨面饽饽",
          pointId: "p1-5",
          category: "food",
          caption: "Local noodles to end the first day.",
          meal: { type: "dinner", name: "面饽饽", restaurant: "王阿姨面饽饽（学士街横关店）" },
        },
      ],
    },
    // ===== DAY 2: June 7 — Shaoxing → Qiandaohu =====
    {
      id: "day-2",
      date: "2026-06-07",
      headline: "文脉绍兴",
      subtitle: "Morning in Shaoxing, Afternoon to Qiandaohu",
      city: "绍兴 → 千岛湖",
      weather: { condition: "Sunny", temperature: 30, icon: "☀️" },
      heroImage: HERO_IMAGES.shaoxing,
      map: {
        points: [
          { id: "p2-1", label: "阳明故里", x: 0.30, y: 0.40, type: "history" },
          { id: "p2-2", label: "书圣故里", x: 0.35, y: 0.45, type: "history" },
          { id: "p2-3", label: "兰亭记", x: 0.36, y: 0.46, type: "food" },
          { id: "p2-4", label: "青藤书屋", x: 0.32, y: 0.50, type: "history" },
          { id: "p2-5", label: "周恩来祖居", x: 0.28, y: 0.55, type: "history" },
          { id: "p2-6", label: "沈氏园", x: 0.37, y: 0.52, type: "history" },
          { id: "p2-7", label: "孔乙己酒家", x: 0.39, y: 0.48, type: "food" },
          { id: "p2-8", label: "绿城蓝湾酒店", x: 0.65, y: 0.75, type: "accommodation" },
        ],
      },
      moments: [
        {
          id: "m2-1",
          timeLabel: "08:30",
          title: "阳明故里",
          subtitle: "王阳明纪念",
          pointId: "p2-1",
          category: "history",
          caption: "Where the great philosopher Wang Yangming once lived.",
          highlight: "阳明故里",
        },
        {
          id: "m2-2",
          timeLabel: "09:30",
          title: "书圣故里",
          subtitle: "王羲之故居",
          pointId: "p2-2",
          category: "history",
          caption: "The neighborhood of the Sage of Calligraphy.",
          highlight: "书圣故里",
        },
        {
          id: "m2-3",
          timeLabel: "11:00",
          title: "午餐",
          subtitle: "兰亭记·绍兴菜",
          pointId: "p2-3",
          category: "food",
          caption: "Traditional Shaoxing cuisine in the calligraphy quarter.",
          meal: { type: "lunch", name: "绍兴菜", restaurant: "兰亭记·绍兴菜（书圣故里店）" },
        },
        {
          id: "m2-4",
          timeLabel: "12:30",
          title: "青藤书屋",
          subtitle: "徐渭故居",
          pointId: "p2-4",
          category: "history",
          caption: "The studio of the eccentric Ming painter Xu Wei.",
          highlight: "青藤书屋",
        },
        {
          id: "m2-5",
          timeLabel: "13:30",
          title: "周恩来祖居",
          pointId: "p2-5",
          category: "history",
          caption: "Ancestral home of Premier Zhou Enlai.",
          highlight: "周恩来祖居",
        },
        {
          id: "m2-6",
          timeLabel: "14:00",
          title: "沈氏园",
          subtitle: "陆游与唐婉",
          pointId: "p2-6",
          category: "history",
          caption: "The garden of a tragic love poem.",
          highlight: "沈氏园",
        },
        {
          id: "m2-7",
          timeLabel: "14:30",
          title: "孔乙己酒家",
          subtitle: "黄酒小酌",
          pointId: "p2-7",
          category: "food",
          caption: "A quick sip of Shaoxing yellow wine before departure.",
          meal: { type: "snack", name: "黄酒 & 茴香豆", restaurant: "孔乙己酒家" },
        },
        {
          id: "m2-8",
          timeLabel: "17:30",
          title: "抵达千岛湖",
          subtitle: "绿城蓝湾度假酒店",
          pointId: "p2-8",
          category: "accommodation",
          caption: "Arriving at the lakeside resort as the sun sets.",
        },
      ],
    },
    // ===== DAY 3: June 8 — Qiandaohu Full Day =====
    {
      id: "day-3",
      date: "2026-06-08",
      headline: "千岛碧水",
      subtitle: "A Full Day on the Lake",
      city: "千岛湖 Qiandaohu",
      weather: { condition: "Sunny", temperature: 31, icon: "☀️" },
      heroImage: HERO_IMAGES.qiandaohu,
      map: {
        points: [
          { id: "p3-1", label: "天屿山观景台", x: 0.25, y: 0.20, type: "nature" },
          { id: "p3-2", label: "千岛湖石林", x: 0.45, y: 0.30, type: "nature" },
          { id: "p3-3", label: "黄山尖", x: 0.65, y: 0.25, type: "nature" },
          { id: "p3-4", label: "梅峰岛", x: 0.55, y: 0.50, type: "nature" },
          { id: "p3-5", label: "桂花岛", x: 0.40, y: 0.60, type: "nature" },
          { id: "p3-6", label: "月光岛", x: 0.50, y: 0.70, type: "water" },
          { id: "p3-7", label: "啤酒小镇", x: 0.30, y: 0.80, type: "food" },
          { id: "p3-8", label: "骑龙巷", x: 0.35, y: 0.85, type: "history" },
        ],
      },
      moments: [
        {
          id: "m3-1",
          timeLabel: "07:30",
          title: "天屿山观景台",
          subtitle: "日出观景",
          pointId: "p3-1",
          category: "nature",
          caption: "Panoramic views of a thousand islands at dawn.",
          highlight: "天屿山观景台",
        },
        {
          id: "m3-2",
          timeLabel: "09:00",
          title: "千岛湖石林",
          subtitle: "喀斯特地貌",
          pointId: "p3-2",
          category: "nature",
          caption: "Towering limestone formations rising from the earth.",
          highlight: "千岛湖石林",
        },
        {
          id: "m3-3",
          timeLabel: "10:30",
          title: "黄山尖",
          subtitle: "最佳俯瞰点",
          pointId: "p3-3",
          category: "nature",
          caption: "The best vantage point — islands scattered like chess pieces.",
          highlight: "黄山尖",
        },
        {
          id: "m3-4",
          timeLabel: "12:00",
          title: "梅峰岛",
          subtitle: "登高望远",
          pointId: "p3-4",
          category: "nature",
          caption: "The highest island, overlooking the entire lake.",
          highlight: "梅峰岛",
          meal: { type: "lunch", name: "湖鲜", restaurant: "岛上餐厅" },
        },
        {
          id: "m3-5",
          timeLabel: "14:00",
          title: "桂花岛",
          subtitle: "桂花飘香",
          pointId: "p3-5",
          category: "nature",
          caption: "An island fragrant with osmanthus trees.",
          highlight: "桂花岛",
        },
        {
          id: "m3-6",
          timeLabel: "15:30",
          title: "月光岛",
          subtitle: "坐船慢行",
          pointId: "p3-6",
          category: "water",
          caption: "A slow boat ride to Moonlight Island.",
          highlight: "月光岛",
        },
        {
          id: "m3-7",
          timeLabel: "17:30",
          title: "啤酒小镇",
          subtitle: "千岛湖啤酒",
          pointId: "p3-7",
          category: "food",
          caption: "Local craft beer brewed with lake water.",
          meal: { type: "snack", name: "千岛湖啤酒", restaurant: "千岛湖啤酒小镇" },
          highlight: "啤酒小镇",
        },
        {
          id: "m3-8",
          timeLabel: "19:00",
          title: "骑龙巷",
          subtitle: "古街夜游",
          pointId: "p3-8",
          category: "history",
          caption: "Evening stroll through the old dragon-riding lane.",
          meal: { type: "dinner", name: "街边小吃", restaurant: "骑龙巷" },
        },
      ],
    },
    // ===== DAY 4: June 9 — Qiandaohu → Hangzhou =====
    {
      id: "day-4",
      date: "2026-06-09",
      headline: "西湖初见",
      subtitle: "Transfer to Hangzhou",
      city: "杭州 Hangzhou",
      weather: { condition: "Overcast", temperature: 27, icon: "☁️" },
      heroImage: HERO_IMAGES.hangzhou,
      map: {
        points: [
          { id: "p4-1", label: "仁和饭店", x: 0.50, y: 0.35, type: "accommodation" },
          { id: "p4-2", label: "花港观鱼", x: 0.35, y: 0.55, type: "nature" },
          { id: "p4-3", label: "太子湾公园", x: 0.30, y: 0.60, type: "nature" },
          { id: "p4-4", label: "龙井村", x: 0.20, y: 0.70, type: "nature" },
          { id: "p4-5", label: "梅家坞", x: 0.15, y: 0.75, type: "nature" },
          { id: "p4-6", label: "灵隐寺", x: 0.18, y: 0.40, type: "history" },
        ],
      },
      moments: [
        {
          id: "m4-1",
          timeLabel: "11:00",
          title: "抵达杭州",
          subtitle: "仁和饭店（西湖店）",
          pointId: "p4-1",
          category: "accommodation",
          caption: "Settling into our lakeside hotel.",
        },
        {
          id: "m4-2",
          timeLabel: "13:00",
          title: "花港观鱼",
          subtitle: "苏堤一瞥",
          pointId: "p4-2",
          category: "nature",
          caption: "Watching koi dance beneath the willows. A glimpse of Su Causeway.",
          highlight: "花港观鱼",
        },
        {
          id: "m4-3",
          timeLabel: "14:30",
          title: "太子湾公园",
          subtitle: "花海漫步",
          pointId: "p4-3",
          category: "nature",
          caption: "A sea of flowers beside the lake.",
          highlight: "太子湾公园",
        },
        {
          id: "m4-4",
          timeLabel: "15:30",
          title: "龙井村",
          subtitle: "茶园",
          pointId: "p4-4",
          category: "nature",
          caption: "Rolling tea terraces in the hills above the lake.",
          highlight: "龙井村",
        },
        {
          id: "m4-5",
          timeLabel: "16:30",
          title: "梅家坞",
          subtitle: "品茶",
          pointId: "p4-5",
          category: "nature",
          caption: "Sipping fresh Longjing tea at its source.",
          highlight: "梅家坞",
        },
        {
          id: "m4-6",
          timeLabel: "17:30",
          title: "灵隐寺",
          subtitle: "飞来峰",
          pointId: "p4-6",
          category: "history",
          caption: "Ancient Buddhist temple hidden in the misty hills.",
          highlight: "灵隐寺",
        },
      ],
    },
    // ===== DAY 5: June 10 — Hangzhou Free Day =====
    {
      id: "day-5",
      date: "2026-06-10",
      headline: "杭城漫游",
      subtitle: "Hangzhou Free Day",
      city: "杭州 Hangzhou",
      weather: { condition: "Light Rain", temperature: 25, icon: "🌧️" },
      heroImage: HERO_IMAGES.hangzhou,
      map: {
        points: [
          { id: "p5-1", label: "五柳巷", x: 0.55, y: 0.40, type: "history" },
          { id: "p5-2", label: "大马弄", x: 0.58, y: 0.42, type: "food" },
          { id: "p5-3", label: "鼓楼", x: 0.52, y: 0.48, type: "history" },
          { id: "p5-4", label: "胡雪岩故居", x: 0.54, y: 0.50, type: "history" },
          { id: "p5-5", label: "南宋御街", x: 0.50, y: 0.45, type: "history" },
          { id: "p5-6", label: "河坊街", x: 0.51, y: 0.46, type: "history" },
          { id: "p5-7", label: "佳藕天成", x: 0.49, y: 0.44, type: "food" },
          { id: "p5-8", label: "李百蟹", x: 0.53, y: 0.47, type: "food" },
        ],
      },
      moments: [
        {
          id: "m5-1",
          timeLabel: "09:00",
          title: "五柳巷",
          subtitle: "历史街区",
          pointId: "p5-1",
          category: "history",
          caption: "Quiet lanes with old Hangzhou character.",
          highlight: "五柳巷",
        },
        {
          id: "m5-2",
          timeLabel: "10:00",
          title: "大马弄",
          subtitle: "市井烟火",
          pointId: "p5-2",
          category: "food",
          caption: "The bustling local market street.",
          meal: { type: "breakfast", name: "市场早点" },
          highlight: "大马弄",
        },
        {
          id: "m5-3",
          timeLabel: "11:00",
          title: "鼓楼",
          subtitle: "古城地标",
          pointId: "p5-3",
          category: "history",
          caption: "The ancient drum tower, a landmark of old Hangzhou.",
          highlight: "鼓楼",
        },
        {
          id: "m5-4",
          timeLabel: "12:00",
          title: "午餐",
          subtitle: "佳藕天成",
          pointId: "p5-7",
          category: "food",
          caption: "Lotus root specialties in a cozy setting.",
          meal: { type: "lunch", name: "藕菜", restaurant: "佳藕天成生活馆(中山中路店)" },
        },
        {
          id: "m5-5",
          timeLabel: "13:30",
          title: "胡雪岩故居",
          subtitle: "红顶商人",
          pointId: "p5-4",
          category: "history",
          caption: "The lavish mansion of Qing dynasty's richest merchant.",
          highlight: "胡雪岩故居",
        },
        {
          id: "m5-6",
          timeLabel: "15:00",
          title: "南宋御街",
          subtitle: "千年古道",
          pointId: "p5-5",
          category: "history",
          caption: "Walking the imperial road of the Southern Song dynasty.",
          highlight: "南宋御街",
        },
        {
          id: "m5-7",
          timeLabel: "16:00",
          title: "河坊街",
          subtitle: "热闹老街",
          pointId: "p5-6",
          category: "history",
          caption: "Lively traditional street with shops and snacks.",
          highlight: "河坊街",
        },
        {
          id: "m5-8",
          timeLabel: "18:30",
          title: "晚餐",
          subtitle: "李百蟹",
          pointId: "p5-8",
          category: "food",
          caption: "Crab feast to end the Hangzhou chapter.",
          meal: { type: "dinner", name: "蟹宴", restaurant: "李百蟹" },
        },
      ],
    },
    // ===== DAY 6: June 11 — Hangzhou → Suzhou =====
    {
      id: "day-6",
      date: "2026-06-11",
      headline: "园林初探",
      subtitle: "Transfer to Suzhou",
      city: "苏州 Suzhou",
      weather: { condition: "Sunny", temperature: 29, icon: "☀️" },
      heroImage: HERO_IMAGES.suzhou,
      map: {
        points: [
          { id: "p6-1", label: "雅戈尔富宫酒店", x: 0.50, y: 0.40, type: "accommodation" },
          { id: "p6-2", label: "拙政园", x: 0.52, y: 0.30, type: "nature" },
          { id: "p6-3", label: "苏州博物馆", x: 0.48, y: 0.32, type: "history" },
          { id: "p6-4", label: "狮子林", x: 0.54, y: 0.33, type: "nature" },
          { id: "p6-5", label: "平江路", x: 0.56, y: 0.38, type: "history" },
          { id: "p6-6", label: "同得兴", x: 0.53, y: 0.42, type: "food" },
        ],
      },
      moments: [
        {
          id: "m6-1",
          timeLabel: "11:00",
          title: "抵达苏州",
          subtitle: "雅戈尔富宫大酒店",
          pointId: "p6-1",
          category: "accommodation",
          caption: "Checking in near Guanqian Street and Pingjiang Road.",
        },
        {
          id: "m6-2",
          timeLabel: "13:00",
          title: "拙政园",
          subtitle: "中国四大名园",
          pointId: "p6-2",
          category: "nature",
          caption: "The Humble Administrator's Garden — China's finest.",
          highlight: "拙政园",
        },
        {
          id: "m6-3",
          timeLabel: "14:30",
          title: "苏州博物馆",
          subtitle: "贝聿铭设计",
          pointId: "p6-3",
          category: "history",
          caption: "I.M. Pei's masterpiece — modern geometry meets classical garden.",
          highlight: "苏州博物馆",
        },
        {
          id: "m6-4",
          timeLabel: "15:30",
          title: "狮子林",
          subtitle: "假山迷宫",
          pointId: "p6-4",
          category: "nature",
          caption: "A labyrinth of rockery — get lost in stone.",
          highlight: "狮子林",
        },
        {
          id: "m6-5",
          timeLabel: "16:30",
          title: "平江路",
          subtitle: "水巷漫步",
          pointId: "p6-5",
          category: "history",
          caption: "Canal-side walking along Suzhou's most poetic lane.",
          highlight: "平江路",
        },
        {
          id: "m6-6",
          timeLabel: "18:00",
          title: "晚餐",
          subtitle: "同得兴",
          pointId: "p6-6",
          category: "food",
          caption: "The legendary Suzhou noodles — Fengzhen pork noodle.",
          meal: { type: "dinner", name: "枫镇大肉面", restaurant: "同得兴" },
        },
      ],
    },
    // ===== DAY 7: June 12 — Suzhou Free Day 1 =====
    {
      id: "day-7",
      date: "2026-06-12",
      headline: "金鸡湖畔",
      subtitle: "Suzhou Modern & Classic",
      city: "苏州 Suzhou",
      weather: { condition: "Partly Cloudy", temperature: 30, icon: "⛅" },
      heroImage: HERO_IMAGES.suzhou,
      map: {
        points: [
          { id: "p7-1", label: "东方之门", x: 0.75, y: 0.35, type: "history" },
          { id: "p7-2", label: "金鸡湖", x: 0.72, y: 0.45, type: "water" },
          { id: "p7-3", label: "李公堤", x: 0.70, y: 0.55, type: "history" },
          { id: "p7-4", label: "盘门景区", x: 0.35, y: 0.70, type: "history" },
          { id: "p7-5", label: "哑巴生煎", x: 0.50, y: 0.42, type: "food" },
          { id: "p7-6", label: "姑苏家宴", x: 0.48, y: 0.65, type: "food" },
        ],
      },
      moments: [
        {
          id: "m7-1",
          timeLabel: "08:30",
          title: "哑巴生煎",
          subtitle: "苏州早点",
          pointId: "p7-5",
          category: "food",
          caption: "Crispy-bottomed pan-fried buns — a Suzhou morning ritual.",
          meal: { type: "breakfast", name: "生煎包", restaurant: "哑巴生煎" },
          highlight: "哑巴生煎",
        },
        {
          id: "m7-2",
          timeLabel: "10:00",
          title: "东方之门",
          subtitle: "现代苏州",
          pointId: "p7-1",
          category: "history",
          caption: "The Gate of the Orient — Suzhou's modern skyline.",
          highlight: "东方之门",
        },
        {
          id: "m7-3",
          timeLabel: "11:00",
          title: "金鸡湖",
          subtitle: "湖畔漫步",
          pointId: "p7-2",
          category: "water",
          caption: "A vast urban lake reflecting the new city.",
          highlight: "金鸡湖",
        },
        {
          id: "m7-4",
          timeLabel: "12:30",
          title: "李公堤",
          subtitle: "湖中长堤",
          pointId: "p7-3",
          category: "history",
          caption: "A causeway stretching into the lake, lined with restaurants.",
          highlight: "李公堤",
          meal: { type: "lunch", name: "湖畔餐厅" },
        },
        {
          id: "m7-5",
          timeLabel: "15:00",
          title: "盘门景区",
          subtitle: "水陆城门",
          pointId: "p7-4",
          category: "history",
          caption: "The only surviving water-and-land city gate in China.",
          highlight: "盘门景区",
        },
        {
          id: "m7-6",
          timeLabel: "18:00",
          title: "晚餐",
          subtitle: "姑苏家宴",
          pointId: "p7-6",
          category: "food",
          caption: "A home-style Suzhou feast.",
          meal: { type: "dinner", name: "苏帮菜", restaurant: "姑苏家宴" },
        },
      ],
    },
    // ===== DAY 8: June 13 — Suzhou Free Day 2 =====
    {
      id: "day-8",
      date: "2026-06-13",
      headline: "山塘烟雨",
      subtitle: "Suzhou's Canal Heritage",
      city: "苏州 Suzhou",
      weather: { condition: "Light Rain", temperature: 26, icon: "🌧️" },
      heroImage: HERO_IMAGES.suzhou,
      map: {
        points: [
          { id: "p8-1", label: "七里山塘", x: 0.35, y: 0.30, type: "history" },
          { id: "p8-2", label: "阊门遗址", x: 0.38, y: 0.35, type: "history" },
          { id: "p8-3", label: "太平天国忠王府", x: 0.52, y: 0.30, type: "history" },
          { id: "p8-4", label: "苏州园林博物馆", x: 0.50, y: 0.28, type: "history" },
          { id: "p8-5", label: "付小锅", x: 0.36, y: 0.32, type: "food" },
          { id: "p8-6", label: "同得兴", x: 0.53, y: 0.42, type: "food" },
        ],
      },
      moments: [
        {
          id: "m8-1",
          timeLabel: "09:00",
          title: "七里山塘",
          subtitle: "千年古街",
          pointId: "p8-1",
          category: "history",
          caption: "Seven li of canal-side heritage — rain adds to the poetry.",
          highlight: "七里山塘",
        },
        {
          id: "m8-2",
          timeLabel: "10:30",
          title: "阊门遗址",
          subtitle: "古城门",
          pointId: "p8-2",
          category: "history",
          caption: "Remnants of the ancient city gate.",
          highlight: "阊门遗址",
        },
        {
          id: "m8-3",
          timeLabel: "11:30",
          title: "午餐",
          subtitle: "同得兴 三虾面",
          pointId: "p8-6",
          category: "food",
          caption: "The seasonal three-shrimp noodle — only available in summer.",
          meal: { type: "lunch", name: "三虾面 & 爆鱼面", restaurant: "同得兴" },
        },
        {
          id: "m8-4",
          timeLabel: "13:30",
          title: "太平天国忠王府",
          subtitle: "历史遗迹",
          pointId: "p8-3",
          category: "history",
          caption: "The Taiping Heavenly Kingdom's prince residence.",
          highlight: "太平天国忠王府",
        },
        {
          id: "m8-5",
          timeLabel: "15:00",
          title: "苏州园林博物馆",
          subtitle: "园林文化",
          pointId: "p8-4",
          category: "history",
          caption: "Understanding the philosophy behind Suzhou's gardens.",
          highlight: "苏州园林博物馆",
        },
        {
          id: "m8-6",
          timeLabel: "18:30",
          title: "晚餐",
          subtitle: "付小锅·铜炉火锅",
          pointId: "p8-5",
          category: "food",
          caption: "Suzhou-style charcoal copper pot hotpot on a rainy evening.",
          meal: { type: "dinner", name: "苏式炭烤铜炉火锅", restaurant: "付小锅·苏式炭烤铜炉火锅" },
        },
      ],
    },
    // ===== DAY 9: June 14 — Suzhou → Shanghai Airport =====
    {
      id: "day-9",
      date: "2026-06-14",
      headline: "归途",
      subtitle: "Departure from Shanghai",
      city: "苏州 → 上海",
      weather: { condition: "Sunny", temperature: 29, icon: "☀️" },
      heroImage: HERO_IMAGES.hangzhou,
      map: {
        points: [
          { id: "p9-1", label: "苏州", x: 0.30, y: 0.50, type: "history" },
          { id: "p9-2", label: "浦东机场", x: 0.80, y: 0.30, type: "transport" },
        ],
      },
      moments: [
        {
          id: "m9-1",
          timeLabel: "09:00",
          title: "告别苏州",
          subtitle: "最后的早餐",
          pointId: "p9-1",
          category: "food",
          caption: "One last bowl of Suzhou noodles before we go.",
          meal: { type: "breakfast", name: "苏式面", restaurant: "同得兴" },
        },
        {
          id: "m9-2",
          timeLabel: "13:00",
          title: "浦东机场",
          subtitle: "旅途结束",
          pointId: "p9-2",
          category: "transport",
          caption: "Until next time, Jiangnan.",
        },
      ],
    },
  ],
};
