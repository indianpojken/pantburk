import React from "react"
import Head from "next/head"

import Schedule from "./../components/Schedule"

import TimeHelpers from "./../library/timehelpers"

import { fetchData } from "./../hooks/fetchData"

export default function Index() {
  const settings = fetchData("/api/settings")
  const bookings = fetchData("/api/bookings")

  if (!settings || !bookings) return (<></>)

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk</title>
      </Head>
      {new TimeHelpers(settings).isOpenToday()
        ?
        <Schedule
          admin={false}
          settings={settings}
          bookings={bookings}
        />
        : <></>
      }
      <style jsx global>
        {`
          // https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            font-size: 1.05em;
          }
        `}
      </style>
    </div>
  )
}
