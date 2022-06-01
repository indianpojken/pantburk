import { useSWRConfig } from "swr"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

const days = {
  "Monday": "Måndag",
  "Tuesday": "Tisdag",
  "Wednesday": "Onsdag",
  "Thursday": "Torsdag",
  "Friday": "Fredag",
  "Saturday": "Lördag",
  "Sunday": "Söndag",
}

export default function DaysSettings({ settings }) {
  const { mutate } = useSWRConfig()

  const handleSubmit = async (event) => {
    event.preventDefault()

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
    
    mutate("/api/settings")
  }

  return (
    <div>
      <form
        id="settingsform"
        onSubmit={handleSubmit}
        autoComplete="off">
        {settings.days.map((d, i) => (
          <div key={i}>
            <label className="label" name="dayy">{days[d.day]}</label>
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input
                  className="input has-text-centered"
                  type="time" name="open"
                  defaultValue={d.open} step="60" />
              </div>
              <div className="control is-expanded">
                <input
                  className="input has-text-centered"
                  type="time" name="close"
                  defaultValue={d.close} step="60" />
              </div>
            </div>
          </div>
        ))}
        <br />
        <button className="button is-link is-fullwidth">
        <span className="icon">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </span>
          <span>Spara</span>
        </button>
      </form>
    </div>
  )
}
