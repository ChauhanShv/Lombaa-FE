const moment = require("moment");

module.exports = (value, format = 'YYYY-MM-DDTHH:MM:SSZ') => {
    if (format)
        return moment(value, format).isValid();
    return moment(value).isValid();
}