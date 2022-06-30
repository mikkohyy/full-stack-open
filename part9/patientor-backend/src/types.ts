export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  type: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: { startDate: string, endDate: string }
}

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type NewHospitalEntry = Omit<HospitalEntry, "id">;

interface HospitalEntry extends BaseEntry {
  discharge: { date: string, criteria: string }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type PatientWithoutSensitiveInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' >;

export type NewPatientFields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: Gender,
  occupation: unknown,
  entries?: Entry[];
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;