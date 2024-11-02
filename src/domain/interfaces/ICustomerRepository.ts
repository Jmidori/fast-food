import Customer from "../entities/Customer";

export default interface ICustomerRepository {
  findById(id: number): Promise<Customer | null>;
  findByCpf(cpf: string): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
}
