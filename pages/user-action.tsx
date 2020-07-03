import { GetServerSideProps } from "next";
import App from "../components/App";
import { useFirebase } from '../components/firebase/context';
import ConfirmPasswordResetForm from '../components/reset-password/confirm-password-reset-form';

type UserActionMode = "resetPassword" | "recoverEmail" | "verifyEmail"

const UserActionPage = ({mode, code}) => {

    // const { query: { mode, oobCode }} = useRouter();
    const firebase = useFirebase()
    console.log("props", mode, code)

    const content = () => {
        switch(mode as UserActionMode) {
            case "resetPassword": 
                return (
                    <>
                        <h1>Nytt passord</h1>
                        <ConfirmPasswordResetForm code={code}/>
                    </>
                )
            default:
                ""
        }
    }

    return (
        <App>
            {content()}
        </App>
    )
};

export default UserActionPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    console.log("Get static props", query)
    return { props: { mode: query.mode, code: query.oobCode }}
}


