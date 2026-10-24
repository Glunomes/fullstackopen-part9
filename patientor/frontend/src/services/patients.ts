import axios from "axios";
import type { HealthCheckEntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatient = async (id: string) => {
  const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return patient.data;
};

const addEntry = async (id:string, entry: HealthCheckEntryWithoutId) => {
  const newEntry = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return newEntry.data;
};

export default {
  getAll, 
  create, 
  getPatient,
  addEntry,
};

