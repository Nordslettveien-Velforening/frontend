import { withApollo } from '../lib/apollo';

const IndexPage = () => {
    return (
    <>
        Index
    </>
  );
};

export default withApollo({ ssr: true })(IndexPage);
