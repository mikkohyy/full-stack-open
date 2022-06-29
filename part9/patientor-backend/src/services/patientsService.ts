import patientsData from '../../data/more_detailed_patients';
import { PatientWithoutSensitiveInfo, Patient, NewPatient } from '../types';
import { v1 as uuid} from 'uuid';
import toNewPatient from '../newPatientParser';

const patients: Patient[] = patientsData.map(patient => {
  const newPatient = toNewPatient(patient as NewPatient) as Patient;
  newPatient.id = patient.id;
  newPatient.entries = patient.entries || [];
  return newPatient;
});

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

const addPatient = (entry: NewPatient): PatientWithoutSensitiveInfo => {
  const id: string = uuid();
  
  const addedPatient: Patient = {
    ...entry,
    id
  };

  patients.push(addedPatient);

  const newPatientWithoutSensitiveInfo: PatientWithoutSensitiveInfo = {
    name: addedPatient.name,
    dateOfBirth: addedPatient.dateOfBirth,
    gender: addedPatient.gender,
    occupation: addedPatient.occupation,
    id
  };

  return newPatientWithoutSensitiveInfo;
};

const findPatientById = ((id: string): Patient => {
  const foundPatient = patients.find(patient => patient.id === id) as Patient;
  return foundPatient;  
});

export default {
  getPatientData,
  getPatientsWithoutSensitiveInfo,
  addPatient,
  findPatientById
};