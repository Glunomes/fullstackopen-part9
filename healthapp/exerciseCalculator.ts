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

  const periodLength = hoursPerWeek.length;
  const trainingDays = hoursPerWeek.filter(h => h!== 0).length;
  const target = 2;
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

console.log(calculateExercises([0,3,5,1,2,0]))