import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../../lib/apollo';

export const SIMPLE_PAGE_BY_SLUG_QUERY = gql`
  query simplePageBySlug($slug: String!) {
    allSimplePage(where: { slug: { current: { eq: $slug } } }) {
      _id
      _updatedAt
      title
      contentRaw
    }
  }
`;

let SimplePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(SIMPLE_PAGE_BY_SLUG_QUERY, {
    variables: { slug },
  });

  if (error) return <pre>Kunne ikke laste side.</pre>;
  if (loading) return <div>Loading</div>;

  const { allSimplePage } = data;

  return (
    <section>
      <code>{JSON.stringify(allSimplePage)}</code>
    </section>
  );
};

export default withApollo({ ssr: true })(SimplePage);
