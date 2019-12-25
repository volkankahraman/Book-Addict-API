const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Book-Addict-API',
            version: '1.0.0',
            description: 'REST API endpoints for Book Addict Project',
            servers: ["http://localhost:3000"],
        },
        basePath: '/api/v1',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;