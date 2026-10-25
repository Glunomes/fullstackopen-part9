interface Props {
  date: string;
  setDate: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  specialist: string;
  setSpecialist: (value: string) => void;
  diagnosisCodes: string;
  setDiagnosisCodes: (value: string) => void;
}

const BaseEntryFields = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
}: Props) => {
  return (
    <>
      <div>
        Date:
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
        Description:
        <input
          type="text"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div>
        Specialist:
        <input
          type="text"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </div>
      <div>
        Diagnosis Codes (comma-separated):
        <input
          type="text"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </div>
    </>
  );
};

export default BaseEntryFields;