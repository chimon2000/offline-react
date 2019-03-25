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

type OnSubmitFn = (data: CalendarEvent) => void
type OnResetFn = () => void

type Props = {
  onSubmit: OnSubmitFn
  onReset: OnResetFn
}

function EventForm({ onSubmit, onReset }: Props) {
  const initialValues: CalendarEvent = {
    id: '',
    title: '',
    date: '',
    city: '',
    note: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EventSchema}
      onSubmit={onSubmit}
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
