const jwtService = require('../modules/jwt').service;

class AuthService {

    generateToken(user) {
        return jwtService.encode({ id: user.id });
    }
}

module.exports = AuthService;