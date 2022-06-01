import { DaysModel } from "./../../../models/settings"

export default async function handler(req, res) {
  const body = req.body

  if (req.method === "POST") {
    body.forEach(async (time, i) => {
      await DaysModel.update(
        {
          open: time[0],
          close: time[1],
        },
        {
          where: { id: i + 1}
        })
    })

    res.status(200).json({ message: "ok" })
  }
}
