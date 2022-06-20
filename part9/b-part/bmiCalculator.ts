const calculateBMI = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  let personBMI: string = '';

  console.log(bmi)

  if (bmi < 16) {
    personBMI = 'Underweight (several thinness)';
  } else if (bmi < 17) {
    personBMI = 'Underweight (moderate thinness)'
  } else if (bmi < 18.5) {
    personBMI = 'Underweight (mild thinness)' 
  } else if (bmi < 25) {
    personBMI = 'Normal (healthy weight)'
  } else if (bmi < 30) {
    personBMI = 'Overweight (pre-obese)'
  } else if (bmi < 35) {
    personBMI = 'Obese (class i)'
  } else if (bmi < 40) {
    personBMI = 'Obese (class ii)'
  } else if (bmi >= 40) {
    personBMI = 'Obese (class iii)'
  }
 
  return personBMI
}


console.log(calculateBMI(180, 74))