import type { Discharge } from "../../types";

interface Props {
  discharge: Discharge;
  setDischarge: (discharge: Discharge) => void
};

const EntryHospitalForm = ({discharge, setDischarge}: Props) => {

  return (
    <div>
      <div>
        <label>Discharge Date: </label>
        <input 
          type="date"
          value={discharge.date}
          onChange={({target}) => setDischarge({...discharge, date: target.value})}
        />
      </div>
      <div>
        <label>Discharge Criteria: </label>
        <input 
          type="text"
          value={discharge.criteria}
          onChange={({target}) => setDischarge({...discharge, criteria: target.value})}
        />
      </div>
    </div>
  );
};

export default EntryHospitalForm;