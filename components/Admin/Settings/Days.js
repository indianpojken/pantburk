import React from "react"
import io from "Socket.IO-client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

import Notification from "./../../Notification"

export default function DaysSettings({ settings }) {
  const [notification, setNotification] = React.useState("")
  const [notificationType, setNotificationType] = React.useState("")

  const t = useTranslations()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const socket = io()
    await fetch("/api/socket")

    const data = []

    for (let i = 0; i < settings.days.length; i++) {
      data.push(
        [event.target.open[i].value, event.target.close[i].value]
      )
    }

    const endpoint = "/api/settings/days"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (result.message === "ok") {
      setNotificationType("success")
      setNotification(t("messages.saved-changes"))
    }

    socket.emit("data-updated", true)
  }

  return (
    <>
      <form
        id="settingsform"
        onSubmit={handleSubmit}
        autoComplete="off">
        {settings.days.map((day, i) => (
          <div key={i}>
            <label className="label" name="day">
              {t("day." + day.day)}
            </label>
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input
                  className="input has-text-centered"
                  type="time"
                  name="open"
                  defaultValue={day.open}
                  step="60"
                />
              </div>
              <div className="control is-expanded">
                <input
                  className="input has-text-centered"
                  type="time"
                  name="close"
                  defaultValue={day.close}
                  step="60"
                />
              </div>
            </div>
          </div>
        ))}
        <br />
        <button className="button is-link is-fullwidth">
          <span className="icon">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </span>
          <span>{t("form.save")}</span>
        </button>
      </form>
      <Notification
        message={notification}
        setMessage={setNotification}
        timeout={1000}
        type={notificationType}
      />
    </>
  )
}
