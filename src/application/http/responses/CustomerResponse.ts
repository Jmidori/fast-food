export class GetCustomerResponse {
  id: number;
  name: string;
  cpf: string;
  email: string;

  constructor(id: number, name: string, cpf: string, email: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }
}
