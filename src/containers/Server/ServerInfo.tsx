import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GameType, ServerType } from "../../components/GameTableData/GameTableData.types";
import getGameMapSlug from "../../utils/getGameMapSlug";
import get from 'lodash/get';
import ImageFallback from "../../components/Image";
import Grid from "@material-ui/core/Grid";
import { shareButtons, generalInfo } from "./server.helpers";
import ListItem from "./ListItem";
import { useContext } from "react";
import ThemeContext from "../../utils/ThemeContext";

const useStyles = makeStyles({
  title: {
    borderBottom: '1px solid #fff',
    height: '40px',
    lineHeight: '40px',
    padding: '0 1rem',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    padding: '0 2rem',
  },
  social: {
    alignSelf: 'center',
    '& button': {
      margin: '0 .1rem'
    }
  },
  serverScreen: {
    background: 'url(https://ip-games.ru/Tpl/img/maps_skr.png) top left no-repeat',
    minHeight: '280px',
    position: 'relative',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px 9px 0 9px',
    margin: '1rem 0',
    '& img': {
      width: '233px',
      maxHeight: '128px',
      borderRadius: '4px',
    }
  },
  info: {
    flex: '1',
    padding: '0 1rem',
    margin: '0 1rem',
    borderLeft: '1px solid #fff',
  }
});

interface Props {
  server: ServerType & { game: GameType }
}

const ServerInfo: React.FC<Props> = ({ server }) => {
  const classes = useStyles();
  const { lang } = useContext(ThemeContext);
  const generalData = generalInfo(server, lang)

  return (
    <Paper elevation={0}>
      <Typography component="div" className={classes.title}>
        {server.name}
      </Typography>
      <div className={classes.content}>
        <div className={classes.serverScreen}>
          <ImageFallback
            src={`https://image.gametracker.com/images/maps/160x120/${getGameMapSlug(server.game.slug)}/${server.map}.jpg`}
            fallbackSrc={`/no-map-image.png`}
            alt={`${server.name} ${server.map}`}
            height={233}
            width={233}
            objectFit="fill"
          />
          <div className={classes.social}>
            {shareButtons.map((Component: any, index: number) => (
            <Component.button url={get(global, 'location.href')} key={index}>
              <Component.icon size={32} round />
            </Component.button>
            ))}
          </div>
        </div>
        <div className={classes.info}>
        <Grid container spacing={2} direction="row" style={{ margin: 0, height: '100%' }}>
          <Grid item xs={6} style={{ paddingRight: '1rem', borderRight: '1px solid #fff', height: '100%' }}>
            {generalData.slice(0, 5).map(item => (
              <ListItem {...item} style={{ margin: '1rem 0' }} key={item.label}/>
            ))}
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: '1rem', height: '100%' }}>
            {generalData.slice(5, 10).map(item => (
              <ListItem {...item} style={{ margin: '1rem 0' }} key={item.label}/>
            ))}
          </Grid>
        </Grid>
        </div>
      </div>
    </Paper>
  )
}

export default ServerInfo;
