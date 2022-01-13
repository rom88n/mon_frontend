import ViewListIcon from '@material-ui/icons/ViewList';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { ApolloClient } from '@apollo/react-hooks';
import { NextRouter } from 'next/router';
import { USER_LOGOUT } from '../../../../apollo/mutations/user';
import { CookieSetOptions } from 'universal-cookie';
import { sessionToken } from '../../../../utils/auth';

type onClickType = {
  client: ApolloClient<object>
  router: NextRouter
  cookies: {
    data:{ [p: string]: any },
    setCookie: ((name: string, value: any, options?: (CookieSetOptions | undefined)) => void),
    removeCookie: ((name: string, options?: (CookieSetOptions | undefined)) => void)
  }
}

export default [
  {
    label: '111',
    href: '/profile',
    icon: ViewListIcon,
  },
  {
    label: 'Выход',
    onClick: async ({ client, router, cookies }: onClickType) => {
      await client.mutate({ mutation: USER_LOGOUT, fetchPolicy: 'no-cache' });
      cookies.removeCookie(sessionToken)
      router.push('/en/profile/login');
    },
    icon: LogoutIcon,
  },
];