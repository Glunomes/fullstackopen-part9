import z from "zod";
import { newPatientSchema } from "../utils/parseNewPatient.ts";
import { type Response, type Request, type NextFunction } from 'express';


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch(error:unknown) {
    next(error);
  }
};

export default {
  errorMiddleware,
  newPatientParser,
};