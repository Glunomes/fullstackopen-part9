import FavoriteIcon from '@mui/icons-material/Favorite';
import type { HealthCheckEntry } from '../../types';

interface Props {
  entry: HealthCheckEntry;
}

const healthRatingColors: Record<number, string> = {
  0: 'green',
  1: 'yellow',
  2: 'orange',
  3: 'red',
};

const HealthCheck = ({ entry }: Props) => {
  const heartColor = healthRatingColors[entry.healthCheckRating];

  return (
    <div>
      <FavoriteIcon style={{ color: heartColor }} />
    </div>
  );
};

export default HealthCheck;