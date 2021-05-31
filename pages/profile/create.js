import React from "react";
import Page from "../../components/Page";
import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { parse, isDate, toDate, parseISO } from "date-fns";
import * as yup from "yup";

export default function CreateProfile() {
  const toast = useToast();

  /* istanbul ignore next */
  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "dd/mm/yyyy", new Date());

    return parsedDate;
  }

  return (
    <Page>
      <Heading mb={3}>Create Profile</Heading>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          dob: "",
          phone: "",
        }}
        validationSchema={yup.object({
          firstName: yup.string().min(3).required("First name is required"),
          lastName: yup.string().min(3).required("Last name is required"),
          email: yup.string().email().required("Email is required"),
          gender: yup.string().required("Gender is required"),
          phone: yup
            .string()
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Invalid Phone Number"
            ),
          dob: yup
            .string()
            .transform(parseDateString)
            .max(toDate("2006-01-01T01:00:00"))
            .required("Date Of Birth is required"),
        })}
        onSubmit={(values, actions) => {
          /* istanbul ignore next */
          toast({
            title: "Profile created.",
            description: "We've created your profile for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form data-testid="profile-form">
            <Field name="firstName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    data-testid="profile-form-firstName"
                    {...field}
                    id="firstName"
                    placeholder="John"
                  />
                  <FormErrorMessage data-testid="profile-form-firstname-error">
                    {form.errors.firstName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    data-testid="profile-form-lastname"
                    {...field}
                    id="lastName"
                    placeholder="Doe"
                  />
                  <FormErrorMessage data-testid="profile-form-lastname-error">
                    {form.errors.lastName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    data-testid="profile-form-email"
                    {...field}
                    id="email"
                    placeholder="john.doe@gmail.com"
                  />
                  <FormErrorMessage data-testid="profile-form-email-error">
                    {form.errors.email}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="gender">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.gender && form.touched.gender}
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    data-testid="profile-form-mobile"
                    {...field}
                    placeholder="Select Gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  <FormErrorMessage data-testid="profile-form-mobile-error">
                    {form.errors.gender}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="dob">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.dob && form.touched.dob}>
                  <FormLabel htmlFor="dob">Date Of Birth</FormLabel>
                  <Input
                    data-testid="profile-form-dob"
                    {...field}
                    onChange={(e) =>
                      /* istanbul ignore next */
                      props.setFieldValue(parseISO(e.target.value))
                    }
                    id="dob"
                    placeholder="dd/mm/yyy"
                  />
                  <FormErrorMessage data-testid="profile-form-dob-error">
                    {form.errors.dob}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
