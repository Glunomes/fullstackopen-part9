import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcare = ({entry}: {entry: OccupationalHealthcareEntry}) => {
  return (
  <div>
    <p>Employer: {entry.employerName}</p>
    {entry.sickLeave && (
      <p>
        Sick leave: {entry.sickLeave.startDate} — {entry.sickLeave.endDate}
      </p>
    )}
  </div>
  );
};

export default OccupationalHealthcare;