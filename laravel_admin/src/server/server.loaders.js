const server = require('./server.loader');

// const nodemailer = require('./nodemailer');
const sequelizeLoader = require('../modules/sequelize').loader;
// const s3Loader = require('./s3');

exports.init = async function ({ app }) {

    await server({ app });

    await sequelizeLoader();

    // await nodemailer();

    // await s3Loader();
}