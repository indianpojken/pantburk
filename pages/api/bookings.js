import dayjs from "dayjs"
import { Op } from "sequelize"

import { BookingModel, sequelize } from "./../../models/booking"

export default async function handler(req, res) {
  await sequelize.sync()

  if (req.method === "GET") {
    res.status(200).json(
      await BookingModel.findAll({
        where: {
          start: {
            [Op.startsWith]: dayjs().format("YYYY-MM-DD"),
          },
        },
      }))
  }
}
