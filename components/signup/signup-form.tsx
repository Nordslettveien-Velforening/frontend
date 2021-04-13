import * as React from "react";
import Router from "next/router";
import { Field, Form, Formik } from 'formik';
import { useAuth } from "../authentication";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon, Link,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import * as Yup from "yup";
import NextLink from "next/link";

const SignUpForm = () => {

    const auth = useAuth();
    const toast = useToast();

    const handleSubmit = ({email, givenName, surname, mobile, houseNo, password}, {setSubmitting}) => {
        auth
            .createUser({email, givenName, surname, mobile, houseNo, password})
            .then(() => {
                Router.push("/minside")
            })
            .catch(e => {
                console.log(e)
                setSubmitting(false)
                const { message, severity } = mapError(e.code, { email })
                toast({
                    title: "Registreringen feilet",
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
            case "auth/email-already-in-use":
                error.message = `E-postadressen '${email}' er allerede registrert.`;
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
            initialValues={
                {
                    email: "",
                    givenName: "",
                    surname: "",
                    mobile: "",
                    houseNo: "",
                    password: ""
                }
            }
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                givenName: Yup.string().required(),
                surname: Yup.string().required(),
                email: Yup.string().email().required(),
                mobile: Yup.string()
                    .required()
                    .matches(/([49])(?: ?\d){7}/, "Må være et gyldig norsk telefonnummer, 8 siffer."),
                houseNo: Yup.number()
                    .required()
                    .min(1, "Husnummer må være gyldig husnummer i Nordslettveien. Bruk kun tall (gjelder også hybelenheter)")
                    .max(399, "Husnummer må være gyldig husnummer i Nordslettveien. Bruk kun tall (gjelder også hybelenheter)"),
                password: Yup.string().required().min(8, "Passordet må være minst 8 tegn"),
                passwordRepeat: Yup.string()
                    .oneOf([Yup.ref("password")], "Passord og Gjenta passord må være like")
            })}
        >
            {(props) => (
                <Form>
                    <Stack spacing={6}>
                        <Field name="givenName">
                            {({field, form}) => (
                                <FormControl id="givenName" isInvalid={form.errors.givenName && form.touched.givenName}>
                                    <FormLabel>Fornavn</FormLabel>
                                    <Input {...field} placeholder=""/>
                                    <FormErrorMessage>{form.errors.givenName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="surname">
                            {({field, form}) => (
                                <FormControl id="surname" isInvalid={form.errors.surname && form.touched.surname}>
                                    <FormLabel>Etternavn</FormLabel>
                                    <Input {...field}  placeholder=""/>
                                    <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({field, form}) => (
                                <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel>E-post</FormLabel>
                                    <Input {...field} placeholder="f.eks. kari@nordmann.no"/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="mobile">
                            {({field, form}) => (
                                <FormControl id="mobile" isInvalid={form.errors.mobile && form.touched.mobile}>
                                    <FormLabel>Mobilnummer</FormLabel>
                                    <Input {...field} type="tel" placeholder="987 65 432"/>
                                    <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="houseNo">
                            {({field, form}) => (
                                <FormControl id="houseNo" isInvalid={form.errors.houseNo && form.touched.houseNo}>
                                    <FormLabel>Husnummer</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>Nordslettveien</InputLeftAddon>
                                        <Input {...field} type="number" placeholder="123"/>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.houseNo}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
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
                        <Flex justify="space-between">
                            <Text>Allerede registrert? <NextLink href={"/login"}><Link>Logg inn</Link></NextLink></Text>
                            <Button
                                type="submit"
                                colorScheme="purple"
                                isLoading={props.isSubmitting}
                            >
                                Registrer
                            </Button>
                        </Flex>
                    </Stack>
                </Form>
            )}
        </Formik>
    )

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             Fornavn
    //             <input {...bindGivenName} type="text"/>
    //         </label>
    //         <label>
    //             Etternavn
    //             <input {...bindSurname} type="text"/>
    //         </label>
    //         <label>
    //             E-post
    //             <input {...bindEmail} type="email"/>
    //         </label>
    //         <label>
    //             Mobil
    //             <input {...bindMobile} type="text"/>
    //         </label>
    //         <label>
    //             Husnummer
    //             <input {...bindHouseNo} type="houseNo"/>
    //         </label>
    //         <label>
    //             Passord
    //             <input {...bindPassword} type="password"/>
    //         </label>
    //         <label>
    //             Gjenta passord
    //             <input {...bindPasswordRepeat} type="password"/>
    //         </label>
    //         <button disabled={isInvalid} type="submit">Registrer</button>
    //         {error !== "" && <ErrorMessage text={error}/>}
    //     </form>
    // );
};

export default SignUpForm;
