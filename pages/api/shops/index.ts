import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Shop from "../../../models/Shop";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { region, category } = req.query;

        let filter: any = {};

        if (region) {
          filter.region = region;
        }

        if (category) {
          filter.category = category;
        }

        const shops = await Shop.find(filter); // find data based on the filter
        res.status(200).json({ success: true, data: shops });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const shop = await Shop.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: shop });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res
            .status(400)
            .json({ success: false, error: "An unknown error occurred" });
        }
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({ message: "ids is not Array." });
        }

        const deletedShop = await Shop.deleteMany({ _id: { $in: ids } });
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
