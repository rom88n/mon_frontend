import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#74abd2',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f7f7f7',
      paper: '#efefef',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        color: 'unset',
        borderColor: '#dfdfdf',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        border: '1px solid #dfdfdf',
      }
    },
    MuiMenu: {
      list: {
        background: '#ffffff',
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'inherit',
        },
      },
    },
  },
});

export default theme;