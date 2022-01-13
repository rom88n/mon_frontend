import * as React from 'react';
import { useContext, useState } from 'react';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '../mui/Link';
import ThemeContext from '../../utils/ThemeContext';
import { ServerType, GameType } from '../GameTableData/GameTableData.types';
import ImageFallback from '../Image';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { DocumentNode, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Rating from '../Rating';
import getGameMapSlug from '../../utils/getGameMapSlug';
import usePrevious from '../../utils/usePrevious';
import useRouterQuery from '../../utils/useRouterQuery';
import IPAddress from './IPAddress';

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

type ServersTableProps = {
  game?: GameType
  withAllServers?: boolean
  showTotal?: boolean
  pagination?: boolean
  apiQuery: DocumentNode
  apiQueryVariables: any
  apiQueryField?: string
  onCompleted?: (data: any) => void
}

type QueryResult = {
  loading: boolean
  called: boolean
  data: any
  previousData?: any
  refetch: (variables: any) => void
}

type RouterQuery = {
  asPath: string
}

type RouterQueryProps = {
  [key: string]: string
}

const ServersTable: React.FC<ServersTableProps> = (props) => {
  const { game, pagination, apiQuery, apiQueryVariables, apiQueryField, onCompleted } = props;
  const classes = useStyles();
  const { asPath }: RouterQuery = useRouter();
  const { lang, locale } = useContext(ThemeContext);
  const query: RouterQueryProps = useRouterQuery()
  const currentPage = parseInt(query.page || '1', 10);
  const previousApiQueryVariables = usePrevious(apiQueryVariables);

  const { data, called, refetch }: QueryResult = useQuery(apiQuery, {
    ...apiQueryVariables && {
      ...apiQueryVariables,
      variables: {
        ...apiQueryVariables.variables,
        skip: (currentPage - 1) * apiQueryVariables?.variables?.limit,
      },
      onCompleted,
    },
  });

  React.useEffect(() => {
    if (previousApiQueryVariables && !isEqual(apiQueryVariables, previousApiQueryVariables)) refetch(apiQueryVariables)
  }, [apiQueryVariables]);

  const renderPagination = () => {
    const count = Math.ceil(data[`_${apiQueryField}Meta`].count / apiQueryVariables?.variables?.limit);
    if (count > 1) {
      return (
        <Box display="flex" style={{ margin: '1rem', justifyContent: 'center' }}>
          <Pagination
            count={Math.round(count / 10)}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => {

              if (item.page < 1 || item.page > count || item.page === currentPage) {
                return <PaginationItem{...item} />
              }

              let queryObject: RouterQueryProps = { ...query, page: String(item.page) };

              if (item.page === 1) queryObject = omit(queryObject, ['page']);

              const queryString = new URLSearchParams(queryObject).toString();

              return (
                <Link href={`${asPath.split('?')[0]}?${queryString}`} underline="none">
                  <PaginationItem
                    {...item}
                  />
                </Link>
              )
            }}
          />
        </Box>
      );
    }

    return false;
  };

  return (
    <TableContainer className={classes.table}>
      {called && data && apiQueryField && data[apiQueryField].length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="35%">{locale('gameTable.name')}</TableCell>
              <TableCell width="20%" align="center">{locale('gameTable.address')}</TableCell>
              <TableCell width="25%" align="center">{locale('gameTable.map')}</TableCell>
              <TableCell width="10%" align="center">{locale('gameTable.players')}</TableCell>
              <TableCell width="10%" align="center">{locale('gameTable.rating')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[apiQueryField].map((server: ServerType & { game?: GameType }) => {
              const serverGame = game || server.game || { title: '', slug: '' };
              return (
                <TableRow key={server.id}>
                  <TableCell component="th" scope="row" className={classes.title}>
                    <Link href={`/${lang}/${serverGame.slug}/${server.id}`}>
                      {server.name}
                    </Link>
                  </TableCell>
                  <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                    <img
                      src={server.country ? `/countries/${server.country}.svg` : `/countries/unknown-country.png`}
                      alt={`${server.country} flag`}
                      className={classes.country}
                    />
                    <IPAddress host={server.host} port={server.port} />
                  </TableCell>
                  <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                    {server.map
                      ? (
                        <>
                          <span className={classes.map}>
                            <ImageFallback
                              src={`https://image.gametracker.com/images/maps/160x120/${getGameMapSlug(serverGame.slug)}/${server.map}.jpg`}
                              fallbackSrc={`/games/${serverGame.slug}.png`}
                              alt={`${serverGame.title} ${server.map}`}
                              height={20}
                              width={30}
                              objectFit="contain"
                            />
                          </span>
                          <Link href={`/${lang}/search?game=${serverGame.slug}&search=${server.map}`}>
                            {server.map}
                          </Link>
                        </>
                      ) : <div style={{ textAlign: 'center' }}>-</div>}
                  </TableCell>
                  <TableCell align="center">{server.players}/{server.maxPlayers}</TableCell>
                  <TableCell align="center">
                    <Rating
                      serverId={server.id}
                      rating={server.rating}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
      {pagination && data && apiQueryField && data[`_${apiQueryField}Meta`] && renderPagination()}
    </TableContainer>
  );
};

ServersTable.displayName = 'ServersTable';

export default ServersTable;
