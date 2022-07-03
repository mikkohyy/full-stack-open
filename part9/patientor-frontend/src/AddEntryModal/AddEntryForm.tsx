import React from "react";
import { HealthCheckRating, EntryType, BaseEntry } from '../types';

import { Grid, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  SelectFieldOnChange,
  TypeOption,
  HealthCheckRatingOption
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import helpers from '../helpers';

export interface EntryFormValues extends Omit<BaseEntry, 'id'> {
  sickLeave?: boolean,
  startDate?: string,
  endDate?: string,
  employerName?: string,
  healthCheckRating?: HealthCheckRating,
  dischargeDate?: string,
  dischargeCriteria?: string
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.OccupationalHealthcareEntry, label: "Occupational healthcare" },
  { value: EntryType.HealthCheckEntry, label: "Health check" },
  { value: EntryType.HospitalEntry, label: "Hospital"}
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy"},
  { value: HealthCheckRating.LowRisk, label: "Low risk"},
  { value: HealthCheckRating.HighRisk, label: "Hight risk"},
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk"}
];

const InitialValuesForOccupationalHealthcareEntry = {
  description: "",
  date: "",
  specialist: "",
  employerName: "",
  diagnosisCodes: [],
  type: EntryType.OccupationalHealthcareEntry,
  sickLeave: false,
  startDate: "",
  endDate: ""
};

const InitialValuesForHealthCheckEntry = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  type: EntryType.HealthCheckEntry,
  healthCheckRating: HealthCheckRating.Healthy
};

const InitialValuesForHospitalEntry = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  type: EntryType.HospitalEntry,
  dischargeDate: "",
  dischargeCriteria: ""
};


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [EntryInitialValues, setEntryInitialValues] = React.useState<EntryFormValues>(
    InitialValuesForOccupationalHealthcareEntry
  );

  const handleTypeChange = (event: PointerEvent) => {
    if (event !== undefined && event !== null && event.target !== null) {
      const formType = (event.target as HTMLInputElement).value;
      if (formType === EntryType.OccupationalHealthcareEntry) {
        setEntryInitialValues(InitialValuesForOccupationalHealthcareEntry);
      } else if (formType === EntryType.HealthCheckEntry) {
        setEntryInitialValues(InitialValuesForHealthCheckEntry);
      } else if (formType === EntryType.HospitalEntry) {
        setEntryInitialValues(InitialValuesForHospitalEntry);
      }
    }
  };

  return (
    <Formik
      initialValues={EntryInitialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidError = "Invalid format";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        } else if (!helpers.isValidText(values.description)) {
          errors.description = invalidError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!helpers.isValidDate(values.date)) {
          errors.date = invalidError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        } else if (!helpers.isValidText(values.specialist)) {
          errors.specialist = invalidError;
        }
        if (values.type === EntryType.HospitalEntry) {
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          } else if (!helpers.isValidText(values.dischargeCriteria)) {
            errors.dischargeCriteria = invalidError;
          }
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!helpers.isValidDate(values.dischargeDate)) {
            errors.dischargeDate = invalidError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcareEntry) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          } else if (!helpers.isValidText(values.employerName)) {
            errors.employerName = invalidError;
          }
          if (values.sickLeave) {
            if (!values.startDate) {
              errors.startDate = requiredError;
            }
            if (!values.endDate) {
              errors.endDate = requiredError;
            }
            if (!helpers.isValidDate(values.startDate)) {
              errors.startDate = invalidError;
            }
            if (!helpers.isValidDate(values.endDate)) {
              errors.endDate = invalidError;
            }
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(values);
        return (
          <Form className="form ui">
            <SelectFieldOnChange
              label="Type"
              name="type"
              options={typeOptions}
              onChange={handleTypeChange}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of the specialist"
              name="specialist"
              component={TextField}
            />
            {values.employerName !== undefined &&
              <Field
                label="Employer name"
                placeholder="Employer"
                name="employerName"
                component={TextField}
              />
            }
            {values.sickLeave !== undefined && 
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        values.sickLeave = !values.sickLeave;
                        values.startDate = "";
                        values.endDate = "";
                      }}
                    />
                  }
                  label="Sick leave"
                />
                <Field
                  label="Sickleave starts"
                  placeholder="YYYY-MM-DD"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="Sickleave ends"
                  placeholder="YYYY-MM-DD"
                  name="endDate"
                  component={TextField}
                />
              </div>
            }
            {values.dischargeDate !== undefined &&
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
              />
            }
            {values.dischargeCriteria !== undefined &&
              <Field
                label="Discharge criteria"
                placeholder="Criteria for discharge"
                name="dischargeCriteria"
                component={TextField}
              />
            }
            {values.healthCheckRating !== undefined &&
              <SelectField
                label="HealthCheckRating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />            
            }
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;