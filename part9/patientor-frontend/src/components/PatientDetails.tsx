import React from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Typography } from "@material-ui/core";
import { mdiGenderFemale, mdiGenderMale, mdiGenderTransgender } from "@mdi/js";
import Icon from "@mdi/react";

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  const getGenderIcon = (gender: string): string => {
    switch(gender) {
      case 'female':
        return mdiGenderFemale;
      case 'male':
        return mdiGenderMale;
      default:  
        return mdiGenderTransgender;
    } 
  };

  React.useEffect(() => {
    const fetchDetails = async () => {
      console.log(patients);
      try {
        if (id && patients[id]) {
          const currentPatient = patients[id];
          if (currentPatient.ssn && currentPatient.entries) {
            console.log('we already have the info', patients[id].name);
            setPatient(currentPatient); 
          } else {
            console.log('sent an request for ', patients[id].name);
            const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch({ type: "UPDATE_PATIENT", payload: foundPatient });
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
          size="1em"
          path={getGenderIcon(patient.gender)}
        /> 
      </Typography>
      ssh: {patient.ssn}<br />
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientDetails;