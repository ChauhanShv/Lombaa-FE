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

eventEmitter.on(event.newEmail, ({ user, verificationLink }) => {
    console.log({ verificationLink });
    startEmailVerificationSequence({ user, verificationLink });
});

eventEmitter.on(event.apiAccessed, (execute, user) => {
    execute(user);
});


module.exports = eventEmitter;