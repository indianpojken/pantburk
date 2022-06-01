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
  fontColor: DataTypes.STRING,
  bgColor: DataTypes.STRING,
  borderColor: DataTypes.STRING,
}, { timestamps: false })
