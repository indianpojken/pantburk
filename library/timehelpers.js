import dayjs from "dayjs"

import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

import { getDay } from "./settingshelpers"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default class TimeHelpers {
  #settings

  constructor(settings) {
    this.#settings = settings

    this.timeFormat = "YYYY-MM-DD HH:mm"
    this.dateFormat = "YYYY-MM-DD "
  }

  isOpenToday() {
    const today = getDay(this.#settings, dayjs().format("dddd"))

    if (today.open === "" || today.close === "") {
      return false
    } else {
      return true
    }
  }

  minutesBetween(start, end) {
    return dayjs(end).diff(start, "m")
  }

  minutesOpen() {
    return this.minutesBetween(this.timeOpen(), this.timeClose())
  }

  timeOpen() {
    const open = getDay(this.#settings, dayjs().format("dddd")).open
    return dayjs().format(this.dateFormat + open)
  }

  timeClose() {
    const hours = {
      open: getDay(this.#settings, dayjs().format("dddd")).open,
      close: getDay(this.#settings, dayjs().format("dddd")).close,
    }

    const time = {
      open: dayjs().format(this.dateFormat + hours.open),
      close: dayjs().format(this.dateFormat + hours.close),
    }

    // Increment 1 day, so spanning onto another day works correctly.
    if (!dayjs(time.open).isBefore(dayjs(time.close))) {
      return dayjs(time.close).add(1, 'd').format(this.timeFormat)
    } else {
      return time.close
    }
  }

  isAfterOpen(time) {
    if (dayjs(time).isSameOrAfter(this.timeOpen())) {
      return true
    } else {
      return false
    }
  }

  isAfterClose(time) {
    if (dayjs(time).isAfter(this.timeClose())) {
      return true
    } else {
      return false
    }
  }
}
