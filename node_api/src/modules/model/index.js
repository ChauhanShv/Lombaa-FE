const createModel = (definition) => {
  return definition(db, Sequelize);
};

module.exports = {
  User: createModel(users),
  productModel: createModel(product),
};
