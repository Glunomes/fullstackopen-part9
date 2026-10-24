import type{ HospitalEntry } from "../../types";

const Hospital = ({entry}: {entry:HospitalEntry}) => {
  return (
    <div>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default Hospital;