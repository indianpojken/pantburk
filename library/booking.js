import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { BookingModel } from "./../models/booking"
import TimeHelpers from "./timehelpers"

dayjs.extend(isBetween)

export default class Booking {
  // booking -> { names, category, start, duration, end }
  constructor(booking, settings) {
    this.settings = settings
    this.timehelper = new TimeHelpers(this.settings)

    this.names = booking.names
    this.category = booking.category

    this.time = {
      start: booking.start,
      end: booking.end,
    }

    this.duration = booking.duration

    if (!this.timehelper.isAfterOpen(this.time.start)) {
      this.time.start = timeOpen()
    }

    if (booking.end === undefined) {
      this.time.end = this.#endTime()
    }
  }

  // bookings -> [{ names, category, start, end }]
  isConflict(bookings) {
    // if there's no other entries, there's no conflict
    if (bookings.length === 0) {
      return false
    }

    // if a is between b and c
    const between = (a, b, c) => {
      return dayjs(a).isBetween(b, c, "minute", "()")
    }

    for (let i = 0; i < bookings.length; i++) {
      if (between(this.time.start, bookings[i].start, bookings[i].end)
        || between(this.time.end, bookings[i].start, bookings[i].end)
        || this.time.start === bookings[i].start) {
        // conflict found
        return true
      }
    }

    // no conflict found
    return false
  }

  writeToDB() {
    BookingModel.create({
      names: this.names,
      category: this.category,
      start: this.time.start,
      end: this.time.end,
    })
  }

  #endTime() {
    const time = dayjs(this.time.start)
      .add(this.duration, "m")
      .format(this.timehelper.timeFormat)

    if (this.timehelper.isAfterClose(time)) {
      return this.timehelper.timeClose()
    } else {
      return time
    }
  }
}
