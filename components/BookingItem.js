import { useSWRConfig } from "swr"

import {
  timeOpen,
  timeClose,
  minutesBetween,
} from "./../library/timehelpers.js"

import * as settings from "./../settings.js"

export default function BookingItem({ booking, admin }) {
  const bgColor = settings.categories[booking.category].bgColor
  const borderColor = settings.categories[booking.category].borderColor
  const column = Object.keys(settings.categories).indexOf(booking.category)
  const startPosition = minutesBetween(timeOpen(), booking.start)
  const endPosition = minutesBetween(timeOpen(), booking.end)

  const { mutate } = useSWRConfig()

  const deleteClick = async (id) => {
    await fetch("/api/booking/" + id, { method: "DELETE", })
    mutate("/api/bookings")
  }

  return (
    <div className="booking">
      <div className="columns is-gapless is-multiline ent">

        <div className="column is-full is-size-7 has-text-weight-bold">
          <div className="columns is-gapless is-multiline">
            <p className="column">{booking.start.substring(10, 16)}</p>
            {admin === true &&
              <button className="delete is-small del" onClick={(_) => deleteClick(booking.id)}></button>
            }
          </div>

        </div>

        <div className="column is-full has-text-centered has-text-weight-bold">
          {booking.names}
        </div>

        <div className="column is-full is-size-7 has-text-weight-bold time-bottom">
          <p>{booking.end.substring(10, 16)}</p>
        </div>

      </div>

      <style jsx>{`
        .booking {
          grid-column: ${2 + column};
          grid-row: ${startPosition + 2} / ${endPosition + 2};
          background-color: ${bgColor};
          border-top: 1px solid ${borderColor};
          border-bottom: 1px solid ${borderColor};
          overflow: hidden;
        }

        .ent {
          min-height: 100%;
        }

        .time-bottom {
          position: relative;
        }

        .time-bottom p {
          position: absolute;
          bottom: 0;
          right: 1;
        }

        .del {
          margin: 1px;
        }
      `}</style>
    </div>
  )
}
