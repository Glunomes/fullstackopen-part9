import z from "zod";
import { newPatientSchema, entryWithoutIdSchema } from "../utils/schema.ts";
import { type Response, type Request, type NextFunction } from 'express';

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    return res.status(400).send({ error: error.issues });
  }
  if(error instanceof Error) {
    return res.status(400).json({error: error.message});
  } 
  return next(error);
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch(error:unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res:Response, next: NextFunction) => {
  try {
    entryWithoutIdSchema.parse(req.body);
    next();
    } catch(error:unknown) {
    next(error);
  }
};

export default {
  errorMiddleware,
  newPatientParser,
  newEntryParser,
};