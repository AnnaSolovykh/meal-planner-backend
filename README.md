# Meal PLanner Project

Demo: [Meal Planner](https://meal-planner-front.vercel.app)
<br/>
[Swagger Documentation](https://meal-planner-2qb0.onrender.com/api-docs)

## Project Title: Meal PLanner

### Description:
MMeal Planner showcases the integration of TypeScript with Node.js in creating a full-stack application for fetching meals and saving them in a recipe book. 
<br/>
This backend serves as the core infrastructure for the Meal Planner application, facilitating secure and efficient data management, authentication, and API services. Built with Express.js and MongoDB.
<br/>
For more details about the backend features [visit the frontend repository](https://github.com/AnnaSolovykh/meal-planner-front).

### Key Features:
+ **User Authentication**: Secure login and registration process using bcryptjs for password hashing and jsonwebtoken for session management.
+ **Session Management**: Utilizes express-session with connect-mongodb-session for persistent user sessions stored in MongoDB.
+ **Rate Limiting**: Protects against brute-force attacks using express-rate-limit.
+ **Data Validation & Security**: Incorporates xss-clean for input sanitization to prevent Cross-Site Scripting (XSS) attacks and hpp to guard against HTTP Parameter Pollution, bolstering the API's security posture.
+ **API Documentation**: Features auto-generated, comprehensive API documentation with swagger-autogen and swagger-ui-express, facilitating easier integration and testing for developers.
+ **Scheduled Tasks**: Manages background tasks like database cleanup with node-cron.


### Technologies Used:
+ **xpress.js**: Core framework for handling HTTP requests and structuring the web application.
+ **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
+ **Cors**: Enables Cross-Origin Resource Sharing (CORS), allowing the API to securely manage requests from different origins.
+ **Helmet**: Automatically secures your Express apps by setting various HTTP headers.
+ **XSS-Clean**: Ensures user input is sanitized, protecting against XSS attacks and enhancing application security.
+ **Dotenv**: Manages environment variables for configuring the application in different environments.
+ **Bcryptjs & JsonWebToken (JWT)**: Together, they strengthen the application's security by securely hashing user passwords and enabling secure information transmission.
+ **Express-Session & Connect-MongoDB-Session**: Together, they manage user sessions, enhancing authentication mechanisms by storing session data in MongoDB.
+ **Express-Rate-Limit & HPP (HTTP Parameter Pollution)**: These protect the application from common attack vectors like brute-force attacks and HTTP parameter pollution.
+ **Express-Async-Errors**: Simplifies error handling in asynchronous Express routes, improving code readability and maintainability.
+ **Http-Status-Codes**: Facilitates clear communication of HTTP response statuses, improving the developer experience and debuggability.
+ **Node-Cron**: Automates scheduled tasks, contributing to the application's overall efficiency and functionality.
+ **Nodemon**: Used in development for automatic server restarts upon code changes.
+ **ESLint & Prettier**: Ensures code quality and stylistic consistency across the project.
+ **Swagger Tools**: For documentation and testing of the API endpoints in a user-friendly interface.
