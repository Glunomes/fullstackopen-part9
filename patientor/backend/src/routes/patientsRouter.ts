/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsService from "../services/patientsService.ts";
import type { ConfedentialPatient, Patient, NewPatient } from "../types/patient.ts";
import express, { type Response, type Request } from 'express';

const router = express.Router();

router.get( '/', (_req, res: Response<ConfedentialPatient[]> ) => {
  res.send(patientsService.getConfedentialPatients());
});

router.post( '/', (req:Request<NewPatient>, res: Response<Patient>) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  
  const newPatient = patientsService.addNewPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.json(newPatient);
});

export default router;