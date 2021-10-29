module.exports = {
    minAgeLimit: parseInt(process.env.MIN_AGE_LIMIT || '13'),
    genderOptions: ['male', 'female', 'other'],
    dobFormat: 'YYYY-MM-DD',
    pictureSizeLimit: 1000000,
    coverPictureSizeLimit: 1000000,
    allowedPictureMime: ['image/jpeg', 'image/png'],
    allowedCoverPictureMime: ['image/jpeg', 'image/png'],
    yearFormat: 'YYYY'
};