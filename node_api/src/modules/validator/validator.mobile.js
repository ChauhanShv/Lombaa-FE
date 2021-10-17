module.exports = (value) => {
    return new RegExp('^[6-9][0-9]{9}$').test(value);
}