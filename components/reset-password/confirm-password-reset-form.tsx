import React from "react";
import Router from 'next/router';
import { useFirebase } from '../firebase/context';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";

const ConfirmPasswordResetForm = ({code}) => {

    const firebase = useFirebase();
    const toast = useToast();

    const handleSubmit = ({password}, { setSubmitting}) => {
        firebase.confirmPasswordReset({code, password})
            .then(() => {
                toast({
                    title: "Passord oppdatert",
                    description: "Du kan nå logge inn med det nye passordet",
                    status: "success",
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
                Router.push("/login")
            })
            .catch(e => {
                setSubmitting(false)
                const { message, severity } = mapError(e.code)
                toast({
                    title: "Oppdateringen feilet",
                    description: message,
                    status: severity,
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
            })
    };

    function mapError(code): { message: string, severity: "info" | "warning" | "success" | "error" } {
        const error = {
            message: "",
            severity: "warning"
        }
        switch (code) {
            default:
                error.message = "Det har oppstått en ukjent feil. Vennligst prøv igjen senere";
                error.severity = "error"
                break;
        }
        // @ts-ignore
        return error;
    }

    return (
        <Formik
            initialValues={{
                password: "",
                passwordRepeat: ""
            }}
            onSubmit={handleSubmit}
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
                                colorScheme="purple"
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
    )
}

export default ConfirmPasswordResetForm;
