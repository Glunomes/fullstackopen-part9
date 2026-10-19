import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import express from 'express';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || Number.isNaN(height) || Number.isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if(!daily_exercises || !target || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  const isExercisesValid = 
  Array.isArray(daily_exercises) && 
  daily_exercises.length > 0 && 
  daily_exercises.every(d => typeof d === 'number' && !Number(isNaN(d)));

  const isTargetValid = typeof target === 'number' && !Number.isNaN(target);

  if(!isExercisesValid || !isTargetValid) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  };

  const result = calculateExercises(daily_exercises as number[], target as number);
  return res.json( result );
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});