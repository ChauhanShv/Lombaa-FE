const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../modules/sequelize').service;

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        accountType: {
            type: DataTypes.ENUM('standard', 'business'),
            allowNull: true
        },
        lastActiveAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        sex: {
            type: DataTypes.ENUM('male', 'female', 'transgender', 'other'),
            allowNull: true
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
        facebookId: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isGoogleVerified: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        googleId: {
            type: DataTypes.STRING(255),
            allowNull: true
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
            type: DataTypes.ENUM('standard', 'silver', 'gold', 'platinum'),
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
            type: DataTypes.ENUM('call', 'whatsapp'),
            allowNull: true
        },
        location: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
    },
    {
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        sequelize
    }
)

module.exports = User;