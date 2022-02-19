module.exports = {
    limit: {
        optional: {
            options: { nullable: true },
        },
        in: ['query'],
        isInt: true,
        customSanitizer: {
            options: (value, { req, location, path }) => {
                if (isNaN(value)) return 0;
                if (value < 0) return 0;
                if (value > 50) return 50;
                value = parseInt(value)
                return value;
            },
        }
    },

    offset: {
        optional: {
            options: { nullable: true }
        },
        in: ['query'],
        isInt: true,
        customSanitizer: {
            options: (value, { req, location, path }) => {
                if (isNaN(value)) return 0;
                if (value < 0) return 0;
                if (value > 50) return 50;
                value = parseInt(value)
                return value
            }
        }
    }
}