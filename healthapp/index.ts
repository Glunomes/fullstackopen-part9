import { calculateBmi } from './bmiCalculator.ts';
import express from 'express'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});