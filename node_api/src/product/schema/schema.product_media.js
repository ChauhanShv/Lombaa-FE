const FileType = require("file-type");
const config = require("../product.config");
const FileService = require("../../file/file.service")
const SettingService = require("../../settings/settings.service")
const settingService = new SettingService()
const fileService = new FileService()
module.exports = {
  media: {
    custom: {
      options: async (value, { req, location, path }) => {
        let file = req.files.find((x) => x.fieldname === path);
        console.log(file.size, 'hcbshsfbajhfbwehgbahv')
        if (!file) return Promise.reject(`Media is missing`);

        const filters = await FileType.fromBuffer(file.buffer);



        if (!filters) return Promise.reject(`Failed to read MIME`);
        if (fileService.isVideo(filters.mime)) {
          let value = settingService.getInt('product_video_memory_limit')
          if (value) {
            if (file.size > value * 1000) {
              return Promise.reject(`File should be less than ${value} kb`)
            }
          }
        }
        else if (fileService.isImage(filters.mime)) {
          let value = settingService.getInt('product_image_memory_limit')
          if (value) {
            if (file.size > value * 1000) {
              return Promise.reject(`File should be less than ${value} kb`)
            }
          }
        }

        if (!file.size > config.mediaSizeLimit) return Promise.reject(`Greater than ${config.mediaSizeLimit / 1000000} MB file size not allowed`);

        if (!config.allowedMediaType.includes(filters.mime)) return Promise.reject("Invalid media type");

        return Promise.resolve();
        x
      },
    },
  },
};
