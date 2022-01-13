import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { pendingRequestsVar } from '../../apollo/withApollo';
import { useReactiveVar } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff9',
    zIndex: 99999,
    '& img': {
      height: '150px',
      width: 'auto',
    }
  },
});

function Loading(): JSX.Element | null {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const pendingRequests = useReactiveVar(pendingRequestsVar)

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  if (loading || pendingRequests > 0) {
    return (
      <div className={classes.root}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  return null;
}

export default Loading;
