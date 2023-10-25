import mongoose from "mongoose";

export interface Shops extends mongoose.Document {
  region: string;
  category: string;
  items: string;
  menu_url: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const ShopSchema = new mongoose.Schema<Shops>({
  region: {
    type: String,
    required: [true, "請輸入地區，EX:台北信義區/台中西區."],
    maxlength: [60, "地區名稱過長"],
  },
  category: {
    type: String,
    required: [true, "請輸入分類，EX:飲料/午餐"],
    maxlength: [60, "分類名稱過長"],
  },
  items: {
    required: [true, "項目內容，必填"],
    type: String,
    maxlength: [60, "項目名稱過長"],
  },
  menu_url: {
    type: String,
  },
});

export default mongoose.models.Shop ||
  mongoose.model<Shops>("Shop", ShopSchema);
