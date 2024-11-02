import { Model, DataTypes, Optional } from "sequelize";

import getDataBaseConnection from "./DataBaseConnection";

type ProductAttributes = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  available: boolean;
  image: Buffer | null;
  deletedAt: Date | null;
};

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export default class ProductModel extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: getDataBaseConnection(),
    modelName: "products",
  }
);
