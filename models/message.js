const Sequelize = require("sequelize")

const sequelize = require("../util/database")

const Messages = sequelize.define("messages", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    message: {
        type: Sequelize.STRING
    }
})

module.exports = Messages