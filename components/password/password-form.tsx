import * as React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { FormikHelpers, FormikValues } from "formik/dist/types";

type PasswordFormProps = {
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>
};

const PasswordForm = ({onSubmit}: PasswordFormProps) => {
    return (
        <Formik
            initialValues={{
                password: "",
                passwordRepeat: ""
            }}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                password: Yup.string().required().min(8, "Passordet må være minst 8 tegn"),
                passwordRepeat: Yup.string()
                    .oneOf([Yup.ref("password")], "Passord og Gjenta passord må være like")
            })}
        >
            {(props) => (
                <Form>
                    <Stack spacing={6}>
                        <Field name="password">
                            {({field, form}) => (
                                <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Passord</FormLabel>
                                    <Input {...field} type="password" autoComplete="off" placeholder="Minimum 8 tegn"/>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="passwordRepeat">
                            {({field, form}) => (
                                <FormControl id="passwordRepeat" isInvalid={form.errors.passwordRepeat && form.touched.passwordRepeat}>
                                    <FormLabel>Gjenta passord</FormLabel>
                                    <Input {...field} type="password" autoComplete="off" placeholder="Minimum 8 tegn"/>
                                    <FormErrorMessage>{form.errors.passwordRepeat}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Flex justify="flex-end">
                            <Button
                                type="submit"
                                isLoading={props.isSubmitting}
                                isDisabled={!props.dirty || !props.isValid}
                            >
                                Send
                            </Button>
                        </Flex>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default PasswordForm;
