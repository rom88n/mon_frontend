import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SelectComponent from '../../../components/mui/SelectComponent';
import { GameType } from '../../../components/GameTableData/GameTableData.types';
import { useQuery } from '@apollo/react-hooks';
import { ALL_GAMES } from '../../../apollo/queries/games';
import { ALL_SERVERS } from '../../../apollo/queries/servers';
import ServersTable from '../../../components/ServersTable';
import CountrySelect from '../../../components/mui/CountrySelect';
import { DebouncedState } from 'use-debounce/lib/useDebouncedCallback';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 1rem 1rem 0',
    padding: '.5rem 1rem 1.5rem'
  },
  field: {
    margin: '1rem 0',
  }
}));

type QueryResult = {
  loading: boolean
  data?: {
    games: Pick<GameType, 'id' | 'title' | 'slug'>[]
  }
  called: boolean
}

interface Props {
  handleChange: (id: string, value: string | null) => Promise<boolean>
  variables: {
    game?: string
    country?: string
  }
}

const SearchFilter: React.FC<Props> = (props) => {
  const { handleChange, variables } = props;
  const classes = useStyles();
  const { data = { games: [] }, called }: QueryResult = useQuery(ALL_GAMES, { fetchPolicy: 'no-cache' });

  const gamesSources = [
    {
      label: 'All',
      value: 'all'
    },
    ...data.games
    .map(({ title, slug }: Pick<GameType, 'id' | 'title' | 'slug'>) => ({
      label: title,
      value: slug,
      icon: `/games/${slug}.png`,
    }))
  ];

  return (
    <>
    <Paper className={classes.root} elevation={0}>
      <Typography component="div" variant="h6">
        Filter
      </Typography>
      {called && data.games.length > 0 && (
        <SelectComponent
          id="game"
          label="Game"
          onChange={handleChange}
          sources={gamesSources}
          className={classes.field}
          initialValue={variables.game ? data.games.find(game => game.slug === variables.game)?.slug : 'all'}
        />
      )}
      <CountrySelect 
        id="country"
        label="Country"
        onChange={handleChange}
        initialValue={variables.country}
      />
    </Paper>
    </>
  );
};

export default SearchFilter;
