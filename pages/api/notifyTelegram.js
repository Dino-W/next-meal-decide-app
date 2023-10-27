const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN);

export default async function handler(req, res) {
  try {
    const { item, endTime, url } = req.body;

    const lines = [
      "開團囉！ 快來加入訂購的行列吧！",
      `開團店家: ${item}`,
      `結單時間: ${endTime}`,
      `開團網址: ${url}`,
    ];

    const message = lines.join("\n");
    await bot.sendMessage(CHAT_ID, message);

    res.status(200).json({ status: "Notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
