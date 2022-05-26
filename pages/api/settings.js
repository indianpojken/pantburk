import {
  DaysModel,
  CategoriesModel,
  initDefaults,
  sequelize
} from "./../../models/settings"

export default async function handler(req, res) {
  await sequelize.sync()
  await initDefaults()

  if (req.method === "GET") {
    res.status(200).json(
      {
        days: await DaysModel.findAll(),
        categories: await CategoriesModel.findAll(),
      }
    )
  }
}
