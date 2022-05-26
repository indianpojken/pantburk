import Timestamp from "./Timeline/Timestamp"

import TimeHelpers from "./../../library/timehelpers"

export default function Timeline({ settings }) {
  const time = []

  for (let minute = 0; minute < new TimeHelpers(settings).minutesOpen(); minute++) {
    if (minute % 60 == 0 || minute % 30 == 0) {
      time.push(minute)
    }
  }

  return (
    <>
      {time.map((minute, i) => (
        <Timestamp minute={minute} settings={settings} key={i} />
      ))}
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
      `}</style>
    </>
  )
}
