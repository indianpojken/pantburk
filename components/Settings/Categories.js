const days = {
  "Monday": "Måndag",
  "Tuesday": "Tisdag",
  "Wednesday": "Onsdag",
  "Thursday": "Torsdag",
  "Friday": "Fredag",
  "Saturday": "Lördag",
  "Sunday": "Söndag",
}

export default function Categories({ settings }) {
  return (
    <div>
      <form
        id="settingsform"

        autoComplete="off">
        {settings.categories.map((c, i) => (
          <div>
          {c.category}
          </div>
        ))}
      </form>
    </div>
  )
}
