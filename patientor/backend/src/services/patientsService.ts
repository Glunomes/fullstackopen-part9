import data from '../data/patients.ts';
import type { Patient, ConfedentialPatient } from '../types/patient.ts';

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

export default {
  getAllPatients,
  getConfedentialPatients,
};