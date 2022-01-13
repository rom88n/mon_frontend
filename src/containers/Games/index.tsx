import { useContext } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import ThemeContext from '../../utils/ThemeContext';
import MainLayout from '../../components/MainLayout';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { ALL_GAMES_PAGE } from '../../apollo/queries/games';
import { GameType } from '../../components/GameTableData/GameTableData.types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../components/mui/Link';

const useStyles = makeStyles({
  container: {
    paddingTop: '2rem',
  },
  paper: {
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  header: {
    padding: '.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameLogo: {
    height: '24px',
    width: '24px',
    verticalAlign: 'sub',
    marginRight: '.5rem',
    borderRadius: '4px',
  },
  total: {
    minWidth: '160px'
  }
});

interface GameTypeWithServersCount extends GameType {
  servers: {
    count: number
  }
}

type QueryResult = {
  data?: {
    games: GameTypeWithServersCount[]
  }
}

const Games = () => {
  const classes = useStyles();
  const { lang, locale } = useContext(ThemeContext);
  const { data }: QueryResult = useQuery(ALL_GAMES_PAGE);

  return (
    <MainLayout>
      <Head>
        <title>Games</title>
      </Head>
      <Grid container spacing={3} className={classes.container}>
        {data?.games.map(game => (
          <Grid item xs={12} key={game.id}>
            <Paper elevation={0} className={classes.paper}>
              <div className={classes.header}>
                <Typography
                  variant="h6"
                  component="div"
                >
                  <Box display="flex" style={{ alignItems: 'center' }}>
                    <img src={`/games/${game.slug}.png`} alt="" className={classes.gameLogo}/>
                    <Link href={`/${lang}/${game.slug}`}>{game.title}</Link>
                  </Box>
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  className={classes.total}
                >
                  Всего серверов: {game.servers.count}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Games;
