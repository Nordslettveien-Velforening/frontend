import * as React from "react";
import { useToast } from "@chakra-ui/react";
import { useFirebase } from "../firebase";
import PasswordForm from "./password-form";


const ChangePassword = () => {

    const firebase = useFirebase();
    const toast = useToast();

    const handleSubmit = ({ password }, { setSubmitting, resetForm }) => {
        firebase
            .updatePassword(password)
            .then(() => {
                setSubmitting(false);
                toast({
                    title: "Passordet er endret",
                    description: "Du kan bruke det nye passordet neste gang du logger inn",
                    status: "success",
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
                resetForm()
            })
            .catch(e => {
                setSubmitting(false)
                console.log(e)
                const { message, severity } = mapError(e.code)
                toast({
                    title: "Oppdateringen mislyktes",
                    description: message,
                    status: severity,
                    position: "top",
                    duration: 7000,
                    isClosable: true
                })
            });
    };

    function mapError(code): { message: string, severity: "info" | "warning" | "success" | "error" } {
        const error = {
            message: "",
            severity: "warning"
        }
        switch (code) {
            case "auth/requires-recent-login":
                error.message = `
                    Det har gått for lang tid siden sist du logget inn til at du kan bytte passord.
                    Logg ut og logg inn på nytt, og prøv igjen.
                    `
                error.severity = "warning"
                break;
            default:
                error.message = "Det har oppstått en ukjent feil. Vennligst prøv igjen senere";
                error.severity = "error"
                break;
        }
        // @ts-ignore
        return error;
    }

    return <PasswordForm onSubmit={handleSubmit}/>
};

export default ChangePassword;
