import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis } from "../../types";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: Array<Diagnosis["code"]>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<Array<Diagnosis["code"]>>>;
  diagnoses?: Diagnosis[];
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
  diagnoses = [],
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />

      <TextField
        label="Description"
        fullWidth
        required
        size="small"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />

      <TextField
        label="Specialist"
        fullWidth
        required
        size="small"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <FormControl fullWidth size="small">
        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes-select"
          multiple
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                <Chip key={code} label={code} size="small" />
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 220,
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code} dense>
              <small>
                <strong>{d.code}</strong> — {d.name}
              </small>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BaseEntryFields;