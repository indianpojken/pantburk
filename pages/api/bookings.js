import dayjs from "dayjs"
import { Op } from "sequelize"

import { BookingModel } from "./../../models/booking.js"

export default async function handler(req, res) {
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
