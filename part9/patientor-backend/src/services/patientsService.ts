import patientsData from '../../data/patients.json';
import { PatientWithoutSensitiveInfo, Patient } from '../types';

const patients: Patient[] = patientsData;

const getPatientData = () => {
  return patients;
};

const getPatientsWithoutSensitiveInfo = (): PatientWithoutSensitiveInfo[] => {
  const patientsWithoutSSN: PatientWithoutSensitiveInfo[] = patients
    .map(({ id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  
  return patientsWithoutSSN;
};

export default {
  getPatientData,
  getPatientsWithoutSensitiveInfo
};