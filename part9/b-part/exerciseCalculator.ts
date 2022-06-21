interface ExerciseData {
  target: number,
  days: Array<number>
}

interface ExerciseSummary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating = -1 | 1 | 2 | 3;

const parseExerciseData = (args: Array<string>):ExerciseData => {
  if (args.length < 4) throw Error('Not enough arguments');
  const data = args.slice(2);

  if (data.some((dataPoint) => isNaN(Number(dataPoint)))) {
    throw Error('All values that were given were not numbers')
  }

  const target = Number(data[0]);
  const days = data.slice(1).map(dataPoint => Number(dataPoint));

  return { target, days }
}

const calculateExercises = (days: Array<number>, goal: number): ExerciseSummary => {
  const averageTrainingTime = getAverageTime(days, goal);
  const rating = calculateRating(averageTrainingTime, goal);
  
  const summary = {
    periodLength: getPeriodLength(days),
    trainingDays: getTrainingDays(days),
    success: getWasSuccessful(averageTrainingTime, goal),
    rating: rating,
    ratingDescription: getRatingDescription(rating),
    target: goal,
    average: getAverageTime(days, goal)
  }

  return summary;
}

const getPeriodLength = (days: Array<number>): number => {
  return days.length;
}

const getTrainingDays = (days: Array<number>): number => {
  const daysWithTraining: Array<number> = days.filter(day => day !== 0);
  return daysWithTraining.length;
}

const getWasSuccessful = (averageTrainingTime: number, goal: number): boolean => {
  const successful: boolean = averageTrainingTime > goal ? true : false;

  return successful;
}

const getAverageTime = (days: Array<number>, goal: number): number => {
  const sumOfTrainingTime: number = days
    .reduce((previousDay, currentDay) => previousDay + currentDay, 0);
  const daysInInterval: number = days.length;
  const averageTrainingTime: number = sumOfTrainingTime / daysInInterval;
  
  return averageTrainingTime;
}

const calculateRating = (averageTrainingTime: number, goal: number): Rating => {
  let rating: Rating = -1;
  if (averageTrainingTime >= (goal * 1.5)) {
    rating = 3;
  } else if (averageTrainingTime >= (goal * 0.5)) {
    rating = 2;
  } else {
    rating = 1;
  }

  return rating;
}

const getRatingDescription = (rating: Rating): string => {
  let description = '';

  if (rating === 3) {
    description = 'excellent, you reached your goal!';
  } else if (rating === 2) {
    description = 'good, but could be better!';
  } else if (rating === 1) {
    description = 'maybe it was raining all week. lets try again next week!';
  } else {
    description = 'something went wrong'
  }

  return description
}

try {
  const { target, days } = parseExerciseData(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}