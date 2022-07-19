const { s3 } = require('../models/modelImpl/aws');
const { awsConfig } = require('../config');
const log = require('../services/logger');

module.exports = async () => {
    let bucketOptions = {
        Bucket: awsConfig.s3.bucketName,
        ACL: awsConfig.acl,
        CreateBucketConfiguration: {
            LocationConstraint: awsConfig.s3.region,
        }
    };
    try {
        await s3.createBucket(bucketOptions).promise();
        log.info(`created: S3 bucket with name ${awsConfig.s3.bucketName} under region ${awsConfig.s3.region}`);
    } catch (error) {
        if (error && error.statusCode === 409)
            log.info(`Found: S3 bucket with name ${awsConfig.s3.bucketName} under region ${awsConfig.s3.region}`);
        else
            log.error(`${error}: ${error.stack}`);
    }
}