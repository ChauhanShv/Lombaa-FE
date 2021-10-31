const { DataTypes } = require('sequelize')
const Sequelize = require('sequelize');


class BasicAttr {
    constructor() {
        this.id = {
            autoIncrement: false,
            type: DataTypes.UUID,
            defaulValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        };
    }
}

module.exports = BasicAttr;