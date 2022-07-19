const schema = require("./schema.auth");
const googleSchema = require("./schema.google_auth");
const facebookSchema = require("./schema.facebook_auth");
const refreshTokenSchema = require("./schema.refresh_token");

module.exports = {
  schema,
  googleSchema,
  facebookSchema,
  refreshTokenSchema,
};
