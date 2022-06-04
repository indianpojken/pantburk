import React from "react"
import io from "Socket.IO-client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleUp, faAngleDown, faTrashCan, faFloppyDisk
} from "@fortawesome/free-solid-svg-icons"

import Notification from "./../../Notification"

let socket

export default function Categories({ settings }) {
  const [notification, setNotification] = React.useState("")
  const [notificationType, setNotificationType] = React.useState("")

  React.useEffect(() => {
    (async () => {
      socket = io()
      await fetch("/api/socket")
    })()
  })

  const deleteClick = async (id) => {
    await fetch("/api/category/" + id, { method: "DELETE", })

    socket.emit("data-updated", true)

    document.getElementById("categories").reset()
  }

  const handleMove = async (id, direction) => {
    const data = {
      id: id,
      direction: direction,
    }

    const endpoint = "/api/category/move"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    socket.emit("data-updated", true)

    document.getElementById("categories").reset()
  }

  const handleSubmit = async (event, id) => {
    event.preventDefault()

    const data = []

    if (settings.categories.length === 1) {
      data.push(
        {
          position: Number(event.target.position.innerText),
          title: event.target.title.value,
          duration: Number(event.target.duration.value),
          fontColor: event.target.fontColor.value,
          bgColor: event.target.bgColor.value,
          borderColor: event.target.borderColor.value,
        }
      )
    } else {
      for (let i = 0; i < settings.categories.length; i++) {
        data.push(
          {
            position: Number(event.target.position[i].innerText),
            title: event.target.title[i].value,
            duration: Number(event.target.duration[i].value),
            fontColor: event.target.fontColor[i].value,
            bgColor: event.target.bgColor[i].value,
            borderColor: event.target.borderColor[i].value,
          }
        )
      }
    }

    const endpoint = "/api/settings/categories"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    setNotificationType("success")
    setNotification("Sparat ändringar.")

    socket.emit("data-updated", true)
  }

  if (settings.categories.length === 0) {
    return (<></>)
  }

  return (
    <>
      <form
        id="categories"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label className="label">Kategorier</label>
        {settings.categories.map((category, i) => (
          <div className="field has-addons" key={i}>
            <div className="control">
              <button name="position" className="button is-static color-input">
                {category.position}
              </button>
            </div>
            <div className="control">
              <button className="button is-static">
                {category.category}
              </button>
            </div>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                name="title"
                defaultValue={category.title}
                maxLength="20"
                required />
            </div>
            <div className="control duration-input">
              <input
                className="input"
                type="number"
                name="duration"
                min="1"
                max="1440"
                defaultValue={category.duration}
                required
              />
            </div>
            <div className="control color-input">
              <input
                className="input"
                type="color"
                name="fontColor"
                defaultValue={category.fontColor}
                required
              />
            </div>
            <div className="control color-input">
              <input
                className="input"
                type="color"
                name="bgColor"
                defaultValue={category.bgColor}
                required
              />
            </div>
            <div className="control color-input">
              <input
                className="input"
                type="color"
                name="borderColor"
                defaultValue={category.borderColor}
                required
              />
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => handleMove(category.id, "up")}
                disabled={category.position === 1}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faAngleUp} />
                </span>
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => handleMove(category.id, "down")}
                disabled={category.position === settings.categories.length}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={() => deleteClick(category.id)}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </button>
            </div>
            <style jsx>{`
            .color-input {
              min-width: 54px;
            }

            .duration-input {
              max-width: 90px;
            }
          `}</style>
          </div>
        ))}
        <div className="control is-expanded">
          <button className="button is-link is-fullwidth">
            <span className="icon">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
            <span>Spara</span>
          </button>
        </div>
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
