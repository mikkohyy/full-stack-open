import patientsData from '../../data/patients.json';
import { PatientWithoutSensitiveInfo, Patient } from '../types';
import { v1 as uuid} from 'uuid';

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

const addPatient = (
  name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
): PatientWithoutSensitiveInfo => {
  const id: string = uuid();
  
  const newPatient: Patient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    id
  };

  patients.push(newPatient);

  const newPatientWithoutSensitiveInfo: PatientWithoutSensitiveInfo = {
    name,
    dateOfBirth,
    gender,
    occupation,
    id
  };

  return newPatientWithoutSensitiveInfo;
};

export default {
  getPatientData,
  getPatientsWithoutSensitiveInfo,
  addPatient
};