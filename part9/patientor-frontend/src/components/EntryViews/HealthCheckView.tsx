import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { mdiDoctor, mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";
import { useStateValue } from "../../state";
import { assertNever } from '../../helpers';

const getHeartColor = (healthRating: HealthCheckRating) => {
  switch(healthRating) {
    case HealthCheckRating.Healthy:
      return 'green';
    case HealthCheckRating.LowRisk:
      return 'yellow';
    case HealthCheckRating.HighRisk:
      return 'orange';
    case HealthCheckRating.CriticalRisk: 
      return 'red';
    default:
      return assertNever(healthRating);
    }
};

const HealthCheckView = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      {entry.date}{" "}
      <Icon
        title={"Healtcheck"}
        path={mdiDoctor}
        size="1em"
      />{" "}
      <br />
      <em>{entry.description}</em>
      <br />
      {entry.diagnosisCodes !== undefined && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={`${entry.id}-${code}`}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
      <Icon
        title={"Health status"}
        path={mdiHeart}
        size="1em"
        color={getHeartColor(entry.healthCheckRating)}
      /><br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheckView;