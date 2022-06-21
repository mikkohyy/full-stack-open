import { calculateBMI } from './bmiCalculator';
import express from 'express';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});