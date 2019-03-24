import React from 'react'
import {
  formikField,
  InputField,
  TextareaField,
  FieldSet,
  Button,
  Set,
  ActionButtons
} from 'fannypack'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const FormikInputField = formikField(InputField)
const FormikTextareaField = formikField(TextareaField)

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Required')
})

function EventForm({ onSubmit, onReset }) {
  return (
    <Formik
      initialValues={{ title: '', date: '', city: '', note: '' }}
      validationSchema={EventSchema}
      onSubmit={data => {
        if (!data.title) {
          alert('Title is required')
          return
        }

        onSubmit(data)
      }}
      onReset={onReset}
    >
      <Form>
        <FieldSet>
          <Field component={FormikInputField} name="title" label="Title" />
          <Field
            component={FormikInputField}
            name="date"
            label="Date"
            type="date"
          />
          <Field component={FormikInputField} name="city" label="City" />
          <Field component={FormikTextareaField} name="note" label="Note" />
          <ActionButtons
            cancelProps={{ type: 'reset' }}
            submitText="Add Event"
            justifyContent="flex-end"
          />
        </FieldSet>
      </Form>
    </Formik>
  )
}

export default EventForm
