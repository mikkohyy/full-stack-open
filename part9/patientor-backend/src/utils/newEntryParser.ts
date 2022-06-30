import { 
  NewEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  HealthCheckRating,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (entry: any): NewEntry => {
  if (!entry || !entry.type || !isString(entry.type)) {
    throw new Error(`Incorrect or missing information on entry: ${entry}`);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  let newEntryToAdd = parseEntry(entry);

  if (entry.diagnosisCodes === null) {
    throw new Error(`Incorrect or missing diagnosis codes: ${entry.diagnosisCodes}`);
  }

  if (entry.diagnosisCodes) {
    newEntryToAdd = {
      ...newEntryToAdd,
      diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
    };
  }
    
  return newEntryToAdd;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = (newEntry: any): NewEntry => {
  switch(newEntry.type) {
    case "OccupationalHealthcare":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return parseOccupationalHealthcareEntry(newEntry);
    case "HealthCheck":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return parseHealthCheckEntry(newEntry);
    case "Hospital":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return parseHospitalEntry(newEntry);
    default:
      throw new Error(`Incorrect or missing type in entry: ${newEntry}`);  }
};

type OccupationalHealthCareEntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  employerName: unknown,
  type: unknown,
  sickLeave?: unknown
};

const parseOccupationalHealthcareEntry = (
  { description, date, specialist, employerName, type, sickLeave} 
  : OccupationalHealthCareEntryFields): NewOccupationalHealthcareEntry => {
  let parsedEntry: NewEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    employerName: parseEmployerName(employerName),
    type: parseType(type)
  };

  if (sickLeave) {
    if (!isSickLeave(sickLeave)) {
      throw new Error(`Incorrect or missing sickleave info: ${sickLeave}`);
    } else {
      const parsedSickLeave = parseSickLeave(sickLeave);
      parsedEntry = {
        ...parsedEntry,
        sickLeave: parsedSickLeave
      };
    }
  }

  return parsedEntry;
};

type HealthCheckEntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  type: unknown,
  healthCheckRating: unknown
};

const parseHealthCheckEntry = (
  { description, date, specialist, type, healthCheckRating} : HealthCheckEntryFields)
  : NewHealthCheckEntry => {
  const parsedEntry: NewEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseType(type),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };

  return parsedEntry;
};

type HospitalEntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  type: unknown,
  discharge: unknown
};

const parseHospitalEntry = (
  { description, date, specialist, type, discharge} : HospitalEntryFields)
  : NewHospitalEntry => {
  const parsedEntry: NewEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseType(type),
    discharge: parseDischarge(discharge)
  };

  return parsedEntry;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating ${rating}`);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return /\d{4}-\d{2}-\d{2}/.test(date);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${name}`);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist's name: ${specialist}`);
  }
  return specialist;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer's name: ${employerName}`);
  }
  return employerName;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!isArrayOfStrings(codes)) {
    throw new Error(`Incorrect diagnosis codes: ${codes}`);    
  }
  return codes;
};

const isArrayOfStrings = (arrayOfStrings: unknown): arrayOfStrings is string[] => {
  if (arrayOfStrings === null || !Array.isArray(arrayOfStrings)) {
    return false;
  }

  for (const element of arrayOfStrings) {
    if (!isString(element)) {
      return false;
    }
  }

  return true;
};


const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect or missing sick leave info: ${sickLeave}`);
  }
  return sickLeave;
};

interface SickLeavePart {
  startDate: string,
  endDate: string
}

const isSickLeave = (sickLeave: unknown): sickLeave is { startDate: string, endDate: string } => {
  if (typeof sickLeave !== 'object' || sickLeave === null) {
    return false;
  }

  if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    return false;
  }

  const sickLeaveObject = sickLeave as SickLeavePart;

  if (!isString(sickLeaveObject.startDate) || !isString(sickLeaveObject.endDate)) {
    return false;
  }

  if (!isDate(sickLeaveObject.startDate) || !isDate(sickLeaveObject.endDate)) {
    return false;
  }

  return true;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge info: ${discharge}`);
  }
  return discharge;
};

interface DischargeInfo {
  date: string,
  criteria: string
}

const isDischarge = (discharge: unknown): discharge is { date: string, criteria: string } => {
  if (typeof discharge !== 'object' || discharge === null) {
    return false;
  }

  if (!('date' in discharge) || !('criteria' in discharge)) {
    return false;
  }

  const dischargeObject = discharge as DischargeInfo;

  if (!isString(dischargeObject.date) || !isString(dischargeObject.criteria)) {
    return false;
  }

  if (!isDate(dischargeObject.date)) {
    return false;
  }

  return true;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewEntry;