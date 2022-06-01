import { CategoriesModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const body = req.body

  if (req.method === "POST") {
    const positions = [
      (await CategoriesModel.findOne({ where: { id: body.id } })).position,
    ]

    if (body.direction === "up") {
      if (positions[0] != 1) {
        positions.push((await CategoriesModel.findOne({ where: { position: positions[0] - 1 } })).position)
      } else {
        positions.push(positions[0])
      }
    } else if (body.direction === "down") {
      if (positions[0] < await CategoriesModel.max("position")) {
        positions.push((await CategoriesModel.findOne({ where: { position: positions[0] + 1 } })).position)
      } else {
        positions.push(positions[0])
      }
    }

    await CategoriesModel.update({ position: positions[0] }, { where: { position: positions[1] } })
    await CategoriesModel.update({ position: positions[1] }, { where: { id: body.id } })

    res.status(200).json({ status: "ok" })
  }
}
