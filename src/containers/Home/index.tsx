import { useContext } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import ThemeContext from '../../utils/ThemeContext';
import MainLayout from '../../components/MainLayout';
import GameTableData from '../../components/GameTableData';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_ALL_GAMES } from '../../apollo/queries/games';
import { GameType, ServerType } from '../../components/GameTableData/GameTableData.types';
import { SERVERS_BY_GAME } from '../../apollo/queries/servers';
// import ServersStats from './ServersStats';
// import PlayersStats from './PlayersStats';

const useStyles = makeStyles({
  container: {
    paddingTop: '2rem',
  },
});

interface GameTypeWithServers extends GameType {
  servers: ServerType[]
}

type QueryResult = {
  data?: {
    allGames: GameTypeWithServers[]
  }
}

const Home = () => {
  const classes = useStyles();
  const { locale } = useContext(ThemeContext);
  const { data }: QueryResult = useQuery(HOME_PAGE_ALL_GAMES);

  return (
    <MainLayout>
      <Head>
        <title>{locale('title')}</title>
      </Head>
      <Grid container spacing={3} className={classes.container}>
        {/* <Grid item xs={12} style={{ display: 'flex' }}>
          <ServersStats/>
          <PlayersStats/>
        </Grid> */}
        {data?.allGames.map(game => (
          <Grid item xs={12} key={game.id}>
            <GameTableData
              showTotal
              withAllServers
              game={game}
              apiQuery={SERVERS_BY_GAME}
              apiQueryVariables={{
                variables: {
                  game: game.slug,
                  limit: 10,
                  skip: 0,
                },
                fetchPolicy: 'cache-and-network',
              }}
              apiQueryField="allServers"
            />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Home;
