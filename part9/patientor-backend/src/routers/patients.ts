/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientsService from '../services/patientsService';
import { PatientWithoutSensitiveInfo } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: PatientWithoutSensitiveInfo[] = patientsService.getPatientsWithoutSensitiveInfo();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient: PatientWithoutSensitiveInfo = patientsService
    .addPatient(name, dateOfBirth, ssn, gender, occupation);  
  res.send(addedPatient);
});

export default router;