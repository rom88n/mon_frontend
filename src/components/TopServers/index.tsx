import * as React from 'react';
import { useContext, memo } from 'react'
import { makeStyles } from '@material-ui/styles';
import { GameType, ServerType } from '../GameTableData/GameTableData.types';
import ThemeContext from '../../utils/ThemeContext';
import TopServer from './TopServer';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridGap: '12px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
  media: {
    height: 140,
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

interface TopServersProps {
  servers: (ServerType & { game: GameType })[]
}

const TopServers: React.FC<TopServersProps> = memo((props) => {
  const { servers } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {servers.map(server => (
        <TopServer
          key={`top-server-${server.id}`}
          server={server}
        />
      ))}
    </div>
  );
});

TopServers.displayName = 'TopServers';

export default TopServers;