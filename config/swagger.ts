import { Express } from "express-serve-static-core";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A NodeJS Backend",
      description: "API endpoints for a NodeJS Project, documented on swagger",
      contact: {
        name: "M Babar Waseem",
        email: "mbabarwaseem@gmail.com",
      },
      version: "1.0.0",
    },
  },
  apis: ["./routes/user.route.ts"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app: Express, port: string | number) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
