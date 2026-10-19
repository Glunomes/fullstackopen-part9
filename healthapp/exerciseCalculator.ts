interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
}

export const calculateExercises = (hoursPerWeek: number[], target: number) : Result => {
  if (hoursPerWeek.length === 0) {
    throw new Error ('You provided an empty data about training hours');
  }

  if ( hoursPerWeek.some(h => Number.isNaN(h)) ) {
    throw new Error('You provided not a number list');
  }

  if ( target <=0 || Number(isNaN(target)) ) {
    throw new Error('Target must be a positive number')
  }

  const periodLength = hoursPerWeek.length;
  const trainingDays = hoursPerWeek.filter(h => h > 0).length;
  const average = hoursPerWeek.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = target <= average;

  let rating: Result['rating'];
  let ratingDescription: Result['ratingDescription'];

  if ( average >= target ) {
    rating = 3;
    ratingDescription = 'amazing job';
  }
  else if ( average >= target * 0.5 ) {
    rating = 2;
    ratingDescription = 'good job, but can be better';
  } else {
    rating = 1;
    ratingDescription = 'you need work harder';
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

if(process.argv[1] === import.meta.filename) {
  const arrOfDays = process.argv.slice(3);
  const hoursPerWeek: number[] = arrOfDays.map(day => Number(day));
  const target = Number(process.argv[2]);
  try {
    console.log(calculateExercises(hoursPerWeek, target));
  } catch(error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    }
  }
}