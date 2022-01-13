import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useQuery } from '@apollo/client';
import { ALL_LANGUAGES } from '../../apollo/queries/languages';
import Link from '../mui/Link';
import { useRouter } from 'next/router';
import { memo, useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    background: '#fff',
    minWidth: '40px',
    padding: 0,
  },
  list: {
    width: '40px',
    background: '#fff',
  },
  menuItem: {
    padding: '0.5rem 0',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  }
});

const LanguageSelect = () => {
  const { data } = useQuery(ALL_LANGUAGES);
  const router = useRouter();
  const classes = useStyles();
  const { lang: currentLanguage } = useContext(ThemeContext)
  const anchorEl = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
   <>
     <Button
       onClick={handleClick}
       ref={ref => { anchorEl.current = ref }}
       className={classes.button}
     >
       {currentLanguage}
     </Button>
     <Menu
       disablePortal
       id="change-language"
       open={open}
       anchorEl={anchorEl.current}
       keepMounted
       onClose={handleClose}
       MenuListProps={{
         disablePadding: true,
         className: classes.list
       }}
     >
       {data?.allLanguages?.results?.map((lang: string) => (
         <MenuItem onClick={handleClose} key={lang} className={classes.menuItem}>
           <Link href={`/${lang}${router.asPath.substr(3, router.asPath.length)}`} underline="none">
            {lang.toUpperCase()}
           </Link>
         </MenuItem>
       ))}
     </Menu>
   </>
  );
};

export default LanguageSelect;