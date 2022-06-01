import { Op } from "sequelize"
import { CategoriesModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === "DELETE") {
    const category = await CategoriesModel.findOne({ where: { id: id } })

    await CategoriesModel.increment(
      { position: -1 },
      {
        where: {
          position: {
            [Op.gt]: category.position,
          },
        },
      })

    res.status(200).json(
      await CategoriesModel.destroy({ where: { id: id } })
    )
  }
}
