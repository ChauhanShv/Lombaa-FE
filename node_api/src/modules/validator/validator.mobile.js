module.exports = (value) => {
    return new RegExp('^[0-9]{8,20}$').test(value);
}
