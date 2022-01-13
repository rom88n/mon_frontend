import * as React from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Link from '../mui/Link';
import ThemeContext from '../../utils/ThemeContext';
import { ServerType, GameType } from './GameTableData.types';
import ImageFallback from '../Image';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { DocumentNode, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Rating from '../Rating';
import getGameMapSlug from '../../utils/getGameMapSlug';
import ServersTable from '../ServersTable';

const useStyles = makeStyles(theme => ({
  root: {
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  header: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'inherit',
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
  table: {
    background: theme.palette.background.default,
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  viewAll: {
    fontSize: '.9rem',
    fontWeight: 500,
    '& svg': {
      fontSize: '1rem',
      verticalAlign: 'middle',
      marginLeft: '.5rem',
    },
  },
  map: {
    height: '20px',
    width: '30px',
    verticalAlign: 'middle',
    marginRight: '.3rem',
  },
  total: {
    alignSelf: 'flex-end',
    marginLeft: '1rem',
    lineHeight: '1.55rem',
  },
  country: {
    maxHeight: '14px',
    height: 'auto',
    width: '18px',
    marginRight: '.3rem',
    verticalAlign: 'middle',
  },
}));

type GameTableDataProps = {
  game: GameType
  withAllServers?: boolean
  showTotal?: boolean
  pagination?: boolean
  apiQuery: DocumentNode
  apiQueryVariables: any
  apiQueryField?: string
}

type QueryResult = {
  loading: boolean
  called: boolean
  data: any
}

type RouterQuery = {
  asPath: string
  query: {
    page?: string
  }
}

const GameTableData: React.FC<GameTableDataProps> = (props) => {
  const { game, withAllServers, pagination, apiQuery, apiQueryVariables, apiQueryField, showTotal } = props;
  const classes = useStyles();
  const [total, setTotal] = React.useState(0);
  const { asPath, query: { page = '1' } }: RouterQuery = useRouter();
  const { lang, locale } = useContext(ThemeContext);

  const onCompleted = (data: any) => {
    const meta = data[`_${apiQueryField}Meta`];
    if (meta && meta.count !== total) {
      setTotal(meta.count)
    }
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.header}>
        <Typography
          variant="h6"
          component="div"
        >
          <Box display="flex" style={{ alignItems: 'center' }}>
            <img src={`/games/${game.slug}.png`} alt="" className={classes.gameLogo}/>
            {withAllServers
              ? (
                <Link href={`/${lang}/${game.slug}`}>{game.title}</Link>
              ) : game.title}
            <Typography variant="caption" className={classes.total}>
              Всего серверов: {total}
            </Typography>
          </Box>

        </Typography>
        {withAllServers && (
          <Link href={`/${lang}/${game.slug}`} className={classes.viewAll}>
            {locale('gameTable.allServers')}
            <ArrowRightAltIcon/>
          </Link>
        )}
      </div>
      <ServersTable
        pagination={pagination}
        showTotal={showTotal}
        game={game}
        apiQuery={apiQuery}
        apiQueryVariables={apiQueryVariables}
        apiQueryField={apiQueryField}
        onCompleted={onCompleted}
      /> 
    </Paper>
  );
};

GameTableData.displayName = 'GameTableData';

export default GameTableData;
