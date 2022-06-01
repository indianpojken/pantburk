import { CategoriesModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const body = req.body

  if (req.method === "POST") {
    const position = await CategoriesModel.max("position")

    await CategoriesModel.create({
      position: position + 1,
      category: body.category,
      title: body.title,
      duration: body.duration,
      bgColor: body.bgColor,
      borderColor: body.borderColor,
    })

    res.status(200).json({ status: "ok" })
  }
}
