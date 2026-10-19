export const calculateBmi = (height: number, weight: number) : string => {
  if( height <= 0 || weight <= 0 || isNaN(height) || isNaN(weight) ) {
    throw new Error('Your height/weight is not a number or your height is not real');
  }

  const imt: number = weight / (height/100) ** 2

  if(imt < 18.5) {
    return 'Underweight range';    
  } 
  if (imt < 25) {
  return 'Normal range';
  }
  if (imt < 30) {
    return 'Overweight range';
  }
  return 'Obese range';
}


if(process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  try {
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    }
  }
}

