import React from "react"
import io from "Socket.IO-client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import Notification from "./../../Notification"

export default function AddCategory() {
  const [notification, setNotification] = React.useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const socket = io()
    await fetch("/api/socket")

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
      setNotification("")
      document.getElementById("addcategory").reset()
    } else if (result.message === "duplicate") {
      setNotification("En annan kategori med samma namn, existerar redan.")
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
        target="settings-notification"
      />
      <form
        id="addcategory"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className="label">Lägg till kategori</label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Kategori"
              name="category"
              maxLength="20"
              required
            />
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
                required
              />
            </div>
            */
          }
          <div className="control duration-input">
            <input
              className="input"
              type="number"
              name="duration"
              min="1"
              max="1440"
              defaultValue="60"
              required
            />
          </div>
          <div className="control color-input">
            <input
              className="input"
              type="color"
              name="fontColor"
              defaultValue="#000"
              required
            />
          </div>
          <div className="control color-input">
            <input
              className="input"
              type="color"
              name="bgColor"
              defaultValue="#e8e8e8"
              required
            />
          </div>
          <div className="control color-input">
            <input
              className="input"
              type="color"
              name="borderColor"
              defaultValue="#dbdbdb"
              required
            />
          </div>
          <div className="control">
            <button className="button is-link">
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </div>
          <style jsx>
            {`
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
    </>
  )
}
