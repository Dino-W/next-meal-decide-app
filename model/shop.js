const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    region: {
      type: String,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    items: [
      {
        type: String,
        trim: true,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Using this line ensures that the model is compiled only if it doesn't exist yet
const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);

module.exports = Shop;
