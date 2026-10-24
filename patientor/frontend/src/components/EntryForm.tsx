import { SyntheticEvent, useState } from "react";
import { type Entry, type HealthCheckEntryWithoutId, HealthCheckRating } from "../types";
import patientService from "../services/patients";

interface Props {
  id: string | undefined;
  onNewEntry: (entry: Entry) => void;
};

const EntryForm = ({id, onNewEntry}: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  const isHealthCheckRating = (val: number): val is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(val as HealthCheckRating);
  };

  const onChangeRating = (value: string) => {
    const numericValue = Number(value);
    if(isHealthCheckRating(numericValue)) {
      setHealthCheckRating(numericValue);
    }
  };

  const handleEvent = async(event: SyntheticEvent) => {
    event.preventDefault();

    if(!id) return;

    const diagnosis = diagnosisCodes
      .split(',')
      .map(code => code.trim())
      .filter(code => code.length > 0);

    const entryObject: HealthCheckEntryWithoutId = {
      type: "HealthCheck" as const,
      date,
      description,
      specialist,
      diagnosisCodes:diagnosis,
      healthCheckRating
    };

    try {
      const newEntry = await patientService.addEntry(id, entryObject);
      onNewEntry(newEntry);

      setDate('');
      setDescription('');
      setDiagnosisCodes('');
      setSpecialist('');
      setHealthCheckRating(0);
    } catch(e:unknown) {
      console.error(e);
    }
  };
  return (
    <div>
      <h2>New HealthCheck Entry</h2>
      <form onSubmit={handleEvent}>
        <div>
          Date:<input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          Description:<input type="text" value={description} onChange={({target}) => setDescription(target.value)} />
        </div>
        <div>
          Specialists:<input type="text" value={specialist} onChange={({target}) => setSpecialist(target.value)}/>
        </div>
        <div>
          Health Check Raiting (0-3):<input type="text" value={healthCheckRating} onChange={({target}) => onChangeRating(target.value)} />
        </div>
        <div>
          Diagnosis Codes (comma-separated):<input type="text" value={diagnosisCodes} onChange={({target}) => setDiagnosisCodes(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EntryForm;