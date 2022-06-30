import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData;

const getDiagnoses = () => {
  return diagnoses;
};

export default {
  getDiagnoses
};