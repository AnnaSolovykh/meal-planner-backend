const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Meals PLanner',
    description: 'Daily Meals Options',
  },
  host: ['https://meal-planner-2qb0.onrender.com/api/v1'],
  //host:  ["http://localhost:4000/api/v1/"],
  schemes: ['https'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          "Enter your bearer token in the format **&lt;token&gt;**. Do not include 'Bearer' or any other prefixes; only the token itself.",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/auth.js', './routes/meal.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js');
});
