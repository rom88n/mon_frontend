import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MainLayout from '../../components/MainLayout';
import Head from 'next/head';
import SelectComponent from '../../components/mui/SelectComponent';
import InputComponent from '../../components/mui/InputComponent';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_GAMES } from '../../apollo/queries/games';
import { ADD_SERVER } from '../../apollo/mutations/servers';
import { GameType } from '../../components/GameTableData/GameTableData.types';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  paper: {
    minWidth: '40vw',
  },
});

type QueryResult = {
  loading: boolean
  data?: {
    games: Pick<GameType, 'id' | 'title' | 'slug'>[]
  }
}

const Add: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = useState({});
  const { data = { games: [] } }: QueryResult = useQuery(ALL_GAMES, { fetchPolicy: 'no-cache' });
  const [handleAddServer] = useMutation(ADD_SERVER, { variables: { data: state } });

  const handleChange = (id: string, value: string) => {
    if (id === 'game') {
      return setState({ ...state, [id]: { connect: { id: value } } });
    }
    if (id === 'host') {
      const obj: typeof state & { host?: string, port?: string } = { ...state };
      const splitData = value.split(':');

      if (splitData[0]) obj.host = splitData[0];
      if (splitData[1]) obj.port = splitData[1];

      return setState(obj);
    }

    return setState({ ...state, [id]: value });
  };

  const gamesSources = data.games
    .map(({ id, title, slug }: Pick<GameType, 'id' | 'title' | 'slug'>) => ({
      label: title,
      value: id,
      icon: `/games/${slug}.png`,
    }));

  return (
    <MainLayout>
      <Head>
        <title>Add servers</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div" align="center">
                Add server to base
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SelectComponent
                id="game"
                label="Game"
                onChange={handleChange}
                sources={gamesSources}
              />
            </Grid>
            <Grid item xs={12}>
              <InputComponent
                id="host"
                label="IP:PORT"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleAddServer()}
              >
                Add server
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </MainLayout>
  );
};

export default Add;
