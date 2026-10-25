import { useState, SyntheticEvent } from "react";
import type { Discharge, Entry, EntryType } from "../../types";
import { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
import BaseEntryFields from "./BaseEntryFields";
import EntryHealthCheckForm from "./EntryHealthCheckForm";
import { createEntryPayload } from "../../utils/entryHelper";
import EntryOccupationalHealthCareForm from "./EntryOccupationalHealthCareForm";
import EntryHospitalForm from "./EntryHospitalForm";

interface Props {
  id: string | undefined;
  onNewEntry: (entry: Entry) => void;
}

const EntryForm = ({ id, onNewEntry }: Props) => {

  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');

  // general useState
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

  // HealthCheck component`s useState
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  // Hospital component`s useState
  const [discharge, setDischarge] = useState<Discharge>({ date: '', criteria: '' });

  // Occupational HealthCare component`s useState
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });

  const handleEvent = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;

    const entryObject = createEntryPayload({
      entryType,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      discharge,
      employerName,
      sickLeave,
    });

    try {
      const newEntry = await patientService.addEntry(id, entryObject);
      onNewEntry(newEntry);

      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosisCodes('');
      setHealthCheckRating(0);
      setDischarge({date: '', criteria: ''});
      setEmployerName('');
      setSickLeave({ startDate: '', endDate: '' });

    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>New Entry</h2>
      
      <div>
        <label>Entry type: </label>
        <select 
          value={entryType}
          onChange={(e) => setEntryType(e.target.value as EntryType)}  
        >
          <option value='HealthCheck'>Health Check</option>
          <option value='OccupationalHealthcare'>Occupational Healthcare</option>
          <option value='Hospital'>Hospital</option>
        </select>
      </div>

      <form onSubmit={handleEvent}>
        <BaseEntryFields
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />

        {entryType === 'HealthCheck' && (
          <EntryHealthCheckForm 
            healthCheckRating={healthCheckRating} 
            setHealthCheckRating={setHealthCheckRating} 
          />
        )}

        {entryType === 'OccupationalHealthcare' && (
          <EntryOccupationalHealthCareForm 
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}

        {entryType === 'Hospital' && (
          <EntryHospitalForm 
            discharge={discharge}
            setDischarge={setDischarge}
          />
        )}
        
        <button type="submit" >Create</button>
      </form>
    </div>
  );
};

export default EntryForm;