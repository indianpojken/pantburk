import dayjs from "dayjs"

import isBetween from "dayjs/plugin/isBetween.js"

import { BookingModel } from "./../models/booking.js"

import {
  timeOpen,
  timeClose,
  timeFormat,
  isAfterOpen,
  isAfterClose,
} from "./timehelpers.js"

import * as settings from "./../settings.js"

dayjs.extend(isBetween)

export default class Booking {
  // booking -> { names, category, start, end }
  constructor(booking) {
    this.names = booking.names
    this.category = booking.category

    this.time = {
      start: booking.start,
      end: booking.end,
    }

    if (!isAfterOpen(this.time.start)) {
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

  #duration() {
    return settings.categories[this.category].duration
  }

  #endTime() {
    const time = dayjs(this.time.start)
      .add(this.#duration(), "m")
      .format(timeFormat)

    if (isAfterClose(time)) {
      return timeClose()
    } else {
      return time
    }
  }
}
