import React from "react"
import dayjs from "dayjs"

import { useSWRConfig } from "swr"

import { timeOpen, timeClose } from "./../../library/timehelpers"

import * as settings from "./../../settings"

export default function AdminForm() {
  const [message, setMessage] = React.useState("")

  const time = {
    open: dayjs(timeOpen()).format("HH:mm"),
    close: dayjs(timeClose()).format("HH:mm"),
  }

  const { mutate } = useSWRConfig()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      names: event.target.names.value,
      category: event.target.category.value,
      start: event.target.start.value,
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

    handleMessage(result)
    mutate("/api/bookings")
  }

  const handleMessage = m => {
    switch (m.status) {
      case "ok": {
        setMessage("")
        document.getElementById("superdupermegaform").reset()
        break
      }
      case "error": {
        switch (m.message) {
          case "conflict": {
            setMessage("Bokning kunde inte läggas till, då tid krockar.")
            break
          }
          case "before-open": {
            setMessage("Bokning kunde inte läggas till, starttid är före öppningstid.")
            break
          }
          case "after-close": {
            setMessage("Bokning kunde inte läggas till, sluttid är efter stängningstid.")
            break
          }
          default: {
            setMessage("Felmeddelande ej hanterat.")
            break
          }
        }
      }
    }
  }

  return (
    <div>
      <form id="superdupermegaform" onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label className="label">Namn</label>
          <div className="control">
            <input className="input" type="text" placeholder="Namn" name="names" maxLength="30" required />
          </div>
        </div>
        <div className="field">
          <label className="label">Starttid</label>
          <div className="control">
            <input className="input has-text-centered" type="time" name="start" min={time.open} max={time.close} step="60" />
          </div>
        </div>
        <label className="label">Kategori</label>
        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select name="category" required>
                {Object.keys(settings.categories).map((c, i) => (
                  <option value={c} key={i}>
                    {settings.categories[c].title}
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
      {message !== "" &&
        <div className="notification is-danger">
          {message}
        </div>
      }
    </div>
  )
}
