import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { USER_DATA } from '../../../../apollo/mutations/user';
import { useRouter } from 'next/router';

type NotLoggedLayoutProps = {
  children: any
}

const NotLoggedLayout = ({ children }: NotLoggedLayoutProps) => {
  const client = useApolloClient();
  const data = client.readQuery({ query: USER_DATA });

  const router = useRouter();

  useEffect(() => {
    if (data?.authenticatedUser?.id) {
      router.push('/en/profile');
    }
  }, [data?.authenticatedUser]);

  return children;
};

export default NotLoggedLayout;
