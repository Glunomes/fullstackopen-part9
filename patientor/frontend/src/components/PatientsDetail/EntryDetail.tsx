import type { Entry, Diagnosis } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const renderSpecificDetails = () => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{ border: "1px solid #050505", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
      <p>
        <strong>{entry.date}</strong> <i>({entry.type})</i>
      </p>
      <p><i> {entry.description} </i></p>

      {renderSpecificDetails()}

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((d) => (
            <li key={d}>
              {d} {diagnoses.find((diag) => diag.code === d)?.name}
            </li>
          ))}
        </ul>
      )}

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default EntryDetails;