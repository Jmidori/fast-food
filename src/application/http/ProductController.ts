import { Request, Response, Router } from "express";
import { Product } from "../../domain/entities/Product";
import ProductAdapter from "../../adapters/ProductAdapter";
import validateBodyRequestSchema from "./midlewares/BodyRequestValidation";
import IProductRepository from "../../domain/interfaces/IProductRepository";
import { CreateProductRequest, PatchProductRequest } from "./requests/ProductRequest";
import CreateProductRequestSchema from "./requests/schemas/CreateProductRequest.schema";
import GetProductsByCategoryRequest from "./requests/schemas/GetProductsByCategoryRequest.schema";
import PatchProductRequestSchema from "./requests/schemas/PatchProductRequestSchema.schema";
import ProductRepository from "../../infrastructure/database/repositories/ProductRepository";
import validateQueryRequestSchema from "./midlewares/QueryRequestValidation";

const router = Router();
const productAdapter = new ProductAdapter();
const productRepository: IProductRepository = new ProductRepository(
  productAdapter
);

router.get("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productRepository.findById(Number(id));
  if (product) {
    res.status(200).json(productAdapter.domainToGetProductResponse(product));
  } else res.sendStatus(404);
});

router.get(
  "/products/",
  validateQueryRequestSchema(GetProductsByCategoryRequest),
  async (req: Request, res: Response) => {
    const { category } = req.query;
    const products = await productRepository.findByCategory(category as string);
    res
      .status(200)
      .json(productAdapter.domainArrayToGetProductArrayResponse(products));
  }
);

router.post(
  "/products/",
  validateBodyRequestSchema(CreateProductRequestSchema),
  async (req: Request, res: Response) => {
    const createProductRequest = req.body as CreateProductRequest;
    const newProduct =
      productAdapter.createProductRequestToDomain(createProductRequest);
    const savedProduct = await productRepository.create(newProduct);
    res
      .status(200)
      .json(productAdapter.domainToGetProductResponse(savedProduct));
  }
);
router.patch(
  "/products/:id",
  validateBodyRequestSchema(PatchProductRequestSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const patchProductRequest = req.body as PatchProductRequest;

    const foundProduct = await productRepository.findById(Number(id));
    if (foundProduct === null) {
      res.status(404).json({ message: "product não encontrado" });
      return;
    }

    const patchedProduct = productAdapter.patchProductWithRequest(
      foundProduct,
      patchProductRequest
    );
    const productUpdated = await productRepository.update(patchedProduct);

    res
      .status(200)
      .json(
        productAdapter.domainToGetProductResponse(productUpdated as Product)
      );
  }
);

router.delete("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundProduct = await productRepository.findById(Number(id));
  if (foundProduct === null) {
    res.status(404).json({ message: "product não encontrado" });
    return;
  }

  await productRepository.delete(Number(id));
  res.status(204).end();
});

export default router;
