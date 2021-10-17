/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    country: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1,
      references: {
        model: {
          tableName: 'countries',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'regions'
  });
};
