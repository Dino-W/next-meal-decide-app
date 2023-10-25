import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Shop from "../../../models/Shop";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const shop = await Shop.findById(id);
        if (!shop) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shop });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const shop = await Shop.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!shop) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shop });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedShop = await Shop.deleteMany({ _id: id });
        if (!deletedShop) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
