export default {
  type: "object",
  properties: {
    status: {
      type: "string",
      pattern:
        "^(recebido|em_preparacao|pronto|finalizado)(,(recebido|em_preparacao|pronto|finalizado)){0,3}$",
    },
  },
  required: ["status"],
  additionalProperties: false,
};
