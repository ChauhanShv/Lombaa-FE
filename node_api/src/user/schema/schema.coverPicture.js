const FileType = require('file-type')
const config = require('../user.config')
module.exports = {
    "image": {
        custom: {
            options: async (value, { req, location, path }) => {

                let file = req.files.find(x => x.fieldname === path);

                const filters = await FileType.fromBuffer(file.buffer);

                if (!file.size > config.coverPictureSizeLimit)
                    return Promise.reject("Greater than 1MB file size not allowed");

                if (!config.allowedCoverPictureMime.includes(filters.mime))
                    return Promise.reject("Invalid image type");

                return Promise.resolve();



            }
        }
    }
}