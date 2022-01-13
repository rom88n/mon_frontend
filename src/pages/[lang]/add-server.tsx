import Add from '../../containers/Add';
import { withApollo } from '../../apollo/withApollo';

export default withApollo({ ssr: true })(Add);
