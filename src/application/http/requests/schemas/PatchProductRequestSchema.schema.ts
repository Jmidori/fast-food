export default {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 15,
    },
    category: {
      type: "string",
      enum: ["lanche", "acompanhamento", "bebida", "sobremesa", "outros"],
    },
    price: {
      type: "number",
      minimum: 0.01,
      maximum: 1000,
    },
    description: {
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    available: {
      type: "boolean",
      default: false,
    },
    image: {
      type: "string",
      contentEncoding: "base64",
      description: "Image in base64 format or null if not available",
    },
  },
  additionalProperties: false,
};
