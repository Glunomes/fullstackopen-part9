const calculateBmi = (height: number, weight: number) : string => {
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

console.log(calculateBmi(180, 74))