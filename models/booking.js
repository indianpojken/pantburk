import { Sequelize, DataTypes } from "sequelize"

export const sequelize = new Sequelize({
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
