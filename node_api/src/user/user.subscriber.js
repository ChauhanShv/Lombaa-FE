const EventEmitter = require('events').EventEmitter;
const {
    startEmailVerificationSequence,
    startForgetPasswordSequence
} = require('./user.mail');

const eventEmitter = new EventEmitter();
const event = require('./user.event');

eventEmitter.on(event.forgetPassword, ({ user, resetPasswordLink }) => {
    console.log({ resetPasswordLink });
    startForgetPasswordSequence({ user, resetPasswordLink });
});

eventEmitter.on(event.emailChange, ({ user, verificationLink }) => {
    console.log({ verificationLink });
    startEmailVerificationSequence({ user, verificationLink });
});


module.exports = eventEmitter;