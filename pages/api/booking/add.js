import dayjs from "dayjs"
import { Op } from "sequelize"

import { BookingModel } from "./../../../models/booking.js"
import Booking from "./../../../library/booking.js"

import { isAfterClose, isAfterOpen, } from "./../../../library/timehelpers.js"

export default async function handler(req, res) {
  const body = req.body

  if (req.method === "POST") {
    if (!body.names || !body.category) {
      return res.status(400).json({ status: "error", message: "invalid-form" })
    }

    if (!body.start) {
      body.start = dayjs().format("YYYY-MM-DD HH:mm")
    } else {
      body.start = dayjs().format("YYYY-MM-DD ") + body.start
    }

    const data = await BookingModel.findAll({
      where: {
        start: {
          [Op.startsWith]: dayjs().format("YYYY-MM-DD"),
        },
        category: {
          [Op.eq]: body.category,
        },
      },
      raw: true,
      nest: true,
    })

    const booking = new Booking(body)

    if (!isAfterOpen(booking.time.start)) {
      return res.status(400).json({ status: "error", message: "before-open" })
    }

    if (isAfterClose(booking.time.start)) {
      return res.status(400).json({ status: "error", message: "after-close" })
    }
    
    if (booking.isConflict(data)) {
      return res.status(400).json({ status: "error", message: "conflict" })
    }

    booking.writeToDB()

    res.status(200).json(
      {
        status: "ok",
        data: {
          ...body
        },
      },
    )
  }
}
