import { useQuery } from "@apollo/react-hooks";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { GameType, ServerType } from "../../components/GameTableData/GameTableData.types";
import MainLayout from "../../components/MainLayout";
import { withApollo } from "../../apollo/withApollo";
import ServerInfo from "./ServerInfo";
// import Comments from "../../components/Comments";

type RouterType = {
  query: {
    serverId?: string
  }
}

type QueryResult = {
  loading: boolean
  called: boolean
  data?: {
    Server: GameType
  }
}


interface Props {
  server: ServerType & { game: GameType }
}

const useStyles = makeStyles({
  container: {
    paddingTop: '2rem',
  },
});

const Server: React.FC<Props> = ({ server }) => {
  const classes = useStyles();
  const { query }: RouterType = useRouter();

  return (
    <MainLayout>
      <Head>
        <title>{server.name || `${server.host}:${server.port}`} | {server.game.title}</title>
      </Head>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <ServerInfo server={server} />
        </Grid>
        {/* <Grid item xs={12}>
          <Comments/>
        </Grid> */}
      </Grid>
    </MainLayout>
  )
}

export default withApollo({ ssr: true })(Server);