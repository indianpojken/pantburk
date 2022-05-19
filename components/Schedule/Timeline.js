import dayjs from "dayjs"

import { timeOpen, minutesOpen } from "./../../library/timehelpers"

export default function Timeline() {
  const time = []

  for (let i = 0; i <= minutesOpen(); i++) {
    if (i % 60 == 0 || i % 30 == 0) {
      const css = _ => {
        if (i % 60 === 0) {
          return "time time-border is-size-6 has-text-weight-semibold"
        } else {
          return "time time-border is-size-7"
        }
      }

      time.push({
        minuteMark: i,
        label: dayjs(timeOpen()).add(i, "m").format("HH:mm"),
        cssClass: css(),
      })
    }
  }

  return (
    <>
      {time.map((t, i) => (
        <div className={t.cssClass} key={i} >
          {t.label}

          <style jsx>{`
          .time {
            grid-column: timeline;
            grid-row: ${t.minuteMark + 2};
            text-align: right;
          }

          .time-border {
            border-top: 1px solid #E8E8E8;
          }
        `}</style>

          <style jsx global>{`
            :global(body) {
              padding: 0;
              margin: 0;
              overflow: hidden;
            }
            
            // https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
              margin: 0 auto;
              width: 100%;
              overflow: hidden;
            }
          `}
          </style>
        </div>
      ))}
    </>
  )
}
