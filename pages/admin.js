import React from "react"
import Head from "next/head"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faCalendar } from "@fortawesome/free-solid-svg-icons"

import Schedule from "./../components/Schedule"
import AdminForm from "./../components/Admin/Form"
import SettingsForm from "./../components/Admin/Settings"

import TimeHelpers from "./../library/timehelpers"

import { fetchData } from "./../hooks/fetchData"

export default function Admin() {
  const settings = fetchData("/api/settings")
  const bookings = fetchData("/api/bookings")

  const [getToggleSettings, setToggleSettings] = React.useState(false)

  if (!settings || !bookings) return (<></>)

  const toggleSettings = () => {
    setToggleSettings(!getToggleSettings)
  }

  const isOpenToday = new TimeHelpers(settings).isOpenToday()

  return (
    <div className="tile is-ancestor">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pantburk (Admin)</title>
      </Head>
      <div className="timeline-border">
        <AdminForm settings={settings} />
        <br />
        {isOpenToday &&
          <button
            className="button is-fullwidth is-link is-light"
            onClick={toggleSettings}
          >
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
        <div id="adminform-notification"></div>
        <style jsx>
          {`
            .timeline-border {
              padding-right: 20px;
              padding-left: 20px;
              border-right: 1px solid #E8E8E8;
            }
          `}
        </style>
      </div>
      {isOpenToday
        ?
        <>
          {getToggleSettings
            ? <SettingsForm settings={settings} />
            :
            <Schedule
              admin={true}
              settings={settings}
              bookings={bookings}
            />
          }
        </>
        : <SettingsForm settings={settings} />
      }
    </div>
  )
}
