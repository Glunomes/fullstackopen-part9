import patientsService from "../services/patientsService.ts";
import type { ConfidentialPatient, NewPatient, Patient} from "../types/patient.ts";
import express, { type Response, type Request, type NextFunction } from 'express';
import { newPatientSchema } from "../utils/parseNewPatient.ts";
import { z } from 'zod';

const router = express.Router();

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

router.get( '/', (_req, res: Response<ConfidentialPatient[]> ) => {
  res.send(patientsService.getConfedentialPatients());
});

router.post( '/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => { 
  const addedPatient = patientsService.addNewPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;