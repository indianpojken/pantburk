import { useSWRConfig } from "swr"

import { getCategory } from "../../library/settingshelpers"
import TimeHelpers from "./../../library/timehelpers"

export default function Item({ booking, admin, settings }) {
  const timehelpers = new TimeHelpers(settings)
  const itemSettings = getCategory(settings, booking.category)

  const color = {
    background: itemSettings.bgColor,
    border: itemSettings.borderColor
  }

  const position = {
    column: itemSettings.position,
    start: timehelpers.minutesBetween(
      timehelpers.timeOpen(), booking.start
    ),
    end: timehelpers.minutesBetween(
      timehelpers.timeOpen(), booking.end
    ),
  }

  const { mutate } = useSWRConfig()

  const deleteClick = async (id) => {
    await fetch("/api/booking/" + id, { method: "DELETE", })
    mutate("/api/bookings")
  }

  return (
    <div className="booking">
      <div className="columns is-gapless is-multiline entry">

        <div className="column is-full is-size-7 has-text-weight-bold">
          <div className="columns is-gapless is-multiline">
            <p className="column">
              {booking.start.substring(10, 16)}
            </p>
            {admin === true &&
              <button
                className="delete is-small delete-button"
                onClick={(_) => deleteClick(booking.id)}>
              </button>}
          </div>
        </div>

        <div className="column is-full has-text-centered has-text-weight-bold">
          {booking.names}
        </div>

        <div className="column is-full is-size-7 has-text-weight-bold time-bottom">
          <p>
            {booking.end.substring(10, 16)}
          </p>
        </div>

      </div>

      <style jsx>{`
        .booking {
          grid-column: ${2 + position.column};
          grid-row: ${position.start + 2} / ${position.end + 2};
          background-color: ${color.background};
          border-top: 1px solid ${color.border};
          border-bottom: 1px solid ${color.border};
          overflow: hidden;
        }

        .entry { min-height: 100%; }

        .time-bottom {
          position: relative;
        }

        .time-bottom p {
          position: absolute;
          bottom: 0;
          right: 1;
        }

        .delete-button { margin: 1px; }
      `}</style>
    </div>
  )
}
