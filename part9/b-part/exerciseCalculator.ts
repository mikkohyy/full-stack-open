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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))