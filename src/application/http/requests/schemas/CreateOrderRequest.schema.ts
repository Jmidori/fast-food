export default {
  type: "object",
  properties: {
    customerId: {
      type: "integer",
      minimum: 1,
    },
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: {
            type: "integer",
            minimum: 1,
          },
          quantity: {
            type: "integer",
            minimum: 1,
          },
        },
        required: ["productId", "quantity"],
        additionalProperties: false,
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ["customerId", "products"],
  additionalProperties: false,
};
