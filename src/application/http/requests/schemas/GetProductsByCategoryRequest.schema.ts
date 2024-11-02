export default {
    type: "object",
    properties: {
        category: {
            type: "string",
            enum: ["lanche", "acompanhamento", "bebida", "sobremesa", "outros"],
        },
    },
    required: ["category"],
    additionalProperties: false,
};