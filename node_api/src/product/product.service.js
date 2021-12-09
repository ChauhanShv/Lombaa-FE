const Product = require('./product.model');

class ProductService {

    async isSlugAvailable(slug) {
        try {
            return !(await Product.count({ where: { slug } }));
        } catch (error) {
            return null;
        }
    }
}

module.exports = ProductService;