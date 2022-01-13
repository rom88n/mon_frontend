// base
import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

// mui
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
//formik
import { useFormik } from 'formik';
// apollo
import { useMutation } from '@apollo/react-hooks';
import { USER_LOGIN } from '../../../apollo/mutations/user';
// components
import Link from '../../../components/mui/Link';
// utils
import { withApollo } from '../../../apollo/withApollo';
import { useCookies } from 'react-cookie';
import { handleSubmit } from './loginPageHelpers';
import { sessionToken } from '../../../utils/auth';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '20%',
    background: '#ecf0f1',
  },
  paper: {
    minWidth: '340px',
    maxWidth: '400px',
    width: '100%',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
  },
  submit: {
    marginTop: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '60px',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: '10px',
  },
  title: {
    lineHeight: '48px',
  },
});

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [cookie, setCookie] = useCookies([sessionToken]);

  const [handleLogin, { error }] = useMutation(USER_LOGIN, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => data.authenticate && setCookie(sessionToken, data.authenticate.token, { path: '/' }),
    onError: (error) => error?.message && enqueueSnackbar(
      error.message.substr(error.message.indexOf(']') + 1, error.message.length),
      { variant: 'error' }
    )
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit(handleLogin),
  });

  useEffect(() => {
    if (cookie[sessionToken]) router.push('/profile')
  }, [cookie]);

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.header}>
          <IconButton className={classes.backButton} component={Link} href="/">
            <ArrowBackIcon/>
          </IconButton>
          <Typography variant="h5" component="div" className={classes.title}>
            Вход в профиль
          </Typography>
        </div>
        <Paper className={classes.paper} elevation={0}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="email"
              size="small"
              margin="dense"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email}
              {...formik.errors.email && { helperText: formik.errors.email }}
            />
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="password"
              type="password"
              label="Пароль"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={!!formik.errors.password}
              {...formik.errors.password && { helperText: formik.errors.password }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              color="primary"
              className={classes.submit}
              disabled={formik.isSubmitting}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(LoginPage);

