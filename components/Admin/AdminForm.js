import React from "react"
import dayjs from "dayjs"
import io from "Socket.IO-client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons"

import { getCategory } from "./../../library/settingshelpers"
import TimeHelpers from "./../../library/timehelpers"

import Notification from "./../Notification"

export default function AdminForm({ settings }) {
  const [notification, setNotification] = React.useState("")
  const t = useTranslations()

  const timehelpers = new TimeHelpers(settings)

  const time = {
    open: dayjs(timehelpers.timeOpen()).format("HH:mm"),
    close: dayjs(timehelpers.timeClose()).format("HH:mm"),
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const socket = io()
    await fetch("/api/socket")

    const data = {
      names: event.target.names.value,
      category: event.target.category.value,
      start: event.target.start.value,
      duration: getCategory(settings, event.target.category.value).duration,
      settings: settings,
    }

    const endpoint = "/api/booking/add"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (result.status === "ok") {
      setNotification("")
      document.getElementById("AdminForm").reset()
    } else {
      setNotification(t("messages." + result.message))
    }

    socket.emit("data-updated", true)
  }

  return (
    <>
      <Notification
        message={notification}
        setMessage={setNotification}
        timeout={4000}
        type="error"
        target="adminform-notification"
      />
      <form
        id="AdminForm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="field">
          <label className="label">{t("titles.name")}</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Namn"
              name="names"
              maxLength="30"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">{t("titles.start")}</label>
          <div className="control">
            <input
              className="input has-text-centered"
              type="time" name="start"
              min={time.open}
              max={time.close}
              step="60"
            />
          </div>
        </div>
        <label className="label">{t("titles.category")}</label>
        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select name="category" required>
                {settings.categories.map((category, i) => (
                  <option value={category.category} key={i} >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control is-expanded">
            <button
              className="button is-link is-fullwidth"
              disabled={!timehelpers.isOpenToday()}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarPlus} />
              </span>
              <span>{t("form.add")}</span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
