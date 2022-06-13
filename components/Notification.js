import React from "react"
import reactDOM from "react-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const notificationType = {
  "success": {
    class: "is-success",
    icon: faCircleCheck,
  },
  "error": {
    class: "is-danger",
    icon: faTriangleExclamation,
  },
}

export default function Notification({
  message, type, timeout, setMessage, target
}) {
  React.useEffect(() => {
    if (timeout >= 1000) {
      const timer = setTimeout(() => {
        setMessage("")
      }, timeout)

      return () => clearTimeout(timer)
    }
  })

  if (!message) return (<></>)

  let component = (
    <div className={"notification has-text-centered "
      + notificationType[type].class}>
      <span className="icon">
        <FontAwesomeIcon icon={notificationType[type].icon} />
      </span>
      <br />
      {message}
      <style jsx>
        {`
          .notification {
            margin-top: 12px;
            margin-bottom: 12px;
          }
        `}
      </style>
    </div>
  )

  if (!target) {
    return component
  } else {
    return reactDOM.createPortal(component, document.getElementById(target))
  }
}
