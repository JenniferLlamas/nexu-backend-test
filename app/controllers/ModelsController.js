const mongoose = require("mongoose");
const Models = require("../../models/models");
const Brands = require("../../models/brands");

const { Decimal } = require("decimal.js");
const { ObjectId } = mongoose.Types;

/**
 * @class ModelsController
 * @description
 */
class ModelsController {
  /**
   * @static
   * @memberof ModelsController
   *
   * @function update
   * @description
   * */
  static update = async ({ body, params }, response) => {
    Models.findOne({ _id: new ObjectId(params.id) })
      .then(async (model) => {
        if (body.average_price !== undefined) {
          try {
            await model.setAveragePrice(body.average_price);
          } catch (e) {
            return response.status(400).json(e);
          }
        }

        model
          .save()
          .then(async (model) => {
            try {
              let average_price_sum = await Models.sumAveragesPrices(
                model.brand_id
              );

              let brand = await Brands.findOne({
                _id: new ObjectId(model.brand_id),
              });
              brand.setAveragePrice(average_price_sum);
            } catch (e) {
              return response.status(400).json(e);
            }
            response.status(200).json(model);
          })
          .catch((error) => response.status(400).json(error));
      })
      .catch((error) => response.status(404).json(error));
  };

  /**
   * @static
   * @memberof ModelsController
   *
   * @function get
   * @description
   * */
  static get = async ({ query, params }, response) => {
    let model = await Models.findOne({
      _id: new ObjectId(params.model_id),
    });
    if (model == null)
      return response.status(400).json(
        "The model don't exist",
      );

    return response.status(200).json(model);
  };

  /**
   * @static
   * @memberof ModelsController
   *
   * @function list
   * @description
   * */
  static list = async ({ query }, response) => {
    let pipeline = [
      {
        $sort: { average_price: -1 },
      },
    ];
    if (query.search) {
      let buscar = query.search == undefined ? ".*" : query.search + ".*";
      pipeline.push({
        $match: {
          $and: [
            {
              $or: [{ nombre: new RegExp(buscar, "i") }],
            },
          ],
        },
      });
    }

    if (query.greater) {
      pipeline.push({
        $match: {
          average_price: { $gt: Decimal(query.greater).toNumber() },
        },
      });
    }
    if (query.lower) {
      pipeline.push({
        $match: {
          average_price: { $lt: Decimal(query.lower).toNumber() },
        },
      });
    }

    let data = await Models.aggregate(pipeline);
    return response.status(200).json(data);
  };
}
module.exports = ModelsController;
