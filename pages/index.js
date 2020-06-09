import { Main, Heading, Paragraph, Grid, Box } from 'grommet';
import Link from 'next/link';
import { withApollo } from '../lib/apollo';

const IndexPage = () => {
  let slug = 'om-velforeningen';
  return (
    <Main pad="large">
      <Box>
        <Heading>Nordslettveien</Heading>
      </Box>
      <Box gridArea="nav" background="light-5">
        <Link href="/article/[slug]" as={`/article/${slug}`}>
          <a>Om velforeningen</a>
        </Link>
      </Box>
    </Main>
  );
};

export default withApollo({ ssr: true })(IndexPage);
