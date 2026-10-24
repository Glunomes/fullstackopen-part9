import { useParams } from "react-router-dom";
import {type Patient, type Diagnosis, type Entry } from "../types";
import patientService from '../services/patients';
import { useState, useEffect } from "react";
import EntryDetail from "./PatientsDetail/EntryDetail";
import EntryForm from "./EntryForm";

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

  const handleNewEntry = (entry: Entry) => {
    if (patient) {
      setPatient({
        ...patient,
        entries: patient.entries.concat(entry)
      });
    }
  };

  const showEntries = (entries: Patient['entries']) => {
    return ( 
      <div>
        {entries.map(e => (
          <div key={e.id}>
            <EntryDetail entry={e} diagnoses={diagnoses} />
          </div>
        ))}
        <EntryForm id={id} onNewEntry={handleNewEntry} />
      </div>
    );
  };

  return (
    <div>
      <h2>{patient.name} ({patient.gender})</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <div>{showEntries(patient.entries)}</div>
    </div>
  );
};

export default PatientPage;