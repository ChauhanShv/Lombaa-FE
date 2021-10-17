/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    cityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    regionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'locations'
  });
};
