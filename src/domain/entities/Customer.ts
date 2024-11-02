export default class Customer {
  id: number | null;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;

  constructor(
    id: number | null,
    firstName: string,
    lastName: string,
    cpf: string,
    email: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
    this.email = email;
  }
}
