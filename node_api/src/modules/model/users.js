/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    accountType: {
      type: DataTypes.ENUM('individual','business'),
      allowNull: false
    },
    lastActiveAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM('male','female','transgender','other'),
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    memberSince: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ipCountry: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profileVerificationScore: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isFacebookVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isGoogleVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isPhoneVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isSelfieVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isIdVerified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isApproved: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isPremium: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    badgeEarned: {
      type: DataTypes.ENUM('standard','silver','gold','platinum'),
      allowNull: true
    },
    isSuspended: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    profilePicture: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isAdminMessage: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isPushNotificationsEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isEmailNotificationsEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    isPhoneNotificationsEnabled: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    showPhoneNumberConsent: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    contactPreference: {
      type: DataTypes.ENUM('call','whatsapp'),
      allowNull: true
    },
    location: {
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
    tableName: 'users'
  });
};
