interface BmiParameters {
  height: number
  weight: number
}

const parseHeightWeight = (args: Array<string>): BmiParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Values that were given were not numbers')
  }
}

export const calculateBMI = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  let personBMI: string = '';

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
 
  return personBMI;
}

try {
  const { height, weight } = parseHeightWeight(process.argv);
  console.log(calculateBMI(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage);
}

