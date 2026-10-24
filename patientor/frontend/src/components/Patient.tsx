import { useParams } from "react-router-dom";
import {type Patient, type Diagnosis } from "../types";
import patientService from '../services/patients';
import { useState, useEffect } from "react";

interface Props {
  diagnoses: Diagnosis[],
}

const PatientPage = ({ diagnoses }: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async() => {
      try {
        if (!id) return;
        const patient = await patientService.getPatient(id);
        setPatient(patient);
    } catch(e) {
      console.error('Error loading patient', e);
    }
  };
    fetchPatient();
  }, [id]);

  if(!patient) {
    return <h2>Loading or no patient data found...</h2>;
  }

  const showEntries = (entries: Patient['entries']) => {
    return entries.map(e => (
      <div key={e.id}>
        <p>{e.date} <i>{e.description}</i></p>
        <ul>
          {e.diagnosisCodes?.map(d => (
            <li key={d}>
              {d} {diagnoses.find( diagnose => diagnose.code === d)?.name}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div>
      <h2>{patient.name} ({patient.gender})</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      <div>{showEntries(patient.entries)}</div>
    </div>
  );
};

export default PatientPage;