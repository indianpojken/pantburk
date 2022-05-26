import { BookingModel, sequelize } from "./../../../models/booking"

export default async function handler(req, res) {
  const { id } = req.query
  
  await sequelize.sync()

  if (req.method === "GET") {
    res.status(200).json(
      await BookingModel.findOne({ where: { id: id } })
    )
  } else if (req.method === "DELETE") {
    res.status(200).json(
      await BookingModel.destroy({ where: { id: id } })
    )
  }
}
