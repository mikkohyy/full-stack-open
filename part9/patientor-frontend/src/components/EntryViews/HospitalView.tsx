import React from "react";
import { HospitalEntry } from "../../types";
import { mdiHospitalBuilding } from "@mdi/js";
import Icon from "@mdi/react";
import { useStateValue } from "../../state";

const HospitalView = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      <div>
        {entry.date}{" "}
        <Icon
          title={"Occupational healthcare"}
          path={mdiHospitalBuilding}
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
        {`Discharged on ${entry.discharge.date}`}<br /> 
        {`Criteria for discharge: ${entry.discharge.criteria}`}<br />
        diagnose by {entry.specialist}
      </div>
    </div>
  );
};

export default HospitalView;
