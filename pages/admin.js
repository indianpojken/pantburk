import React from "react"
import Head from "next/head"
import io from "Socket.IO-client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faCalendar } from "@fortawesome/free-solid-svg-icons"

import Schedule from "./../components/Schedule"
import AdminForm from "./../components/Admin/Form"
import SettingsForm from "./../components/Admin/Settings"
import Notification from "../components/Notification"

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

export default function Admin() {
  const [getToggleSettings, setToggleSettings] = React.useState(false)
  const [notification, setNotification] = React.useState("")
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

  //if (error) return <div>Failed to load</div>
  if (!settings) return <></>
  if (!bookings) return <></>

  const toggleSettings = _ => {
    if (getToggleSettings === false) {
      setToggleSettings(true)
    } else {
      setToggleSettings(false)
    }
  }

  return (
    <div className="tile is-ancestor">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk (Admin)</title>
      </Head>
      <div className="timeline-border">
        <AdminForm settings={settings} setMessage={setNotification} />
        <br />
        {new TimeHelpers(settings).isOpenToday() &&
          <button
            className="button is-fullwidth is-link is-light"
            onClick={toggleSettings}>
            {getToggleSettings
              ?
              <>
                <span className="icon">
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                <span>Schema</span>
              </>
              :
              <>
                <span className="icon">
                  <FontAwesomeIcon icon={faSliders} />
                </span>
                <span>Inställningar</span>
              </>
            }
          </button>}
        <Notification
          message={notification}
          setMessage={setNotification}
          timeout={4000}
          type="error"
        />
        <style jsx>{`
          .timeline-border {
            padding-right: 20px;
            padding-left: 20px;
            border-right: 1px solid #E8E8E8;
          }
        `}</style>
      </div>
      {new TimeHelpers(settings).isOpenToday()
        ? <>
          {getToggleSettings
            ? <SettingsForm settings={settings} />
            : <Schedule admin={true} settings={settings} bookings={bookings} />
          }
        </>
        : <SettingsForm settings={settings} />
      }
    </div>
  )
}
