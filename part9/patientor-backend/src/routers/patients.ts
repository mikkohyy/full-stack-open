import express from 'express';
import patientsService from '../services/patientsService';
import { PatientWithoutSensitiveInfo } from '../types';
import toNewPatient from '../newPatientParser';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: PatientWithoutSensitiveInfo[] = patientsService.getPatientsWithoutSensitiveInfo();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    /* The following line caused problems. By searching the Dischord channel, I found out that
       this is (probably?) caused by the newer versions of eslint. Hence, I disabled the line. */

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient: PatientWithoutSensitiveInfo = patientsService
      .addPatient(newPatient);
      res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;