import { GetServerSideProps } from "next";
import ConfirmPasswordReset from '../components/password/confirm-password-reset';
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";

type UserActionMode = "resetPassword" | "recoverEmail" | "verifyEmail"

const UserActionPage = ({mode, code}) => {

    const content = () => {
        switch(mode as UserActionMode) {
            case "resetPassword": 
                return (
                    <>
                        <h1>Nytt passord</h1>
                        <Card>
                            <ConfirmPasswordReset code={code}/>
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
    return { props: { mode: query.mode, code: query.oobCode }}
}


