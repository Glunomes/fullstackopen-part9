import { HealthCheckRating } from "../../types";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (rating: HealthCheckRating) => void;
}

const EntryHealthCheckForm = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  const isHealthCheckRating = (val: number): val is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(val as HealthCheckRating);
  };

  const onChangeRating = (value: string) => {
    const numericValue = Number(value);
    if (isHealthCheckRating(numericValue)) {
      setHealthCheckRating(numericValue);
    }
  };

  return (
    <div>
      <label>Health Check Rating (0-3): </label>
      <input
        type="number"
        min={0}
        max={3}
        value={healthCheckRating}
        onChange={({ target }) => onChangeRating(target.value)}
      />
    </div>
  );
};

export default EntryHealthCheckForm;