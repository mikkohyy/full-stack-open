export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientWithoutSensitiveInfo = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewPatientFields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: Gender,
  occupation: unknown
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}