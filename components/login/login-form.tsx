import * as React from "react";
import Router from "next/router";
import { useAuth } from "../authentication";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";

const LoginForm = () => {

    const auth = useAuth()
    const toast = useToast()

    const handleSubmit = (values, { setSubmitting }) => {
        auth.login({email: values.email, password:  values.password})
            .then(() => {
                Router.push("/minside")
            })
            .catch(e => {
                setSubmitting(false)
                const { message, severity } = mapError(e.code, values)
                toast({
                    title: "Innloggingen mislyktes",
                    description: message,
                    status: severity,
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
            })
    };

    function mapError(code, { email }): { message: string, severity: "info" | "warning" | "success" | "error" } {
        const error = {
            message: "",
            severity: "warning"
        }
        switch (code) {
            case "auth/user-not-found":
                error.message = `E-postadressen '${email}' er ikke registrert enda.`;
                break;
            case "auth/wrong-password":
                error.message = "Du har oppgitt feil passord. Prøv igjen, eller bruk funksjonen for glemt passord."
                break;
            case "auth/too-many-requests":
                error.message = "Du har prøvd logge inn for mange ganger på kort tid. Vent i noen minutter og prøv igjen."
                break;
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
                email: "",
                password: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().required()
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
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Passord</FormLabel>
                                    <Input {...field} type="password" autoComplete="off" placeholder="Ditt passord" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Text>
                            Ikke registrert enda? <NextLink href={"/ny-bruker"}><Link>Lag ny bruker</Link></NextLink>
                        </Text>
                        <Flex justify="space-between">
                            <NextLink href={"/glemt-passord"}><Link>Glemt passord</Link></NextLink>
                            <Button
                                type="submit"
                                colorScheme="purple"
                                isLoading={props.isSubmitting}
                            >
                                Logg inn
                            </Button>
                        </Flex>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
};

export default LoginForm;
