const { isDate } = require('../../modules/validator');
const moment = require('moment');
const config = require('../user.config');

module.exports = {
    name: {
        notEmpty: { errorMessage: "Name cannot be empty" },
    },

    location: {
        optional: {
            options: { nullable: true },
        },
    },

    birthday: {
        optional: {
            options: { nullable: true },
        },
        custom: {
            options: async (value, { req, location, path }) => {
                if (!isDate(value, config?.dobFormat))
                    return Promise.reject("Date of birth is invalid");
                if (moment().diff(moment(value, config?.dobFormat), 'years', false) < config.minAgeLimit)
                    return Promise.reject(`Minimum required age is ${config.minAgeLimit} years`);
                return Promise.resolve();
            }
        },
        customSanitizer: {
            options: (value, { req, location, path }) => {
                if (!isDate(value, config?.dobFormat))
                    return null;
                return moment(value, config?.dobFormat);
            }
        }
    },

    sex: {
        optional: {
            options: { nullable: true },
        },
        isIn: {
            options: [config.genderOptions],
            errorMessage: `Invalid sex specified, allowed options are ${config.genderOptions?.join(', ')}`,
        },

    },

    bio: {
        notEmpty: { errorMessage: "Bio cannot be empty" },
        isLength: {
            errorMessage: "bio should be  atleast 100 char long",
            options: { min: 100, max: 5000 },
        }
    },

    yearOfEstablishment: {
        optional: {
            options: { nullable: true },
        },
        custom: {
            options: async (value, { req, location, path }) => {
                if (!isDate(value, config?.yearFormat))
                    return Promise.reject("Date of birth is invalid");
                return Promise.resolve();
            }
        }
    },

    aboutBussiness: {
        optional: {
            options: { nullable: true }
        }
    }
};