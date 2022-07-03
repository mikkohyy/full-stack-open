import React from "react";
import { useParams } from "react-router-dom";
import { 
  Patient,
  Gender,
  NewOccupationalHealthCareEntry,
  NewHealthCheckEntry,
  NewHospitalEntry
} from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Typography, Button } from "@material-ui/core";
import { mdiGenderFemale, mdiGenderMale, mdiGenderTransgender } from "@mdi/js";
import Icon from "@mdi/react";
import { updatePatient } from '../state/reducer';
import PatientEntry from './PatientEntry';
import { assertNever } from '../helpers';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (newEntry: EntryFormValues) => {
    let entryToBeAdded = {};
    if (newEntry !== null) {
      if (newEntry.type === 'OccupationalHealthcare') {
        entryToBeAdded = {
          description: newEntry.description,
          date: newEntry.date,
          specialist: newEntry.specialist,
          employerName: newEntry.employerName,
          type: newEntry.type,
          diagnosisCodes: newEntry.diagnosisCodes
        } as NewOccupationalHealthCareEntry;

        if (newEntry.sickLeave && newEntry.startDate !== undefined && newEntry.endDate !== undefined) {
          entryToBeAdded = {
            ...entryToBeAdded,
            sickLeave: {
              startDate: newEntry.startDate,
              endDate: newEntry.endDate
            }
          };        
        }
      } else if (newEntry.type === 'HealthCheck') {
        entryToBeAdded = {
          description: newEntry.description,
          date: newEntry.date,
          specialist: newEntry.specialist,
          type: newEntry.type,
          diagnosisCodes: newEntry.diagnosisCodes,
          healthCheckRating: newEntry.healthCheckRating
        } as NewHealthCheckEntry;
      } else if (newEntry.type === 'Hospital') {
        entryToBeAdded = {
          description: newEntry.description,
          date: newEntry.date,
          specialist: newEntry.specialist,
          type: newEntry.type,
          diagnosisCodes: newEntry.diagnosisCodes,
          discharge: {
            date: newEntry.dischargeDate,
            criteria: newEntry.dischargeCriteria
          }
        } as NewHospitalEntry;
      }
    }

    if (id) {
      try {
        const { data : updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entryToBeAdded
        );
        dispatch(updatePatient(updatedPatient));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }    
      }
    }
  };

  const getGenderIcon = (gender: Gender): string => {
    switch(gender) {
      case Gender.Female:
        return mdiGenderFemale;
      case Gender.Male:
        return mdiGenderMale;
      case Gender.Other:
        return mdiGenderTransgender;
      default:
        return assertNever(gender);
    } 
  };

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id && patients[id]) {
          const currentPatient = patients[id];
          if (currentPatient.ssn && currentPatient.entries) {
            setPatient(currentPatient);
          } else {
            const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(updatePatient(foundPatient));
            setPatient(foundPatient);
          }
        }
      } catch (e: unknown){
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
        }
      }
    };
    void fetchDetails();
  }, [patients]);
  
  if (!patient) {
    return null;
  }

  return (
    <div>
      <Typography 
        variant="h5"
        style={{
          marginBottom: "0.5em",
          marginTop:"0.5em",
          fontWeight: "bold" 
        }
      }>
        {patient.name}
        {' '}
        <Icon
          title={`Patient's gender is ${patient.gender}`}
          path={getGenderIcon(patient.gender)}
          size="1em"
        /> 
      </Typography>
      ssh: {patient.ssn}<br />
      occupation: {patient.occupation}
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      /><br />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      <Typography
        variant="h6"
        style={{
          marginBottom: "0.5em",
          marginTop: "0.5em",
          fontWeight: "bold"
        }}
      >
        entries
      </Typography>
      {patient.entries !== undefined && 
       patient.entries
       .map(entry => {return <PatientEntry key={entry.id} entry={entry} />; })}
    </div>
  );
};

export default PatientDetails;