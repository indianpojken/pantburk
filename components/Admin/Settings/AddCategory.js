import { useSWRConfig } from "swr"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AddCategory() {
  const { mutate } = useSWRConfig()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      category: event.target.category.value,
      // title: event.target.title.value,
      title: event.target.category.value,
      duration: event.target.duration.value,
      fontColor: event.target.fontColor.value,
      bgColor: event.target.bgColor.value,
      borderColor: event.target.borderColor.value,
    }

    const endpoint = "/api/category/add"

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
      document.getElementById("addcategory").reset()
    }

    mutate("/api/bookings")
    mutate("/api/settings")
  }

  return (
    <form
      id="addcategory"
      onSubmit={handleSubmit}
      autoComplete="off">
      <label className="label">Lägg till kategori</label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Kategori"
            name="category"
            maxLength="20"
            required />
        </div>
        {
          /*
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Titel"
              name="title"
              maxLength="20"
              required />
          </div>
          */
        }
        <div className="control duration-input">
          <input
            className="input"
            type="number"
            name="duration"
            min="1" max="1440" defaultValue="60" required />
        </div>
        <div className="control color-input">
          <input
            className="input"
            type="color"
            name="fontColor"
            defaultValue="#000"
            required />
        </div>
        <div className="control color-input">
          <input
            className="input"
            type="color"
            name="bgColor"
            defaultValue="#e8e8e8"
            required />
        </div>
        <div className="control color-input">
          <input
            className="input"
            type="color"
            name="borderColor"
            defaultValue="#dbdbdb"
            required />
        </div>
        <div className="control">
          <button className="button is-link">
            <span className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>
        </div>
        <style jsx>{`
          .color-input {
            min-width: 54px;
          }

          .duration-input {
            width: 108px;
          }
        `}
        </style>
      </div>
    </form>
  )
}
