import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
})

export const BookingModel = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: DataTypes.STRING,
  names: DataTypes.STRING,
  start: DataTypes.STRING,
  end: DataTypes.STRING,
}, { timestamps: false })

sequelize.sync()
