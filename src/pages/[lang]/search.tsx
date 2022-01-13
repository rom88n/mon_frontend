import Search from '../../containers/Search';
import { withApollo } from '../../apollo/withApollo';

export default withApollo({ ssr: true })(Search);
