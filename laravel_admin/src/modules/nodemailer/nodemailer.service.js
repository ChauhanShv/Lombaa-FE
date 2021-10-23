const path = require('path');
const nodemailer = require('nodemailer');
const { smtp: smtpOptions } = require('../config/email').options;
const pug = require('pug');
const log = require('./logger');
const appRootPath = require('app-root-path');
const { userConfig } = require('../config');

let templateDir = path.join(`${appRootPath.path}`, 'resources', 'views', 'emails');

const from = `Future India ${process.env.EMAIL_NOREPLY}`;

module.exports = class EmailService {
    constructor() {
        this.options = smtpOptions;
        this.transporter = nodemailer.createTransport(this.options);
    }

    async startSignupSequence({ user, emailVerificationUrl }) {

        let pugFilePath = this.getPugFilePath('verify-email');
        let html = pug.renderFile(pugFilePath, { user, emailVerificationUrl });

        let info = await this.transporter.sendMail({
            subject: 'Email Verification',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Signup: Email sent to ${user.email}: %s ${info.messageId}`);
    }

    async startSigninSequence({ user }) {
        let data = { user: user }

        let pugFilePath = this.getPugFilePath('user-signin');
        let html = pug.renderFile(pugFilePath, data);

        let info = await this.transporter.sendMail({
            subject: 'Sign In',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Signin: Email sent to ${user.email} : %s ${info.messageId}`);
    }

    async startDeviceVerificationSequence({ user, verificationUrl }) {

        let pugFilePath = this.getPugFilePath('authorize-device');
        let html = pug.renderFile(pugFilePath, { user, verificationUrl })

        let info = await this.transporter.sendMail({
            subject: 'Device Verification',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Device verificaton: Email sent to ${user.email} : %s ${info.messageId}`);
    }

    async startResetPasswordSequence({ user, resetPasswordUrl }) {
        let pugFilePath = this.getPugFilePath('forget-password');
        let html = pug.renderFile(pugFilePath, { user, resetPasswordUrl, resetPasswordtokenExpiry: userConfig.resetPasswordTokenExpiry })

        let info = await this.transporter.sendMail({
            subject: 'Reset Password',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Reset Password: Email sent to ${user.email} : %s ${info.messageId}`);
    }

    async startGenerateEmailVerificationSequence({ user, emailVerificationUrl }) {
        let pugFilePath = this.getPugFilePath('verify-email');
        let html = pug.renderFile(pugFilePath, { user, emailVerificationUrl });

        let info = await this.transporter.sendMail({
            subject: 'Email Verification',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Generate Email verification: Email sent to ${user.email} : %s ${info.messageId}`);
    }

    async startDepositRequestSequence({ user, deposit }) {

        let pugFilePath = this.getPugFilePath('deposit-request');
        let html = pug.renderFile(pugFilePath, { user, deposit });

        let info = await this.transporter.sendMail({
            subject: 'Deposit request',
            html: html,
            from: from,
            to: user.email
        });

        log.debug(`Deposit request: Email sent to ${user.email} : %s ${info.messageId}`);
    }

    async authenticate() {
        return this.transporter.verify();
    }

    getPugFilePath(file) {
        return `${templateDir}/${file}.pug`;
    }
}