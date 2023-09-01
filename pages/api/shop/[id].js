import { Shop } from "../../../model";
import connectDB from "../../../lib/mongoose";

export default async (req, res) => {
  await connectDB();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const shop = await Shop.findById(id);
      if (!shop) return res.status(404).json({ error: "Shop not found" });
      else {
        res.status(200).json(shop);
      }
      break;
    case "PATCH":
      const { region, category, items } = req.body;
      const editorShop = await Shop.findById({ _id: id });
      await editorShop.save();
      res.status(201).json(editorShop);
      break;
  }
};
