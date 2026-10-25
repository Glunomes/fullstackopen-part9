import { Box, TextField } from "@mui/material";

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Props {
  employerName: string;
  setEmployerName: (employerName: string) => void;
  sickLeave: SickLeave;
  setSickLeave: (sickLeave: SickLeave) => void;
}

const EntryOccupationalHealthCareForm = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
      <TextField
        label="Employer name"
        fullWidth
        required
        size="small"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />

      <TextField
        label="Sick leave start date"
        type="date"
        fullWidth
        size="small"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={sickLeave.startDate}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, startDate: target.value })
        }
      />

      <TextField
        label="Sick leave end date"
        type="date"
        fullWidth
        size="small"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={sickLeave.endDate}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, endDate: target.value })
        }
      />
    </Box>
  );
};

export default EntryOccupationalHealthCareForm;