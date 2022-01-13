import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import ThemeContext from '../../utils/ThemeContext';
import MainLayout from '../../components/MainLayout';
import GameTableData from '../../components/GameTableData';
import { makeStyles } from '@material-ui/core/styles';
import { GAME_BY_SLUG } from '../../apollo/queries/games';
import { SERVERS_BY_GAME } from '../../apollo/queries/servers';
import { GameType } from '../../components/GameTableData/GameTableData.types';
import useRouterQuery from '../../utils/useRouterQuery';
// import TopServers from '../../components/TopServers';

const useStyles = makeStyles({
  container: {
    paddingTop: '2rem',
  },
});

type QueryResult = {
  loading: boolean
  called: boolean
  data?: {
    GameBySlug: GameType
  }
}

type QueryType = {
  gameSlug?: string
}

const Game = () => {
  const classes = useStyles();
  const { gameSlug }: QueryType = useRouterQuery();
  const { locale } = useContext(ThemeContext);
  const { data, called }: QueryResult = useQuery(GAME_BY_SLUG, { variables: { slug: gameSlug } });

  if (called && data?.GameBySlug) {
    const game = data?.GameBySlug;

    return (
      <MainLayout>
        <Head>
          <title>{game.title}</title>
        </Head>
        <Grid container spacing={3} className={classes.container}>
          {/* <Grid item xs={12}> */}
            {/* <TopServers */}
            {/*  servers={servers.slice(0, 8).map(item => ({ ...item, game }))} */}
            {/* /> */}
          {/* </Grid> */}
          <Grid item xs={12}>
            <GameTableData
              pagination
              showTotal
              game={game}
              apiQuery={SERVERS_BY_GAME}
              apiQueryVariables={{
                variables: {
                  game: gameSlug,
                  limit: 20,
                  skip: 0,
                },
                fetchPolicy: 'cache-and-network',
              }}
              apiQueryField="allServers"
            />
          </Grid>
        </Grid>
      </MainLayout>
    );
  }

  return false;
};

export default Game;
