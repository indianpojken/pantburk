import React from "react"
import dayjs from "dayjs"
import io from "Socket.IO-client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons"

import { getCategory } from "./../../library/settingshelpers"
import TimeHelpers from "./../../library/timehelpers"

const messages = {
  "conflict": "Bokning kunde inte läggas till, då tid krockar.",
  "before-open": "Bokning kunde inte läggas till, starttid är före öppningstid.",
  "after-close": "Bokning kunde inte läggas till, sluttid är efter stängningstid.",
}

export default function AdminForm({ settings, setMessage }) {
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
      setMessage("")
      document.getElementById("AdminForm").reset()
    } else {
      setMessage(messages[result.message])
    }

    socket.emit("data-updated", true)
  }

  return (
    <div>
      <form
        id="AdminForm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="field">
          <label className="label">Namn</label>
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
          <label className="label">Starttid</label>
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
        <label className="label">Kategori</label>
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
              <span>Lägg till</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
