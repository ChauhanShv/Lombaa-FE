const FileType = require("file-type");
const File = require("./file.model");
const { v4: uuid4 } = require("uuid");
const S3Service = require("../modules/s3/s3.service");

module.exports = class FileService {
  constructor() {
    this.s3Service = new S3Service();
  }

  async create(docs, s3Data, location, relativePath) {
    try {
      const data = docs;
      const file = data[0].originalname;
      const files = await FileType.fromBuffer(data[0].buffer);
      const savedFile = await File.create({ key_name: s3Data.key, extension: files.ext, name: s3Data.key, mime: files.mime, location: location, relative_path: relativePath, absolute_path: s3Data.Location });
      return savedFile;
    } catch (error) {
      return null;
    }
  }

  async upload(buffer, { key = uuid4(), saveToDB = true }) {
    try {
      const { ext: extension, mime } = await FileType.fromBuffer(buffer);
      const s3Data = await this.s3Service.upload({ key, body: buffer });
      if (!s3Data) return null;

      if (!saveToDB) return s3Data;

      return await File.create({ key_name: s3Data.Key, extension, name: s3Data.Key, mime, location: "s3", relative_path: "", absolute_path: s3Data.Location });
    } catch (error) {
      throw new Error(error);
    }
  }

  isVideo(mime) {
    const videoMimeTypes = ["video/mp4"]
    return videoMimeTypes.includes(mime)
  }

  isImage(mime) {
    const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"]
    return imageMimeTypes.includes(mime)
  }
};
