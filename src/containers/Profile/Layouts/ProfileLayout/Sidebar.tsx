import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { makeStyles, lighten } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '../../../../components/mui/Link';
import { useRouter } from 'next/router';
import Divider from '@material-ui/core/Divider';
import menuItems from './menuItems';
import { useApolloClient } from '@apollo/client';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '320px',
    background: '#fafafa',
  },
  image: {
    width: '200px',
    margin: '.5rem auto 0',
  },
  listItem: {
    '&:hover': {
      background: lighten(theme.palette.primary.main, 0.9),
    },
  },
  listItemActive: {
    background: lighten(theme.palette.primary.main, 0.9),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const router = useRouter();
  const client = useApolloClient();
  const [cookie, setCookie, removeCookie] = useCookies();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [open, setOpen] = useState(false);

  const handleDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onClick = useCallback((item) => () => {
    if (isMobile) setOpen(!open);

    if (item.onClick) {
      item.onClick({
        client,
        router,
        cookies: { data: cookie, setCookie, removeCookie },
      });
    }
  }, [open]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isMobile ? open : true}
      variant={isMobile ? undefined : 'permanent'}
      onOpen={handleDrawer}
      onClose={handleDrawer}
      classes={{ paper: classes.paper }}
      PaperProps={{ elevation: 0 }}
    >
      <img src="/" alt="" className={classes.image}/>
      <Divider/>
      <List disablePadding>
        {menuItems.map(item => (
          <ListItem
            button
            divider
            dense
            onClick={onClick(item)}
            classes={{
              root: classNames(classes.listItem, { [classes.listItemActive]: item.href === router.pathname }),
            }}
            key={item.label}
            // @ts-ignore
            component={item.href ? Link : undefined}
            href={item.href}
          >
            <ListItemIcon>
              <item.icon color="primary"/>
            </ListItemIcon>
            <ListItemText
              primary={item.label}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
