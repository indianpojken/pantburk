import { Server } from "Socket.IO"

// Used this as a base:
// https://blog.logrocket.com/implementing-websocket-communication-next-js/

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", socket => {
      socket.on("data-updated", msg => {
        socket.broadcast.emit("update-data", msg)
      })
    })
  }
  res.end()
}
