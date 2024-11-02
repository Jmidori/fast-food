import Customer from "../../../domain/entities/Customer";
import CustomerModel from "../models/CustomerModel";
import CustomerAdapter from "../../../adapters/CustomerAdapter";
import ICustomerRepository from "../../../domain/interfaces/ICustomerRepository";

export default class CustomerRepository implements ICustomerRepository {
  customerAdapter: CustomerAdapter;

  constructor(customerAdapter: CustomerAdapter) {
    this.customerAdapter = customerAdapter;
  }

  async findById(id: number): Promise<Customer | null> {
    const customerModel = await CustomerModel.findByPk(id);
    if (customerModel) {
      return this.customerAdapter.modelToDomain(customerModel);
    }

    return null;
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customerModel = await CustomerModel.findOne({ where: { cpf: cpf } });
    if (customerModel) {
      return this.customerAdapter.modelToDomain(customerModel);
    }

    return null;
  }

  async create(customer: Customer): Promise<Customer> {
    const { firstName, lastName, cpf, email } = customer;
    const customerModel = await CustomerModel.create({
      first_name: firstName,
      last_name: lastName,
      cpf,
      email,
    });

    return this.customerAdapter.modelToDomain(customerModel);
  }
}
