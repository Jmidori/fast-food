import { Request, Response, Router } from "express";
import CustomerAdapter from "../../adapters/CustomerAdapter";
import validateBodyRequestSchema from "./midlewares/BodyRequestValidation";
import CreateCustomerRequest from "./requests/CustomerRequest";
import ICustomerRepository from "../../domain/interfaces/ICustomerRepository";
import CreateCustomerRequestSchema from "./requests/schemas/CreateCustomerRequest.schema";
import CustomerRepository from "../../infrastructure/database/repositories/CustomerRepository";

const router = Router();

const customerAdapter = new CustomerAdapter();
const customerRepository: ICustomerRepository = new CustomerRepository(
  customerAdapter
);

router.get("/customers/:cpf", async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const customer = await customerRepository.findByCpf(cpf);
  if (customer) {
    res.status(200).json(customerAdapter.domainToGetCustomerResponse(customer));
  } else res.sendStatus(404);
});

router.post(
  "/customers/",
  validateBodyRequestSchema(CreateCustomerRequestSchema),
  async (req: Request, res: Response) => {
    const createCustomerRequest = req.body as CreateCustomerRequest;
    const newCustomer = customerAdapter.createCustomerRequestToDomain(
      createCustomerRequest
    );

    const currentCustomer = await customerRepository.findByCpf(newCustomer.cpf);
    if (currentCustomer) {
      res
        .status(409)
        .json({ message: "já existe um customer com o CPF informado" });
    } else {
      const savedCustomer = await customerRepository.create(newCustomer);
      res.status(201).json(customerAdapter.domainToGetCustomerResponse(savedCustomer));
    }
  }
);

export default router;
