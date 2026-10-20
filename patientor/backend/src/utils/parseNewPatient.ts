import { Gender } from "../types/patient.ts";
import type { NewPatient } from "../types/patient.ts";

const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorect or missing name');
  }
  return name;
};

const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if(!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (input: string): input is Gender => {
  return (Object.values(Gender) as string []).includes(input);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseNewPatient = (personObj: unknown): NewPatient => {
  if(!personObj || typeof personObj !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in personObj && 'dateOfBirth' in personObj && 'ssn' in personObj && 'gender' in personObj && 'occupation' in personObj) {
    const newPatient: NewPatient = {
      name: parseName(personObj.name),
      dateOfBirth: parseDate(personObj.dateOfBirth),
      ssn: parseSsn(personObj.ssn),
      gender: parseGender(personObj.gender),
      occupation: parseOccupation(personObj.occupation)
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing or incorrect');
};

export default parseNewPatient;