import React from "react"
import io from "Socket.IO-client"

let socket

export function fetchData(endpoint) {
  const [data, setData] = React.useState()
  const [refresh, setRefresh] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      const response = await fetch(endpoint)
      const result = await response.json()

      if (!socket) socket = io()
      await fetch("/api/socket")

      setData(result)
      setRefresh(false)

      socket.on("update-data", async () => {
        setRefresh(true)
      })
    })()
  }, [refresh])

  return data
}
