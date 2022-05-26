import dayjs from "dayjs"

import { timeOpen } from "./../../../library/timehelpers"

export default function Timestamp({ minute }) {
  return (
    <div className=
      {minute % 60 === 0
        ? "time time-border is-size-6 has-text-weight-semibold"
        : "time time-border is-size-7"
      }>
      {dayjs(timeOpen()).add(minute, "m").format("HH:mm")}

      <style jsx>{`
        .time {
          grid-column: timeline;
          grid-row: ${minute + 2};
          text-align: right;
          max-height: 1px;
        }

        .time-border {
          border-top: 1px solid #E8E8E8;
        }

        .time-border {
          border-top: 1px solid #E8E8E8;
        }
      `}</style>
    </div>
  )
}
