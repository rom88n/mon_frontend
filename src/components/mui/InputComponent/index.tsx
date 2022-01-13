import React from 'react';
import TextField from '@material-ui/core/TextField';

interface InputComponentProps {
  id: string
  label: string
  onChange: (id: string, value: string) => void
}

const InputComponent: React.FC<InputComponentProps> = (props) => {
  const { id, label, onChange } = props;
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    onChange(id, event.target.value as string)
  };

  return (
    <TextField
      fullWidth
      id="standard-basic"
      label={label}
      variant="outlined"
      value={value}
      size="small"
      onChange={handleChange}
    />
  );
}

export default InputComponent;
