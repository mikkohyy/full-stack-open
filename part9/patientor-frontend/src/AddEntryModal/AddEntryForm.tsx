import React from "react";
import { OccupationalHealthcareEntry, EntryType } from '../types';

import { Grid, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, SelectField, TypeOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import helpers from '../helpers';

export interface EntryFormValues extends Omit<OccupationalHealthcareEntry, 'id' | 'sickLeave'> {
  sickLeave: boolean,
  startDate: string,
  endDate: string
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.OccupationalHealthcareEntry, label: "Occupational healthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        sickLeave: false,
        startDate: "",
        endDate: ""
      }}
      onSubmit={onSubmit}
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
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
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
            <Field
              label="Employer name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
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
            <div>
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