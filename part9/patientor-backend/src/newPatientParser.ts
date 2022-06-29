import { NewPatient, NewPatientFields, Gender, Entry } from './types';

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : NewPatientFields): 
  NewPatient => {
  const newPatientToAdd: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatientToAdd;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries) || !isMedicalEntries(entries)) {
    throw new Error(`Incorrect or missing information on patient's entries: ${entries}`);
  }

  return entries;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing gender: ${occupation}`);
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isSsn = (ssn: string): boolean => {
  return /\d{6}[-+A]\d{3}./.test(ssn);
};

const isDate = (date: string): boolean => {
  return /\d{4}-\d{2}-\d{2}/.test(date);
};

const isMedicalEntries = (entries: unknown[]): entries is Entry[] => {
  if (entries.length === 0) {
    return true;
  }

  for (const entry of entries) {
    if (!isMedicalEntry(entry)) {
      return false;
    }
  }

  return true;
};

const isMedicalEntry = (entry: unknown): entry is Entry => {
  const allowedTypes = ['HealthCheck', 'OccupationalHealthcare', 'Hospital'];

  if (typeof entry !== 'object' || entry === null || !('type' in entry)) {
    return false;
  }
  
  if ((entry as Entry).type === undefined) {
    return false;
  }

  if (typeof (entry as Entry).type !== 'string' || !allowedTypes.includes((entry as Entry).type)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export default toNewPatient;