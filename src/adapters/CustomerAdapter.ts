import Customer from "../domain/entities/Customer";
import CustomerModel from "../infrastructure/database/models/CustomerModel";
import CreateCustomerRequest from "../application/http/requests/CustomerRequest";
import { GetCustomerResponse } from "../application/http/responses/CustomerResponse";

export default class CustomerAdapter {
  domainToGetCustomerResponse(customer: Customer): GetCustomerResponse {
    const { id, firstName, lastName, cpf, email } = customer;
    return new GetCustomerResponse(
      id as number,
      `${firstName} ${lastName}`,
      cpf,
      email
    );
  }

  createCustomerRequestToDomain(
    createCustomerRequest: CreateCustomerRequest
  ): Customer {
    const { firstName, lastName, cpf, email } = createCustomerRequest;
    return new Customer(null, firstName, lastName, cpf, email);
  }

  modelToDomain(customerModel: CustomerModel) {
    const { id, first_name, last_name, cpf, email } = customerModel.dataValues;
    return new Customer(id, first_name, last_name, cpf, email);
  }
}
