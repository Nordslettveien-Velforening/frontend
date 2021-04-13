import Link from 'next/link';
import Layout from "../components/ui/layout/layout";

const IndexPage = () => {
    let slug = 'om-velforeningen';
    return (
        <Layout>
            <h1>Nordslettveien</h1>
            <div>
                <Link href="/article/[slug]" as={`/article/${slug}`}>
                    <a>Om velforeningen</a>
                </Link>
            </div>
        </Layout>
    );
};

export default IndexPage;
