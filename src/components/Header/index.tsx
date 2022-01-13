import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '../mui/Link';
import { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';
import useLanguages from '../../utils/useLanguages';
import LanguageSelect from './LanguageSelect';

const useStyles = makeStyles({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderRadius: 8,
    marginTop: '.5rem',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    margin: '0 .5rem',
  }
});

export default function Header() {
  const classes = useStyles();
  const { locale, lang } = useContext(ThemeContext);

  const menuItems = [
    {
      title: 'Добавить сервер',
      href: '/add-server',
    },
    {
      title: 'Список игр',
      href: '/games',
    },
    {
      title: 'Новости',
      href: '/news',
    },
    {
      title: 'Поиск',
      href: '/search',
    },
    // {
    //   title: 'Регистрация',
    //   href: '/profile/register',
    // },
    // {
    //   title: 'Вход',
    //   href: '/profile/login',
    // }
  ];

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Paper className={classes.toolbar} elevation={0}>
        <div className={classes.logoContainer}>
          {/*<IconButton*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*>*/}
          {/*  <MenuIcon/>*/}
          {/*</IconButton>*/}
          <Typography variant="h6" component={Link} href={`/${lang}`} underline="none">
            {locale('title')}
          </Typography>
        </div>
        <div className={classes.menu}>
          {menuItems.map(item => (
            <Button
              color="inherit"
              component={Link}
              href={`/${lang}${item.href}`}
              size="small"
              underline="none"
              key={item.title}
              className={classes.menuItem}
            >
              {item.title}
            </Button>
          ))}
          <LanguageSelect/>
        </div>
      </Paper>
    </AppBar>
  );
}