const days = {
  "Monday": "Måndag",
  "Tuesday": "Tisdag",
  "Wednesday": "Onsdag",
  "Thursday": "Torsdag",
  "Friday": "Fredag",
  "Saturday": "Lördag",
  "Sunday": "Söndag",
}

export default function Days({ settings }) {
  return (
    <div>
      <form
        id="settingsform"

        autoComplete="off">
        {settings.days.map((d, i) => (
          <div className="field">
            <label className="label">{days[d.day]}</label>
            <div className="control">
              <input
                className="input has-text-centered"
                type="time" name={d.open + "-open"}
                value={d.open} step="60" />
            </div>
            <div className="control">
              <input
                className="input has-text-centered"
                type="time" name={d.close + "-close"}
                value={d.close} step="60" />
            </div>
          </div>
        ))}
        <div className="control">
          <button className="button is-link">Spara</button>
        </div>
      </form>
    </div>
  )
}
