import React from "react"
import Head from "next/head"
import io from "Socket.IO-client"

import Schedule from "./../components/Schedule"

import TimeHelpers from "./../library/timehelpers"

async function fetchSettings() {
  const response = await fetch("/api/settings")
  const result = await response.json()
  return result
}

async function fetchBookings() {
  const response = await fetch("/api/bookings")
  const result = await response.json()
  return result
}

let socket

export default function Index() {
  const [settings, setSettings] = React.useState()
  const [bookings, setBookings] = React.useState()

  React.useEffect(async () => {
    const settings = await fetchSettings()
    setSettings(settings)

    const bookings = await fetchBookings()
    setBookings(bookings)

    socket = io()
    await fetch("/api/socket")

    socket.on("update-data", async () => {
      const _settings = await fetchSettings()
      setSettings(_settings)

      const _bookings = await fetchBookings()
      setBookings(_bookings)
    })
  }, [])


  //if (data) return <div>Failed to load</div>
  if (!settings) return <></>
  if (!bookings) return <></>

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk</title>
      </Head>
      {new TimeHelpers(settings).isOpenToday()
        ? <Schedule admin={false} settings={settings} bookings={bookings} />
        : <p>Stängt</p>
      }
      <style jsx global>{`
        // https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          font-size: 1.05em;
        }
      `}</style>
    </div>
  )
}
