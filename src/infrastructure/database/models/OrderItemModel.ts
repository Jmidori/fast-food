import { Model, DataTypes, Optional } from "sequelize";

import ProductModel from "./ProductModel";
import getDataBaseConnection from "./DataBaseConnection";

type OrderItemAttributes = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
};

type OrderItemCreationAttributes = Optional<OrderItemAttributes, "id">;

export default class OrderItemModel extends Model<
  OrderItemAttributes,
  OrderItemCreationAttributes
> {}

OrderItemModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "RESTRICT",
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "RESTRICT",
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: getDataBaseConnection(),
    modelName: "order_items",
  }
);

// [1-N] Products - Order Items
ProductModel.hasMany(OrderItemModel, {
  foreignKey: "product_id",
  as: "product",
});

OrderItemModel.belongsTo(ProductModel, {
  foreignKey: "product_id",
  as: "product",
});
