import { useState, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";

import type { Discharge, Entry, EntryType, Diagnosis } from "../../types";
import { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
import BaseEntryFields from "./BaseEntryFields";
import EntryHealthCheckForm from "./EntryHealthCheckForm";
import EntryOccupationalHealthCareForm from "./EntryOccupationalHealthCareForm";
import EntryHospitalForm from "./EntryHospitalForm";
import { createEntryPayload } from "../../utils/entryHelper";

interface Props {
  id: string | undefined;
  onNewEntry: (entry: Entry) => void;
  diagnoses: Diagnosis[];
  onClose?: () => void;
}

const EntryForm = ({ id, onNewEntry, diagnoses, onClose }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [error, setError] = useState<string | null>(null);

  // General Fields
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);

  // HealthCheck fields
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  // Hospital fields
  const [discharge, setDischarge] = useState<Discharge>({ date: "", criteria: "" });

  // Occupational Healthcare fields
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });

  const resetForm = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setDischarge({ date: "", criteria: "" });
    setEmployerName("");
    setSickLeave({ startDate: "", endDate: "" });
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;

    try {
      const entryObject = createEntryPayload({
        entryType,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        discharge,
        employerName,
        sickLeave,
      });

      const newEntry = await patientService.addEntry(id, entryObject);
      onNewEntry(newEntry);
      resetForm();
      if (onClose) {
        onClose();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === "string") {
          setError(e.response.data);
        } else if (e.response?.data?.error) {
          setError(e.response.data.error);
        } else {
          setError("Помилка запиту до сервера");
        }
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Невідома помилка");
      }
    }
  };

  return (
    <Box
      sx={{
        border: "1px dashed #777",
        borderRadius: "4px",
        p: 2,
        my: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        New Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="entry-type-select-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-select-label"
          id="entry-type-select"
          value={entryType}
          label="Entry type"
          onChange={(e) => setEntryType(e.target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <form onSubmit={handleSubmit}>
        <BaseEntryFields
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
          diagnoses={diagnoses}
        />

        {entryType === "HealthCheck" && (
          <EntryHealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}

        {entryType === "OccupationalHealthcare" && (
          <EntryOccupationalHealthCareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}

        {entryType === "Hospital" && (
          <EntryHospitalForm
            discharge={discharge}
            setDischarge={setDischarge}
          />
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            ADD
          </Button>
          <Button type="button" variant="outlined" color="primary" onClick={handleCancel}>
            CANCEL
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EntryForm;