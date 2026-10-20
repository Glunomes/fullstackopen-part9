import data from '../data/patients.ts';
import type { Patient, ConfedentialPatient, NewPatient } from '../types/patient.ts';
import {v1 as uuid} from 'uuid';

const getAllPatients = (): Patient[] => {
  return data;
};

const getConfedentialPatients = (): ConfedentialPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = {
  id: uuid(),
  ...patient
  };
  data.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getConfedentialPatients,
  addNewPatient,
};