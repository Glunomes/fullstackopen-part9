interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
}

const calculateExercises = (hoursPerWeek: number[]) : Result => {
  if (hoursPerWeek.length === 0) {
    throw new Error ('You provided an empty data about training hours')
  }

  if ( hoursPerWeek.some(h => Number.isNaN(h)) ) {
    throw new Error('You provided not a number list')
  }

  

  const periodLength = hoursPerWeek.length;
  const trainingDays = hoursPerWeek.filter(h => h > 0).length;
  const target = Number(process.argv[2])
  const average = hoursPerWeek.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = target <= average;

  let rating: Result['rating'];
  let ratingDescription: Result['ratingDescription'];

  if ( average >= target ) {
    rating = 3;
    ratingDescription = 'amazing job'
  }
  else if ( average >= target * 0.5 ) {
    rating = 2;
    ratingDescription = 'good job, but can be better'
  } else {
    rating = 1;
    ratingDescription = 'you need work harder'
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  }
}

const arrOfDays = process.argv.slice(3)
const hoursPerWeek: number[] = arrOfDays.map(day => Number(day))

console.log(calculateExercises(hoursPerWeek))