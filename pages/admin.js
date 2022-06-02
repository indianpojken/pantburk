import React from "react"
import Head from "next/head"
import useSWR from "swr"

import Schedule from "./../components/Schedule"
import AdminForm from "./../components/Admin/Form"
import SettingsForm from "./../components/Admin/Settings"
import Notification from "../components/Notification"

import TimeHelpers from "./../library/timehelpers"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faCalendar } from "@fortawesome/free-solid-svg-icons"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function getSettings() {
  const { data, error } = useSWR("/api/settings", fetcher,
    { refreshInterval: 500, refreshWhenHidden: true, refreshWhenOffline: true })

  return {
    settings: data,
    error: error,
  }
}

export default function Admin() {
  const [getToggleSettings, setToggleSettings] = React.useState(false)
  const [notification, setNotification] = React.useState("")
  const { settings, error } = getSettings()

  if (error) return <div>Failed to load</div>
  if (!settings) return <div>Loading...</div>

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
            : <Schedule admin={true} settings={settings} />
          }
        </>
        : <SettingsForm settings={settings} />
      }
    </div>
  )
}
