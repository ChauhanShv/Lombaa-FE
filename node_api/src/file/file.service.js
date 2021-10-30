const FileType = require('file-type')
const model = require('./file.model')

module.exports = class FileService {
    constructor() {
    }
    async create(docs, s3Data, User) {
        try {
            const data = docs
            const file = data[0].originalname
            const filename = file.split('.').slice(0, -1).join('.');
            const files = await FileType.fromBuffer(data[0].buffer)
            const savedFile = await model.create({
                key_name: filename,
                extension: files.ext,
                name: data[0].fieldname,
                mime: files.ext,
                location: "s3",
                relative_path: 'dhdh',
                absolute_path: s3Data.Location
            })
            return savedFile;
        }
        catch (error) {
            return null
        }
    }
}