import { sequelize } from "./models/booking.js"
import { DaysModel, sequelize as seq } from "./models/settings.js"

await sequelize.sync()
await seq.sync()
await initDefaults()

async function initDefaults() {
  if (await DaysModel.count() === 0) {
    await DaysModel.bulkCreate([
      {
        day: "Monday",
        open: "15:00",
        close: "21:00",
      },
      {
        day: "Tuesday",
        open: "15:00",
        close: "21:00",
      },
      {
        day: "Wednesday",
        open: "15:00",
        close: "21:00",
      },
      {
        day: "Thursday",
        open: "15:00",
        close: "21:00",
      },
      {
        day: "Friday",
        open: "16:00",
        close: "23:00",
      },
      {
        day: "Saturday",
        open: "16:00",
        close: "23:00",
      },
      {
        day: "Sunday",
        open: "",
        close: "",
      }
    ])
  }
}
