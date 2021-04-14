import React from "react";
import { useRouter } from 'next/router';
import { useFirebase } from '../firebase';
import { useToast } from "@chakra-ui/react";
import PasswordForm from "./password-form";

const ConfirmPasswordReset = ({code}) => {

    const router = useRouter();
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
                router.push("/login")
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

    return <PasswordForm onSubmit={handleSubmit}/>
}

export default ConfirmPasswordReset;
