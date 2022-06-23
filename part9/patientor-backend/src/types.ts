export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSensitiveInfo = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

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