import React from "react"
import dayjs from "dayjs"

import { useSWRConfig } from "swr"

import Notification from "./Notification"

import { getCategory } from "../../library/settingshelpers"
import TimeHelpers from "../../library/timehelpers"

export default function AdminForm({ settings }) {
  const [message, setMessage] = React.useState("")
  const timehelpers = new TimeHelpers(settings)

  const time = {
    open: dayjs(timehelpers.timeOpen()).format("HH:mm"),
    close: dayjs(timehelpers.timeClose()).format("HH:mm"),
  }

  const { mutate } = useSWRConfig()

  const handleSubmit = async (event) => {
    event.preventDefault()

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
      document.getElementById("superdupermegaform").reset()
    } else {
      setMessage(result.message)
    }

    mutate("/api/bookings")
  }

  return (
    <div>
      <form
        id="superdupermegaform"
        onSubmit={handleSubmit}
        autoComplete="off">
        <div className="field">
          <label className="label">Namn</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Namn"
              name="names"
              maxLength="30"
              required />
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
              step="60" />
          </div>
        </div>
        <label className="label">Kategori</label>
        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select name="category" required>
                {settings.categories.map((c, i) => (
                  <option value={c.category} key={i} >
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <button className="button is-link">Lägg till</button>
          </div>
        </div>
      </form>

      <br />
      <Notification message={message} />
    </div>
  )
}
