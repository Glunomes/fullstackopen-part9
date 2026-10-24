import { z } from 'zod';

import {
  genderSchema,
  newPatientSchema,
  HealthCheckRating,
  entryWithoutIdSchema,
} from '../utils/schema.ts';

export { HealthCheckRating };
export type Gender = z.infer<typeof genderSchema>;
export type NewPatient = z.infer<typeof newPatientSchema>;
export type EntryWithoutId = z.infer<typeof entryWithoutIdSchema>;

export type Entry = EntryWithoutId & {
  id: string;
};

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;