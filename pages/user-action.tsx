import { GetServerSideProps } from "next";
import { useFirebase } from '../components/firebase';
import ConfirmPasswordResetForm from '../components/reset-password/confirm-password-reset-form';
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";

type UserActionMode = "resetPassword" | "recoverEmail" | "verifyEmail"

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
                        <Card>
                            <ConfirmPasswordResetForm code={code}/>
                        </Card>
                    </>
                )
            default:
                ""
        }
    }

    return (
        <Layout>
            {content()}
        </Layout>
    )
};

export default UserActionPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    console.log("Get static props", query)
    return { props: { mode: query.mode, code: query.oobCode }}
}


