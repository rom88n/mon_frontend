import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainLayout from '../../components/MainLayout';
import Head from 'next/head';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import { NextRouter, useRouter } from 'next/router';
import ThemeContext from '../../utils/ThemeContext';
import ServersTable from '../../components/ServersTable';
import { ALL_SERVERS } from '../../apollo/queries/servers';
import { useDebouncedCallback } from 'use-debounce'
import useRouterQuery from '../../utils/useRouterQuery';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '2rem'
  },
  filterContainer: {
    flex: '30% 0 0',
    position: 'relative',
  },
  filterResults: {
    flex: '70% 0 0',
    padding: '2px 4px',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
}));

interface RouterQueryProps {
  search?: string
  game?: string
  country?: string
}

const Search = () => {
  const classes = useStyles();
  const { lang } = useContext(ThemeContext);
  const { push }: NextRouter = useRouter();
  const query: RouterQueryProps = useRouterQuery()
  const [total, setTotal] = useState(0);

  const handleChange = (id: string, value: string | null) => {
    const pathname = `/${lang}/search`;
    if (id === 'game' && value === 'all') {
      return push({
        pathname,
        query: {
           ...omit(query, ['game']),
        },
     })
    }

    if (id === 'search' && value === '') {
      return push({
        pathname,
        query: {
           ...omit(query, ['search']),
        },
     })
    }

    if (id === 'country' && value === null) {
      return push({
        pathname,
        query: {
           ...omit(query, ['country']),
        },
     })
    }

    return push({
      pathname,
      query: {
         ...query,
         [id]: value ? encodeURIComponent(value) : value
      },
    })
  }

  const handleChangeDebounced = useDebouncedCallback(
    // function
    handleChange,
    // delay in ms
    500
  );

  const onCompleted = (data: any) => {
    const meta = data._allServersMeta;
    if (meta && meta.count !== total) {
      setTotal(meta.count)
    }
  }

  return (
    <MainLayout>
      <Head>
        <title>Search</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.filterContainer}>
          <SearchFilter handleChange={handleChange} variables={query}/>
        </div>
        <div className={classes.filterResults}>
          <SearchResults handleChange={handleChangeDebounced} variables={query} total={total}/>
        </div>
      </div>
      <div>
        {!isEmpty(query) && (
          <ServersTable
            pagination
            apiQuery={ALL_SERVERS}
            apiQueryVariables={{
              variables: { ...query, limit: 20, skip: 0 },
              fetchPolicy: 'cache-and-network',
            }}
            apiQueryField="allServers"
            onCompleted={onCompleted}
          /> 
        )}
      </div>
    </MainLayout>
  );
};

export default Search;