import patientsService from "../services/patientsService.ts";
import type { ConfedentialPatient } from "../types/patient.ts";
import express, { type Response } from 'express';

const router = express.Router();

router.get( '/', (_req, res: Response<ConfedentialPatient[]> ) => {
  res.send(patientsService.getConfedentialPatients());
});

export default router;