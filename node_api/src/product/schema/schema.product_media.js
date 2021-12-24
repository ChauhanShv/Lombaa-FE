const FileType = require("file-type");
const config = require("../product.config");
module.exports = {
  media: {
    custom: {
      options: async (value, { req, location, path }) => {
        let file = req.files.find((x) => x.fieldname === path);
        if (!file) return Promise.reject(`Media is missing`);

        const filters = await FileType.fromBuffer(file.buffer);

        if (!filters) return Promise.reject(`Failed to read MIME`);

        if (!file.size > config.mediaSizeLimit) return Promise.reject(`Greater than ${config.mediaSizeLimit / 1000000} MB file size not allowed`);

        if (!config.allowedMediaType.includes(filters.mime)) return Promise.reject("Invalid media type");

        return Promise.resolve();
      },
    },
  },
};
