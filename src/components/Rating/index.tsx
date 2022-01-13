import * as React from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RATING } from '../../apollo/mutations/rating';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

interface TopServersProps {
  serverId: string
  rating: number
}

const Rating: React.FC<TopServersProps> = (props) => {
  const { serverId, rating: initialRating } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    rating: initialRating || 0,
    voted: false
  });
  const [handleRating] = useMutation(ADD_RATING, {
    variables: { serverId },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.rating) {
        enqueueSnackbar('You have successfully rated this server.', { variant: 'success' });
        setState({ rating: data.rating, voted: true });
      }
    },
    onError: (error) => error?.message && enqueueSnackbar(
      'You have already rated this server',
      { variant: 'error' },
    ),
  });

  return (
    <>
      {state.rating}
      {!state.voted && (
        <ArrowRightAltIcon
          onClick={() => handleRating()}
          style={{
            transform: 'rotate(-90deg)',
            fontSize: '1rem',
            cursor: 'pointer',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </>
  );
};

Rating.displayName = 'Rating';

export default Rating;
