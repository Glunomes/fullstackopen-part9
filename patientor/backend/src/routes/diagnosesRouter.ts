import diagnoseService from '../services/diagnosesService.ts';
import express, { type Response } from 'express';
import type { Diagnose } from '../types/diagnoses.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnoseService.getAllDiagnoses());
});

export default router;