import Game from '../../../containers/Game';
import { withApollo } from '../../../apollo/withApollo';

export default withApollo({ ssr: true })(Game);
