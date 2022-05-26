import useSWR from "swr"

import Item from "./Schedule/Item"
import Category from "./Schedule/Category"
import Timeline from "./Schedule/Timeline"

import TimeHelpers from "../library/timehelpers"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getBookings() {
  const { data, error } = useSWR("/api/bookings", fetcher,
    { refreshInterval: 500, refreshWhenHidden: true, refreshWhenOffline: true })

  return {
    data: data,
    error: error,
  }
}

export default function Schedule({ admin, settings }) {
  const { data, error } = getBookings()

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="schedule">
      <div className="time" />
      <Timeline minutes={new TimeHelpers(settings).minutesOpen()} settings={settings} />

      {settings.categories.map((c, i) => (
        <Category title={c.title} key={i} />
      ))}

      {data.map((b, i) => (
        <Item booking={b} admin={admin} settings={settings} key={i} />
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
              repeat(${new TimeHelpers(settings).minutesOpen()}, 1fr);
        }

        .time {
          grid-column: timeline;
          grid-row: categories;
        }
      `}</style>
    </div>
  )
}
