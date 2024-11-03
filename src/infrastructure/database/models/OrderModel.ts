import { DataTypes, Model, Optional } from "sequelize";
import CustomerModel from "./CustomerModel";
import OrderItemModel from "./OrderItemModel";
import getDataBaseConnection from "./DataBaseConnection";

type OrderAttributes = {
  id: number;
  customer_id: number | null;
  status: string;
  total: number;
  order_number: string;
  payment_method: string;
};

type OrderCreationAttributes = Optional<OrderAttributes, "id">;

export default class OrderModel extends Model<
  OrderAttributes,
  OrderCreationAttributes
> { }

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
      onDelete: "RESTRICT",
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["recebido", "em_preparacao", "pronto", "finalizado"],
      allowNull: false,
      defaultValue: "recebido",
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    order_number: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize: getDataBaseConnection(),
    modelName: "orders",
  }
);

// [1-N] Customer - Order
CustomerModel.hasMany(OrderModel, {
  foreignKey: "customer_id",
  as: "customer",
});

OrderModel.belongsTo(CustomerModel, {
  foreignKey: "customer_id",
  as: "customer",
});

// [1-N] Order - Order Items
OrderModel.hasMany(OrderItemModel, {
  foreignKey: "order_id",
  as: "order_items",
});

OrderItemModel.belongsTo(OrderModel, {
  foreignKey: "order_id",
  as: "order_items",
});
