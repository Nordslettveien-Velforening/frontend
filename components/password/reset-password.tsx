import React from "react";
import { withFirebase } from "../firebase";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";

const ResetPassword = props => {

    const toast = useToast();

    const handleSubmit = ({ email }, { setSubmitting }) => {
        props.firebase
            .resetPassword(email)
            .then(() => {
                setSubmitting(false)
                toast({
                    title: "E-post sendt",
                    description: "Sjekk din e-post for videre instruksjoner",
                    status: "success",
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
            })
            .catch(e => {
                setSubmitting(false)
                const { message, severity } = mapError(e.code, {email})
                toast({
                    title: "Innloggingen mislyktes",
                    description: message,
                    status: severity,
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
            });
    };

    function mapError(code, { email }): { message: string, severity: "info" | "warning" | "success" | "error" } {
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
            initialValues={{email: ""}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required()
            })}
        >
            {(props) => (
                <Form>
                    <Stack spacing={6}>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel>E-post</FormLabel>
                                    <Input {...field}  placeholder="f.eks. kari@nordmann.no" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Flex justify="flex-end">
                            <Button
                                type="submit"
                                isLoading={props.isSubmitting}
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

export default withFirebase(ResetPassword);
