import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  title: {
    paddingLeft: '.5rem',
    marginBottom: '.5rem',
  },
  total: {
    margin: '1rem 0 1rem .5rem',
    justifySelf: 'flex-end'
  }
}));

interface Props {
  handleChange: (id: string, value: string | null) => void
  total: number | null
  variables: {
    search?: string
    country?: string
    game?: string
  }
}

const SearchResults: React.FC<Props> = (props) => {
  const { handleChange, variables, total } = props;
  const classes = useStyles();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.id, e.target.value);

  return (
    <>
      <Typography component="div" variant="h6" className={classes.title}>
        Search
      </Typography>
      <Paper elevation={0}>
        <InputBase
          id="search"
          className={classes.input}
          placeholder="Type name, map, address"
          onChange={onChange}
          defaultValue={variables.search}
        />
      </Paper>
      <Typography component="div" variant="h6" className={classes.total}>
        Results: {total}
      </Typography>
    </>
  );
};

export default SearchResults;
