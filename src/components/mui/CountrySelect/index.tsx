/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { countries } from '../../../utils/countries';
import upperCase from 'lodash/upperCase';
import lowerCase from 'lodash/lowerCase';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

interface CountryType {
  code: string;
  label: string;
}

interface CountrySelectProps {
  id: string
  label: string
  className?: string
  initialValue?: string
  onChange: (id: string, value: string | null) => void
}

const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const { id, onChange, initialValue, label } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState<CountryType | null>(null);

  useEffect(() => {
    if (initialValue) {
      const country = countries.find(i => i.code === upperCase(initialValue)) || null;
      setValue(country);
    }
  }, [])

  const handleChange = (event: any, newValue: CountryType | null) => {
    setValue(newValue);
    onChange(id, newValue?.code ? lowerCase(newValue.code) : null);
  };

  return (
    <Autocomplete
      id={id}
      options={countries as CountryType[]}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          inputProps={params.inputProps}
          size="small"
        />
      )}
    />
  );
}

export default CountrySelect;
