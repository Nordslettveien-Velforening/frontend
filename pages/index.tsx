import React from "react";
import App from '../components/App';
import { withApollo } from '../lib/apollo';

const IndexPage = () => (
  <App>
    <h1>Nordslettveien velforening</h1>
  </App>
);

export default withApollo({ ssr: true })(IndexPage);
