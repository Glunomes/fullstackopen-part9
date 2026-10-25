import type { EntryType, EntryWithoutId, HealthCheckRating, Discharge } from "../types";

interface EntryFormData {
  entryType: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  healthCheckRating: HealthCheckRating;
  discharge: Discharge;
  employerName: string;
  sickLeave: { startDate: string; endDate: string };
}

export const createEntryPayload = (formData: EntryFormData): EntryWithoutId => {
  const diagnosis = formData.diagnosisCodes
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  const baseEntry = {
    description: formData.description,
    date: formData.date,
    specialist: formData.specialist,
    diagnosisCodes: diagnosis.length > 0 ? diagnosis : undefined,
  };

  switch (formData.entryType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: formData.healthCheckRating,
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: formData.discharge,
      };

    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: formData.employerName,
        sickLeave:
          formData.sickLeave.startDate && formData.sickLeave.endDate
            ? formData.sickLeave
            : undefined,
      };
  }
};