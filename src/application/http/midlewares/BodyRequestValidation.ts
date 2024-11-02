import { Request, Response, NextFunction } from "express";

import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export default function validateBodyRequestSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema);
    const isValid = validate(req.body);

    if (!isValid) {
      res.status(412).json({
        erros: validate.errors,
      });
    } else next();
  };
}
