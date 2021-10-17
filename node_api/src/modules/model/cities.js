/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cities', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: sequelize.fn('uuid'),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'regions',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cities'
  });
};
