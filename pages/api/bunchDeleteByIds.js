import { Shop } from "../../model";
import connectDB from "../../lib/mongoose";

export default async (req, res) => {
    await connectDB();
  const { method } = req;

  if (method === "DELETE") {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "ids must be an array" });
    }

    const deleteShop = await Shop.deleteMany({ _id: { $in: ids } });

    if (deleteShop.deletedCount === 0) {
      return res.status(404).json({ message: "No matching shop found" });
    }

    res.status(200).json({ message: "Shops deleted successfully" });
  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
