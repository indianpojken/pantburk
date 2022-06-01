import { DaysModel, CategoriesModel } from "./../../models/settings"

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(
      {
        days: await DaysModel.findAll(),
        categories: await CategoriesModel.findAll({ order: ["position"] })
      }
    )
  }
}
