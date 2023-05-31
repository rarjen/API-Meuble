require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const { PORT } = process.env;

const app = express();

const notFoundMiddleware = require("./middlewares/not-found");
const handleErrorMiddlware = require("./middlewares/handle-error");

app.use(morgan("dev"));
app.use(express.json()); // read body type json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(notFoundMiddleware);
app.use(handleErrorMiddlware);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
