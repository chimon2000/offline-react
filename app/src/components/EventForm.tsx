import React from 'react'
import { formikField, InputField, TextareaField, FieldSet, Pane, Heading, Button } from 'fannypack'
import { Formik, Form, Field } from 'formik'

const FormikInputField = formikField(InputField)
const FormikTextareaField = formikField(TextareaField)

function EventForm({ onSubmit }) {
    return (
        <Formik initialValues={{ username: '', date: '', city: '', note: '' }} onSubmit={data => onSubmit(data)}>
            <Form>
                <Pane margin="10px auto" minWidth="400px" width="50%" border="shadow" padding="major-4">
                    <Heading>Add an event</Heading>
                    <FieldSet>
                        <Field component={FormikInputField} name="title" label="Title" />
                        <Field component={FormikInputField} name="date" label="Date" type="date" />
                        <Field component={FormikInputField} name="city" label="City" />
                        <Field component={FormikTextareaField} name="note" label="Note" />
                        <Button type="submit">Add</Button>
                    </FieldSet>
                </Pane>
            </Form>
        </Formik>
    )
}

export default EventForm
