const setPassword = require("./set-password");
const emailSchema = require("./email.schema");
const phoneSchema = require("./phonenumber.schema");
const activeSchema = require("./active.schema");
const forgetPasswordSchema = require('./forgetPassword.schema')

module.exports = { setPassword, emailSchema, phoneSchema, activeSchema, forgetPasswordSchema };
