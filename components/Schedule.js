import React from "react"

import Item from "./Schedule/Item"
import Category from "./Schedule/Category"
import Timeline from "./Schedule/Timeline"

import TimeHelpers from "../library/timehelpers"
import { getCategory } from "./../library/settingshelpers"

export default function Schedule({ admin, settings, bookings }) {
  //if (error) return <div>Failed to load</div>
  if (!bookings) return <div>Loading...</div>

  return (
    <div className="schedule">
      <div className="time" />
      <Timeline minutes={new TimeHelpers(settings).minutesOpen()} settings={settings} />

      {settings.categories.map((c, i) => (
        <Category
          title={c.title}
          position={getCategory(settings, c.category).position}
          key={i}
        />
      ))}

      {bookings.map((b, i) => (
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
