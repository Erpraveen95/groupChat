const Sequelize = require('sequelize')

const sequelize = new Sequelize("chatapp", "root", "Gautam@123", {
    dialect: "mysql",
    host: 3000
})

module.exports = sequelize