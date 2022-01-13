import Home from '../../containers/Home';
import { withApollo } from '../../apollo/withApollo';

export default withApollo({ ssr: true })(Home);
