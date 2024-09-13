const mongoose = require("mongoose");
const Brands = require("../../models/brands");
const Models = require("../../models/models");

const Decimal = require('decimal.js');
const { ObjectId } = mongoose.Types;
/**
 * @class BrandsController
 * @description Contains all the endpoints for model brand 
 */
class BrandsController {
  /**
   * @description
   * */
  static add = async ({ body }, response) => {
    let exist_name = await Brands.findOne({
      name: { $regex: new RegExp(body.name, "i") },
    });

    if (exist_name)
      return response.status(400).json(`The name ${body.name} already exists`);

    let brand = new Brands(body);

    brand.save()
      .then((brand) => response.status(200).json(brand))
      .catch((error) => response.status(400).json(error));
  };

  /**
   * @description add a new model to the brand sended by params
   * */
  static addModels = async ({ body, params }, response) => {

    let exist_name = await Models.findOne({
      name: { $regex: new RegExp(body.name, "i") },
      brand_id: new ObjectId(params.id),
    });
    if (exist_name)
      return response.status(400).json(
          `The name ${body.name} already exist in the brand as ${exist_name.name}`
        );

    let brand = await Brands.findOne({ _id: new ObjectId(params.id) });
    if (!brand) return response.status(400).json(`The brand doesn't exist `);

    if (
      body.average_price != undefined &&
      Decimal(body.average_price).lessThan(Decimal(process.env.MINIMAL_AVERAGE_PRICE))  
    )
      return response.status(400).json(`The average price must be greater than ${process.env.MINIMAL_AVERAGE_PRICE}` );

    let model = await Models.create({
      ...body,
      brand_id: params.id,
    });

    model
      .save()
      .then((model) => response.status(200).json(model))
      .catch((error) => response.status(400).json(error));
  };

  /**
   * @description get all the models of the brand
   * */
  static getModels = async ({ query, params }, response) => {
    let id = query.id || params.id;
    let brand = await Brands.findOne({ _id: id });

    if (brand == null)
      return response.status(400).json("The brand don't exist");

    let pipeline = [
      {
        $match: {
          brand_id: new ObjectId(id),
        },
      },
    ];

    let data = await Models.aggregate(pipeline);
    return response.status(200).json(data);
  };

  /**
   * @description get all the brands
   * */
  static list = async ({ query }, response) => {
    let data = await Brands.find({})
    return response.status(200).json(data);
  };
}
module.exports = BrandsController;
