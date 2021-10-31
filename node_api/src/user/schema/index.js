const setPassword = require("./schema.setPassword");
const emailSchema = require("./schema.email");
const phoneSchema = require("./schema.phonenumber");
const activeSchema = require("./schema.active");
const forgetPasswordSchema = require('./schema.forgetPassword');
const connectGoogleSchema = require('./schema.connectGoogle');
const connectFacebookSchema = require('./schema.connectFacebook');
const updateSchema = require('./schema.update');
const pictureUploadSchema = require('./schema.upload')
const coverUploadSchema = require('./schema.coverPicture')


module.exports = { setPassword, emailSchema, phoneSchema, activeSchema, forgetPasswordSchema, connectGoogleSchema, connectFacebookSchema, updateSchema, pictureUploadSchema, coverUploadSchema };
