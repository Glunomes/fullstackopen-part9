import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { HealthCheckRating } from "../../types";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (rating: HealthCheckRating) => void;
}

const ratingOptions = Object.entries(HealthCheckRating).map(([key, value]) => ({
  value: value as HealthCheckRating,
  label: `${value} — ${key}`,
}));

const EntryHealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    if ((Object.values(HealthCheckRating) as number[]).includes(value)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="healthcheck-rating-label">Health Check Rating</InputLabel>
        <Select
          labelId="healthcheck-rating-label"
          id="healthcheck-rating-select"
          value={healthCheckRating}
          label="Health Check Rating"
          onChange={handleChange}
        >
          {ratingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EntryHealthCheckForm;