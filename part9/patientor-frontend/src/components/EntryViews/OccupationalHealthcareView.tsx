import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import { useStateValue } from "../../state";
import { mdiBriefcase } from "@mdi/js";
import Icon from "@mdi/react";

const OccupationalHealthcareView = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      {entry.date}{' '}
      <Icon
        title={'Occupational healthcare'}
        path={mdiBriefcase}
        size="1em"
      />{' '}
      {entry.employerName}<br />
      <em>{entry.description}</em><br />
      {(entry.diagnosisCodes !== undefined && entry.diagnosisCodes.length !== 0) &&
        <ul>
          {entry.diagnosisCodes.map((code) =>
            <li key={`${entry.id}-${code}`}>
              {code}{' '}{diagnoses[code].name}
            </li>)}
        </ul>
      }
      {entry.sickLeave &&
        `Sick leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
      {entry.sickLeave && <br />}
      diagnose by {entry.specialist}
    </div>
  );
};


export default OccupationalHealthcareView;