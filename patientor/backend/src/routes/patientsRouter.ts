import middleware from "../middleware/middleware.ts";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatient, NewPatient, Patient} from "../types/patient.ts";
import express, { type Response, type Request } from 'express';

const router = express.Router();

router.get( '/', (_req, res: Response<NonSensitivePatient[]> ) => {
  return res.send(patientsService.getConfedentialPatients());
});

router.post( '/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => { 
  const addedPatient = patientsService.addNewPatient(req.body);
  return res.json(addedPatient);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    return res.json(patient);
  }
  return res.status(400).send({ error: 'Patient not found' });
});

router.use(middleware.errorMiddleware);

export default router;