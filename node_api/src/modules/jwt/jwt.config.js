require('jsonwebtoken');

module.exports = {
    jwtSecret: process.env.JWT_SECRET || `ZA5wNuI/e8jql/lg8ZioGrCfFeJ6o8ay+n3dIdm2X8njV/vR1vsNe8GqzUYJIjnQtRjddVwANlbCj/ynBvWuuQ==`,
};