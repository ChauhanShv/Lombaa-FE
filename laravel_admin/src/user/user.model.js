const { BasicAttr } = require("../modules/model");
const db = require("../modules/sequelize").service;
const { DataTypes } = require('sequelize')
const Sequelize = require('sequelize');
class UserAttr extends BasicAttr {
    constructor() {
        super();
        this.name = {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'name'
        }
    }
};

module.exports = db.define('User', new UserAttr());