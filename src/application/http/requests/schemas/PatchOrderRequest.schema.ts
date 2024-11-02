export default {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["recebido", "em_preparacao", "pronto", "finalizado"],
    },
  },
  required: ["status"],
  additionalProperties: false,
};
