import Games from '../../containers/Games';
import { withApollo } from '../../apollo/withApollo';

export default withApollo({ ssr: true })(Games);
