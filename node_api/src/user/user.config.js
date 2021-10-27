module.exports = {
    minAgeLimit: parseInt(process.env.MIN_AGE_LIMIT || '13'),
    genderOptions: ['male', 'female', 'other'],
    dobFormat: 'YYYY-MM-DD'
};