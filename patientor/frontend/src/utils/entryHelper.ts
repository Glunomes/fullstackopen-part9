import type { EntryType, EntryWithoutId, HealthCheckRating, Discharge, Diagnosis } from "../types";

interface EntryFormData {
  entryType: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis['code']>;
  healthCheckRating: HealthCheckRating;
  discharge: Discharge;
  employerName: string;
  sickLeave: { startDate: string; endDate: string };
}

export const createEntryPayload = (formData: EntryFormData): EntryWithoutId => {
  const baseEntry = {
    description: formData.description,
    date: formData.date,
    specialist: formData.specialist,
    diagnosisCodes: formData.diagnosisCodes.length > 0 ? formData.diagnosisCodes : undefined,
  };

  switch (formData.entryType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: formData.healthCheckRating,
      };

    case 'Hospital': {
      const { date, criteria } = formData.discharge ?? {};

      if (!date?.trim() || !criteria?.trim()) {
        throw new Error('For entry discharge fields must be both filled or both empty');
      }

      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: formData.discharge,
      };
    }

    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: formData.employerName,
        sickLeave:
          formData.sickLeave?.startDate && formData.sickLeave?.endDate
            ? formData.sickLeave
            : undefined,
      };

    default:
      throw new Error(`Unhandled entry type: ${(formData as { entryType: string }).entryType}`);
  }
};