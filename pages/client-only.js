import App from '../components/App';
import Movies from '../components/Movies';
import { withApollo } from '../lib/apollo';

const ClientOnlyPage = (props) => (
  <App>
    <Movies />
  </App>
);

export default withApollo()(ClientOnlyPage);
