import { CategoriesModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const body = req.body

  const duplicate = await CategoriesModel.findOne(
    { where: { category: body.category } }
  )

  if (duplicate) {
    return res.status(400).json({ status: "error", message: "duplicate" })
  }

  if (req.method === "POST") {
    const position = await CategoriesModel.max("position")

    await CategoriesModel.create({
      position: position + 1,
      category: body.category,
      title: body.title,
      duration: body.duration,
      fontColor: body.fontColor,
      bgColor: body.bgColor,
      borderColor: body.borderColor,
    })

    res.status(200).json({ status: "ok" })
  }
}
