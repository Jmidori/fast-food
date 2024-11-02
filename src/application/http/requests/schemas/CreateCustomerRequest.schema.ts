export default {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
    },
    lastName: {
      type: "string",
      minLength: 1,
    },
    cpf: {
      type: "string",
      minLength: 11,
      maxLength: 11,
    },
    email: {
      type: "string",
      format: "email",
    },
  },
  required: ["firstName", "lastName", "cpf", "email"],
  additionalProperties: false,
};
