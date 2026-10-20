import { newPatientSchema } from "../utils/parseNewPatient.ts";
import { z } from 'zod';

export interface Patient extends NewPatient {
  id: string;
}

export type ConfidentialPatient = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof newPatientSchema>;

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];