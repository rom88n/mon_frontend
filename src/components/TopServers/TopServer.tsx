import * as React from 'react';
import { useContext, memo, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { GameType, ServerType } from '../GameTableData/GameTableData.types';
import Link from '../mui/Link';
import ThemeContext from '../../utils/ThemeContext';
import set = Reflect.set;
import ImageFallback from '../Image';

const useStyles = makeStyles({
  media: {
    height: 120,
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  map: {
    marginRight: '.5rem',
  },
});

interface TopServerProps {
  server: (ServerType & { game: GameType })
}

const TopServer: React.FC<TopServerProps> = memo((props) => {
  const { server } = props;
  const classes = useStyles();
  const { lang } = useContext(ThemeContext);

  return (
    <Card elevation={0}>
      <ImageFallback
        src={`https://image.gametracker.com/images/maps/160x120/${server.game.slug}/${server.map}.jpg`}
        fallbackSrc={`/games/${server.game.slug}.png`}
        alt={`${server.game.title} ${server.map}`}
        height={70}
        width={120}
        layout="responsive"
        objectFit="cover"
      />
      <CardContent>
        <Tooltip title={server.name}>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            className={classes.title}
          >
            <Link href={`${server.game.slug}/${server.id}`}>
              {server.name}
            </Link>
          </Typography>
        </Tooltip>
        <Box display="flex">
          <Typography gutterBottom variant="caption" component="div" className={classes.map}>
            {server.map}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {server.players}/{server.maxPlayers}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {server.host}/{server.port}
        </Typography>
      </CardContent>
    </Card>
  );
});

TopServer.displayName = 'TopServer';

export default TopServer;