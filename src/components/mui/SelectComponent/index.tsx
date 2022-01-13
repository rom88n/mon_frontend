import React, { useEffect } from 'react';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // width: '100%',
    },
    icon: {
      height: '20px',
      width: 'auto',
      marginRight: '.5rem',
      verticalAlign: 'bottom',
    },
  }),
);

interface SelectComponentProps {
  id: string
  label: string
  className?: string
  initialValue?: string
  onChange: (id: string, value: string) => void
  sources: {
    label: string
    value: string
    icon?: string
  }[]
}

const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const { sources, id, label, onChange, className, initialValue } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    onChange(id, event.target.value as string);
  };

  return (
    <FormControl variant="outlined" className={classNames(classes.formControl, className)} fullWidth size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        value={value}
        onChange={handleChange}
        label={label}
      >
        {sources.map(item => (
          <MenuItem value={item.value} key={item.label}>
            {item.icon && (<img src={item.icon} alt="" className={classes.icon}/>)}
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
