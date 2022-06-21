import diagnosesRouter from './routers/diagnoses';
import cors = require('cors');
import express from 'express';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});