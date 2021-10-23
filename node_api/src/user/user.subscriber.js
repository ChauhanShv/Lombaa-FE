const EventEmitter = require('events').EventEmitter;

const eventEmitter = new EventEmitter();
const userEvent = require('./user.event');

eventEmitter.on(userEvent.forgetPassword, ({ user, resetPasswordUrl }) => {
    console.log({ resetPasswordUrl });
});

module.exports = eventEmitter;