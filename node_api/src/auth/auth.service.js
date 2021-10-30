const User = require("../user/user.model");
const bcrypt = require("bcrypt");

const fs = require("fs");

const https = require("https");
const axios = require("axios");

const appRoot = require("app-root-path");
class AuthService {

  async doAuth({ email, password }) {
    const dbUser = await User.findOne({ where: { email: email } });

    if (!dbUser) return false;
    if (!dbUser.password) return false;
    const passwordMatch = await bcrypt.compare(password, dbUser.password);
    if (!passwordMatch) return false;
    dbUser.password = undefined;
    return dbUser;
  }

  async googleAuth(accessToken) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        { headers }
      );
      if (response.status === 200) return response.data;
      return null;
    } catch (err) {
      console.log({ err });
      return null;
    }
  }

  async facebookAuth(accessToken) {
    const agent = new https.Agent({
      requestCert: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync(`${appRoot}/cert/server.pem`),
    });
    try {
      const response = await axios.get(
        `https://graph.facebook.com/me?access_token=${accessToken}`,
        { httpsAgent: agent }
      );
      if (response.status === 200) return response.data;
      return null;
    } catch (err) {
      console.log({ err });
      return null;
    }
  }
}

module.exports = AuthService;
