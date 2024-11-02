import { Model, DataTypes, Optional } from "sequelize";
import getDataBaseConnection from "./DataBaseConnection";

type CustomerAttributes = {
  id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
};

type CustomerCreationAttributes = Optional<CustomerAttributes, "id">;

export default class CustomerModel extends Model<
  CustomerAttributes,
  CustomerCreationAttributes
> {}

CustomerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: getDataBaseConnection(),
    modelName: "customers",
  }
);
