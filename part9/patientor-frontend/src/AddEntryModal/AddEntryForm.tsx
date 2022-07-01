import React, { useState } from "react";
import { OccupationalHealthcareEntry, EntryType } from '../types';

import { Grid, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, SelectField, TypeOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [hasSickLeave, setHasSickLeave] = useState(false);

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        sickLeave: { startDate: "", endDate: ""}
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.type) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
              control= {
                <Checkbox
                  onChange={() => setHasSickLeave(!hasSickLeave)}
                />
              }
              label="Sick leave"
            />
            { hasSickLeave && 
              <div>
                <Field 
                  label="Sickleave starts"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field 
                  label="Sickleave ends"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>
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