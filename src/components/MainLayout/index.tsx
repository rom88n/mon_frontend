import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';

type MainLayoutType = {
  children: JSX.Element | JSX.Element[]
}

const useStyles = makeStyles(theme => ({
  '@global': {
    'body': {
      background: theme.palette.background.default,
      color: '#666666'
    }
  },
  header: {}
}));

type QueryResult = {
  loading: boolean
  data?: {
    allLanguages: {
      data: string[]
    }
  }
}

const MainLayout: React.FC<MainLayoutType> = ({ children }) => {
  useStyles()

  return (
    <Container maxWidth="lg">
      <Header/>
      {children}
    </Container>
  );
};

export default MainLayout;
