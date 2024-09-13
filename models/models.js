const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose").Types;

const mongoosePaginator = require("mongoose-paginate-v2");
const mongoosePaginatorAgregate = require("mongoose-aggregate-paginate-v2");

const { Decimal } = require("decimal.js");

const Models = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    average_price: {
      type: Number,
    },
    brand_id: {
      type: ObjectId,
      ref: "brands",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Update the brand average_price on save a model if the average_price is defined
 */
Models.pre("save", async function () {
  if (this.average_price != undefined) {
    let brand = await this.model("brands").findOne({ _id: this.brand_id });

    let average_price = await this.model("models").sumAveragesPrices(brand._id);
    await brand.setAveragePrice(average_price);
  }
  if(!this.id){
    let last_model = await this.model("models").findOne({}).sort({ id: -1 });
    let next_id = last_model? last_model.id +1 : 1;
    this.id = next_id;
  }
});
/**
 *
 * @param {ObjectId} id
 * @returns {Number} sum_averages
 */
Models.statics.sumAveragesPrices = async function (brand_id) {
  let [models_brand] = await this.model("models").aggregate([
    {
      $match: {
        brand_id: new ObjectId(brand_id),
      },
    },
    {
      $group: {
        _id: "$brand_id",
        sum_averages: {
          $sum: "$average_price",
        },
      },
    },
  ]);

  return models_brand?.sum_averages || 0;
};
/**
 *
 * @param {Number} price
 * @returns {*} set the average_price of the model
 */
Models.methods.setAveragePrice = async function (price) {
  if (!price) throw "The average price is not defined";

  if (Decimal(price).lessThan(process.env.MINIMAL_AVERAGE_PRICE))
    throw (
      "The average price must be greated that " +
      process.env.MINIMAL_AVERAGE_PRICE
    );

  this.average_price = price;
  return this;
};
Models.plugin(mongoosePaginator);
Models.plugin(mongoosePaginatorAgregate);

let ModelsModel = mongoose.model("models", Models);

ModelsModel.aggregatePaginate.options = {
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
module.exports = ModelsModel;
