import { Shop } from "../../model";
import connectDB from "../../lib/mongoose";

const data = [
  {
    category: "飲料",
    items: [
      "再睡五分鐘",
      "有飲",
      "珍煮丹",
      "春陽茶事",
      "約翰紅茶",
      "五桐號",
      "迷克夏",
      "清新福全",
      "茶湯會",
      "不要對我尖叫",
      "一沐日",
      "得正",
      "小佐お茶作",
      "龜記",
      "八曜和茶",
      "鶴茶樓",
      "布萊恩紅茶",
      "茶明載波",
      "雙江茶行",
      "Arctic White醇白茶",
      "牽拖茶飲",
      "春宅",
      "老賴茶棧",
      "先喝道",
      "橋品氏",
      "大茗",
      "花好月圓",
      "理茶Richa",
      "津鹿堂",
      "烏弄",
      "理想紅茶烏龍專販所",
    ],
  },
];

export default async (req, res) => {
  await connectDB();
  const { method } = req;

  if (method === "POST") {
    try {
      // Inserting the data into the shop collection
      const shopData = {
        region: "台中",
        category: data[0].category,
        items: data[0].items,
      };

      const newShop = new Shop(shopData);
      await newShop.save();

      res.status(201).json({ message: "Shops initialized successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
