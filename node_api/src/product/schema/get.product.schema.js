module.exports = {
    id: {
        notEmpty: {
            errorMessage: "Product id is required"
        },
        in: ['params']
    }
}