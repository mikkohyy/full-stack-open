import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../helpers';
import styled from 'styled-components';
import OccupationalHealthcareView from './EntryViews/OccupationalHealthcareView';
import HospitalView from './EntryViews/HospitalView';
import HealthCheckView from './EntryViews/HealthCheckView';

interface EntryContainerI {
  border?: string;
  padding?: string;
  borderRadius?: string;
  marginTop?: string;
  marginBottom?: string;
}

const EntryContainer = styled.div<EntryContainerI>`  
  border: 3px solid darkgrey;
  padding: 0.5em;
  border-radius: 7px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareView entry={entry} />;
    case 'Hospital':
      return <HospitalView entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckView entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientEntry = ({ entry }: { entry: Entry }) => {
  return(
    <EntryContainer>
      <EntryDetails entry={entry}/>
    </EntryContainer>
  );
};

export default PatientEntry;