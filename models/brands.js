const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginator = require("mongoose-paginate-v2");
const mongoosePaginatorAgregate = require("mongoose-aggregate-paginate-v2");

const Brands = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    average_price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
/**
 *
 * @description  set the id aaverage_price of the brand and save it
 */
Brands.pre("save", async function () {
  if (!this.id) {
    let last_brand = await this.model("brands").findOne({}).sort({ id: -1 });
    let next_id = last_brand? last_brand.id +1 : 1;
    this.id = next_id;
  }
});

/**
 *
 * @param {Number} price
 * @returns {*} set the average_price of the brand and save it
 */
Brands.methods.setAveragePrice = async function (price) {
  this.average_price = price;
  this.save();
};



Brands.plugin(mongoosePaginator);
Brands.plugin(mongoosePaginatorAgregate);

let BrandsModels = mongoose.model("brands", Brands);

BrandsModels.aggregatePaginate.options = {
  customLabels: {
    totalDocs: "total",
    docs: "data",
    limit: "limit",
    page: "page",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pages",
  },
  collation: { locale: "es" },
};
module.exports = BrandsModels;
