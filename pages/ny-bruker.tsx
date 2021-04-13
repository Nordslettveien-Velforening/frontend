import SignUpForm from "../components/signup/signup-form";
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";

const SignUpPage = () => (
    <Layout title="Registrer ny bruker">
        <h1>Registrer ny bruker</h1>
        <Card>
            <SignUpForm/>
        </Card>
    </Layout>
);

export default SignUpPage;
