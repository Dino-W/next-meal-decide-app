import connectDB from "../../lib/mongoose";
import { Shop } from "../../model";

export default async (req, res) => {
  await connectDB();
  const { method } = req;

  switch (method) {
    case "GET":
      const shops = await Shop.find();
      res.status(200).json(shops);
      break;

    case "POST":
      const { items } = req.body;

      if (!items) {
        message += "沒有新增任何項目請重新檢查\n";
      }
      if (message) {
        res.status(400).send({ message });

        const shopData = {
          items: items,
        };

        const newShop = new Shop(shopData);
        await newShop.save();
        res.status(201).json(newShop);
        break;
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
