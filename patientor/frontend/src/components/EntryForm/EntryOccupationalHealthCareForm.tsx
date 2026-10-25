interface SickLeave {
  startDate: string,
  endDate: string
}

interface Props {
  employerName: string;
  setEmployerName: (employerName: string) => void;
  sickLeave: SickLeave;
  setSickLeave: (sickLeave: SickLeave) => void;
}

const EntryOccupationalHealthCareForm = ({employerName, setEmployerName, sickLeave, setSickLeave}: Props) => {

  return (
  <div>
    <div>
      <label>Employer Name: </label>
      <input 
        type="text"
        value={employerName} 
        onChange={({target}) => setEmployerName(target.value)}
      />
    </div>
    <div>
      <label>Sick Leave Start Date: </label>
      <input 
        type="date"
        value={sickLeave.startDate}
        onChange={({target}) => setSickLeave({...sickLeave, startDate: target.value})}
      />
    </div>
    <div>
      <label>Sick Leave End Date: </label>
      <input 
        type="date"
        value={sickLeave.endDate}
        onChange={({target}) => setSickLeave({...sickLeave, endDate: target.value})}
      />
    </div>
  </div>
  );
};

export default EntryOccupationalHealthCareForm;