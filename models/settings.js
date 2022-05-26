import { Sequelize, DataTypes } from "sequelize"

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./settings.sqlite",
  logging: false,
})

export const DaysModel = sequelize.define("Days", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  day: DataTypes.STRING,
  open: DataTypes.STRING,
  close: DataTypes.STRING,
}, { timestamps: false })

export const CategoriesModel = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  position: DataTypes.INTEGER,
  category: DataTypes.STRING,
  title: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  bgColor: DataTypes.STRING,
  borderColor: DataTypes.STRING,
}, { timestamps: false })

export async function initDefaults() {
  if (await CategoriesModel.count() === 0) {
    CategoriesModel.create({
      position: 0,
      category: "null",
      title: "Null",
      duration: 60,
      bgColor: "#E8E8E8",
      borderColor: "#dbdbdb",
    })
  }

  if (await DaysModel.count() === 0) {
    DaysModel.create({
      day: "Monday",
      open: "15:00",
      close: "21:00",
    })
    DaysModel.create({
      day: "Tuesday",
      open: "15:00",
      close: "21:00",
    })
    DaysModel.create({
      day: "Wednesday",
      open: "15:00",
      close: "21:00",
    })
    DaysModel.create({
      day: "Thursday",
      open: "15:00",
      close: "21:00",
    })
    DaysModel.create({
      day: "Friday",
      open: "16:00",
      close: "23:00",
    })
    DaysModel.create({
      day: "Saturday",
      open: "16:00",
      close: "23:00",
    })
    DaysModel.create({
      day: "Sunday",
      open: "",
      close: "",
    })
  }
}
