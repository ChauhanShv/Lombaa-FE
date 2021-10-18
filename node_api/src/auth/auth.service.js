const User = require('../user').model;
const bcrypt = require('bcrypt');

class AuthService {

    async doAuth({ email, password }) {
        const dbUser = await User.findOne({
            where:
                { email: email },
        });


        if (!dbUser) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (passwordMatch) {
            return dbUser;
        } else {
            return false;
        }
    }
}

module.exports = AuthService;