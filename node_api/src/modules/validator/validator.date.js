const moment = require("moment");

module.exports = (value, format) => {
    if (format)
        return moment(value, format).isValid();
    return moment(value).isValid();
}