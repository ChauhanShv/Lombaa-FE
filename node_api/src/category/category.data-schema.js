module.exports = {
    name: {
        custom: {
            options: (value, { req, location, path }) => {
                if (req?.body?.accountType === "standard" && (value ?? "") === "")
                    return Promise.reject("Name is required");
                return Promise.resolve();
            },
        },
    }
}