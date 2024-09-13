const Models = require("../../models/models");
const Brands = require("../../models/brands");

const MODELS_JSON = require("../json/models.json");

async function seeder() {
  try {
    for (let i = 0; i < MODELS_JSON.length; i++) {
      let brand_name = MODELS_JSON[i].brand_name;
      let model_name = MODELS_JSON[i].name;
      let id = MODELS_JSON[i].id;


      let brand = await Brands.findOne({ name: brand_name });

      if (!brand) {
        brand = await Brands.create({
          name: brand_name,
        });
      }

      let model = await Models.findOne({ name: model_name });

      if (!model)
        model = await Models.create({
          ...MODELS_JSON[i],
          brand_id: brand._id,
          id:id
        });

      await brand.save();
      await model.save();
    }

    let brands = await Brands.find({});

    for (let index = 0; index < brands.length; index++) {
      const element = brands[index];
      let brand = await Brands.findOne({ _id: element._id });

      let sum_average_prices = await Models.sumAveragesPrices(element._id);
      console.log("sum_average_prices ", brand.name, "=", sum_average_prices);
      await brand.setAveragePrice(sum_average_prices);
    }
  } catch (e) {
    console.log("Error:", e);
  }
  console.log("Successfully executed!");
}

module.exports = {
  title: " Brands - Models ",
  description: "Add Brands and Models to database",
  seeder,
};
