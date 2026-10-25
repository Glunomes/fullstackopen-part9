import { Box, TextField } from "@mui/material";
import type { Discharge } from "../../types";

interface Props {
  discharge: Discharge;
  setDischarge: (discharge: Discharge) => void;
}

const EntryHospitalForm = ({ discharge, setDischarge }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
      <TextField
        label="Discharge Date"
        type="date"
        fullWidth
        required
        size="small"
        slotProps={{
          inputLabel: { shrink: true } }}
        value={discharge.date}
        onChange={({ target }) =>
          setDischarge({ ...discharge, date: target.value })
        }
      />

      <TextField
        label="Discharge Criteria"
        fullWidth
        required
        size="small"
        value={discharge.criteria}
        onChange={({ target }) =>
          setDischarge({ ...discharge, criteria: target.value })
        }
      />
    </Box>
  );
};

export default EntryHospitalForm;