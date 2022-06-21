import { calculateExercises, calculateBMI } from './wellnesCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {  
  let response = {};
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    response = {
      height: height,
      weight: weight,
      bmi: calculateBMI(height, weight)
    };
    return res.json(response);
  } else {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (!Array.isArray(daily_exercises) || !isExercisesRequestDataValid(daily_exercises, target)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });        
  }

  const targetNumber = Number(target);
  const exercisesNumber = daily_exercises.map(exercise => Number(exercise));

  const result = calculateExercises(exercisesNumber, targetNumber);

  return res.json(result);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isExercisesRequestDataValid = (daily_exercises: any[], target: any) => {
  let valid = true;

  if (isNaN(Number(target))) {
    valid = false;
  } else if (daily_exercises.length < 1) {
    valid = false;
  }else if (daily_exercises.some(element => isNaN(Number(element)))) {
    valid = false;
  }

  return valid;
};

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});