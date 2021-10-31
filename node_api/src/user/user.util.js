const bcryptService = require("../modules/bcrypt/").service;

exports.hashPassword = (password) => {
    let hashedPassword = bcryptService.hash(password);
    return hashedPassword;
}
