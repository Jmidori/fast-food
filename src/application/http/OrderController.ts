import { Request, Response, Router } from "express";
import OrderAdapter from "../../adapters/OrderAdapter";
import ProductAdapter from "../../adapters/ProductAdapter";
import CustomerAdapter from "../../adapters/CustomerAdapter";
import OrderItemsBuilder from "../../builders/OrderItemsBuilder";
import IOrderRepository from "../../domain/interfaces/IOrderRepository";
import validateBodyRequestSchema from "./midlewares/BodyRequestValidation";
import IProductRepository from "../../domain/interfaces/IProductRepository";
import validateQueryRequestSchema from "./midlewares/QueryRequestValidation";
import ICustomerRepository from "../../domain/interfaces/ICustomerRepository";
import { CreateOrderRequest, PatchOrderRequest } from "./requests/OrderRequest";
import { Order, OrderStatus, PaymentMethod } from "../../domain/entities/Order";
import PatchOrderRequestSchema from "./requests/schemas/PatchOrderRequest.schema";
import CreateOrderRequestSchema from "./requests/schemas/CreateOrderRequest.schema";
import GetOrdersByStatusRequest from "./requests/schemas/GetOrdersByStatusRequest.schema";
import OrderRepository from "../../infrastructure/database/repositories/OrderRepository";
import ProductRepository from "../../infrastructure/database/repositories/ProductRepository";
import CustomerRepository from "../../infrastructure/database/repositories/CustomerRepository";

const router = Router();

const customerAdapter = new CustomerAdapter();
const customerRepository: ICustomerRepository = new CustomerRepository(
  customerAdapter
);

const productAdapter = new ProductAdapter();
const productRepository: IProductRepository = new ProductRepository(
  productAdapter
);

const orderItemBuilder = new OrderItemsBuilder();

const orderAdapter = new OrderAdapter(customerAdapter, productAdapter);
const orderRepository: IOrderRepository = new OrderRepository(orderAdapter);

router.get(
  "/orders/",
  validateQueryRequestSchema(GetOrdersByStatusRequest),
  async (req: Request, res: Response) => {
    const { status } = req.query;
    const orders = await orderRepository.findAllByStatus(
      (status as string).split(",") as OrderStatus[]
    );
    res
      .status(200)
      .json(
        orders.map((order) => orderAdapter.domainToGetOrderResponse(order))
      );
  }
);

router.post(
  "/orders/",
  validateBodyRequestSchema(CreateOrderRequestSchema),
  async (req: Request, res: Response) => {
    const createOrderRequest = req.body as CreateOrderRequest;

    let customer = null;
    if (createOrderRequest.customerId) {
      customer = await customerRepository.findById(
        createOrderRequest.customerId
      );
      if (customer === null) {
        res.status(404).json({ message: "customer não encontrado" });
        return;
      }
    }

    const products = await productRepository.findAllByIds(
      createOrderRequest.products.map(
        (createOrderRequestItem) => createOrderRequestItem.productId
      )
    );
    if (products.length != createOrderRequest.products.length) {
      res.status(404).json({ message: "product não encontrado" });
      return;
    }

    const orderItems = orderItemBuilder.buildForCreate(
      createOrderRequest,
      products
    );

    const newOrder = new Order(
      OrderStatus.Recebido,
      PaymentMethod.QRCODE,
      new Date(),
      customer,
      orderItems
    );
    const orderSaved = await orderRepository.create(newOrder);

    res
      .status(200)
      .json(orderAdapter.domainToGetOrderResponse(orderSaved as Order));
  }
);

router.patch(
  "/orders/:id",
  validateBodyRequestSchema(PatchOrderRequestSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body as PatchOrderRequest;

    const order = await orderRepository.findById(+id);
    if (order === null) {
      res.status(404).json({ message: "order não encontrado" });
      return;
    }

    order.setStatus(status as OrderStatus);
    const orderUpdated = await orderRepository.update(order);

    res
      .status(200)
      .json(orderAdapter.domainToGetOrderResponse(orderUpdated as Order));
  }
);

export default router;
