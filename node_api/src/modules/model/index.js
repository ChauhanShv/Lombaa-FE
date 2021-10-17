const user = require('./users');

const createModel = (definition) => {
    return definition(db, Sequelize);
}

module.exports = {
    User = createModel(users)
}