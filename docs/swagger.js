const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: 'Book-Addict-API',
            version: '1.0.0',
            description: 'REST API endpoints for Book Addict Project',
            servers: ["http://localhost:3000"],
        },
        basePath: '/api/v1',
    },

    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;