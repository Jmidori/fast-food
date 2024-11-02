import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER || "admin";
const DB_PWD = process.env.DB_PWD || "1qaz";
const DB_NAME = process.env.DB_NAME || "fiap_fast_food";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "5432";

export default function getDataBaseConnection() {
  return new Sequelize(
    `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  );
}
