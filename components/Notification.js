import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const msgType = {
  "success": "is-success",
  "error": "is-danger",
}

const iconType = {
  "success": faCircleCheck,
  "error": faTriangleExclamation,
}

export default function Notification({ message, type, timeout, setMessage }) {
  React.useEffect(() => {
    if (timeout >= 1000) {
      const timer = setTimeout(() => {
        setMessage("")
      }, timeout)

      return () => clearTimeout(timer)
    }
  })

  if (!message) return (<></>)

  return (
    <div className={"notification has-text-centered " + msgType[type]}>
      <span className="icon">
        <FontAwesomeIcon icon={iconType[type]} />
      </span>
      <br />
      {message}
      <style jsx>{`
            .notification {
              margin-top: 12px;
              margin-bottom: 12px;
            }
          `}</style>
    </div>
  )
}
