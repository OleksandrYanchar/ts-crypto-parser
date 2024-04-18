import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto Parser API',
      version: '1.0.0',
      description: 'This API fetches and stores cryptocurrency data from CoinMarketCap based on provided or default coin short names.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // adjust the path as needed
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
