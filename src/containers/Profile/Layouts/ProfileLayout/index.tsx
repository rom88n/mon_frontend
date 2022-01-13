import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { USER_DATA } from '../../../../apollo/mutations/user';
import { sessionToken } from '../../../../utils/auth';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import CommonDataLoader from './CommonDataLoader';

type ProfileLayoutProps = {
  children: any
}

const useStyles = makeStyles({
  root: {
    background: '#ecf0f1',
    minHeight: '100vh',
    '@media only screen and (min-width: 601px)': {
      paddingLeft: '320px',
    },
  },
});

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const [cookie, setCookie, removeCookie] = useCookies([sessionToken]);
  const classes = useStyles();
  const [getUser, { called, loading, data }] = useLazyQuery(USER_DATA, { fetchPolicy: 'network-only' });
  const router = useRouter();

  useEffect(() => {
    if (cookie[sessionToken]) {
      getUser();
    } else {
      router.push('/en/profile/login');
    }
  }, [cookie]);

  useEffect(() => {
    if (called && !loading && cookie[sessionToken] && data?.authenticatedUser === null) {
      removeCookie(sessionToken);
    }
  }, [loading]);

  if (called && !loading && cookie[sessionToken] && data?.authenticatedUser) {
    return (
      <div className={classes.root}>
        <Sidebar/>
        {children}
      </div>
    );
  }

  return (<CommonDataLoader/>)
};

export default ProfileLayout;