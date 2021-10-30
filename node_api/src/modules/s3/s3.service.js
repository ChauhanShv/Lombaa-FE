const awsConfig = require('../aws/aws.config');
const AWS = require('aws-sdk');

module.exports = class S3Service {
    constructor() {

        this.s3 = new AWS.S3({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey
        });
    }

    async upload({ key, body }) {

        var params = {}
        params.Key = key;
        params.Body = body;
        params.Bucket = awsConfig.awsBucket;
        try {
            let data = await this.s3.upload(params).promise();
            return data;
        } catch (error) {
            return null;
        }
    }

    delete(params) {
        this.s3.deleteObject(params, (error, data) => { });
    }

    getOptions() {
        return this.options;
    }
}