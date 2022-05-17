import dayjs from "dayjs"

import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

import * as settings from "./../settings.js"

export const timeFormat = "YYYY-MM-DD HH:mm"
export const dateFormat = "YYYY-MM-DD "

export function isOpenToday() {
   if (settings.days[dayjs().format("dddd")] === undefined) {
     return false
   } else {
     return true
   }
}

export function minutesBetween(start, end) {
  return dayjs(end).diff(start, "m")
}

export function minutesOpen() {
  return minutesBetween(timeOpen(), timeClose())
}

export function timeOpen() {
  const open = settings.days[dayjs().format("dddd")].open
  return dayjs().format(dateFormat + open)
}

export function timeClose() {
  const hours = {
    open: settings.days[dayjs().format("dddd")].open,
    close: settings.days[dayjs().format("dddd")].close,
  }

  const time = {
    open: dayjs().format(dateFormat + hours.start),
    close: dayjs().format(dateFormat + hours.close),
  }

  // Increment 1 day, so spanning onto another day works correctly.
  if (dayjs(time.open).isBefore(dayjs(time.close))) {
    return dayjs(time.close).add(1, 'd').format(timeFormat)
  } else {
    return time.close
  }
}

export function isAfterOpen(time) {
  if (dayjs(time).isSameOrAfter(timeOpen())) {
    return true
  } else {
    return false
  }
}

export function isAfterClose(time) {
  if (dayjs(time).isAfter(timeClose())) {
    return true
  } else {
    return false
  }
}
