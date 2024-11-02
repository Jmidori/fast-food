import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import customerRouter from "./application/http/CustomerController";
import productRouter from "./application/http/ProductController";
import orderRouter from "./application/http/OrderController";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("Fast Food  service!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(customerRouter);
app.use(productRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
