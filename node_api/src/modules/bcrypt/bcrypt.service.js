const config = require('./bcrypt.config');
const bcrypt = require('bcrypt');

exports.hash = (text, options) => {
    const saltRounds = options?.saltRounds ?? config?.saltRounds ?? 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashedPassword = bcrypt.hashSync(text, salt);
    return hashedPassword;
}