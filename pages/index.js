import App from '../components/App';
import Movies from '../components/Movies';
import { withApollo } from '../lib/apollo';

const IndexPage = () => (
  <App>
    <Movies />
  </App>
);

export default withApollo({ ssr: true })(IndexPage);
