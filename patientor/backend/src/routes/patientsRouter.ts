import patientsService from "../services/patientsService.ts";
import type { ConfidentialPatient} from "../types/patient.ts";
import express, { type Response} from 'express';
import parseNewPatient from "../utils/parseNewPatient.ts";

const router = express.Router();

router.get( '/', (_req, res: Response<ConfidentialPatient[]> ) => {
  res.send(patientsService.getConfedentialPatients());
});

router.post( '/', (req, res) => { 
  try{
    const parsedPatient = parseNewPatient(req.body);
    const addedPatient = patientsService.addNewPatient(parsedPatient);
    res.json(addedPatient);
  } catch(error: unknown) {
    if(error instanceof Error) {
      res.status(400).send(`Something went wrong. Error: ${error.message}`);
    }
  }
});

export default router;