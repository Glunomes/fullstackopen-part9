export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
}

export type ConfedentialPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;