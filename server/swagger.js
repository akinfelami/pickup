const  swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description:
            "Documentation For the <b>Pickup</b> API.",
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header", // can be "header", "query" or "cookie"
            name: "X-API-KEY", // name of the header, query parameter or cookie
            description: "any description...",
        },
    },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);