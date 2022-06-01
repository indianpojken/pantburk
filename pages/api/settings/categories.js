import { CategoriesModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const body = req.body

  if (req.method === "POST") {
    body.forEach(async (category) => {
      await CategoriesModel.update(
        {
          title: category.title,
          duration: category.duration,
          bgColor: category.bgColor,
          borderColor: category.borderColor,
        },
        {
          where: { position: category.position}
        })
    })

    res.status(200).json({ message: "ok" })
  }
}
