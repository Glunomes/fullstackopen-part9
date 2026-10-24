import data from '../data/patients.ts';
import type { Patient, NonSensitivePatient , NewPatient, Entry, EntryWithoutId } from '../types/patient.ts';
import {v1 as uuid} from 'uuid';

const getAllPatients = (): Patient[] => {
  return data;
};

const getConfedentialPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = {
  id: uuid(),
  entries: [],
  ...patient
  };
  data.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = data.find(d => d.id === id);
  return patient;
};

const addEntries = (patientId:string, entry: EntryWithoutId): Entry => {
  const patient = data.find(d => d.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllPatients,
  getConfedentialPatients,
  addNewPatient,
  getPatient,
  addEntries,
};