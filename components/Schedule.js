import useSWR from "swr"

import BookingItem from "./BookingItem"
import Category from "./Schedule/Category"
import Timeline from "./Schedule/Timeline"

import { minutesOpen, } from "./../library/timehelpers.js"

import * as settings from "./../settings.js"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getBookings() {
  const { data, error } = useSWR("/api/bookings", fetcher,
    { refreshInterval: 500, refreshWhenHidden: true, refreshWhenOffline: true })

  return {
    data: data,
    error: error,
  }
}

export default function Schedule({ admin }) {
  const { data, error } = getBookings()

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="schedule">
      <div className="time" />
      <Timeline minutes={minutesOpen()} />

      {Object.keys(settings.categories).map((c, i) => (
        <Category title={settings.categories[c].title} key={i} />
      ))}

      {data.map((b, i) => (
        <BookingItem booking={b} admin={admin} key={i} />
      ))}

      <style jsx>{`
        .schedule {         
          display: grid;
          width: 100%;
          height: 100%;
          grid-column-gap: 10px;
      
          grid-template-columns:
            [timeline] 50px;
      
          grid-template-rows:
              [categories] 1fr
              repeat(${minutesOpen()}, 1fr);
        }

        .time {
          grid-column: timeline;
          grid-row: categories;
        }
      `}</style>
    </div>
  )
}
