import * as React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';

interface Props {
  host: string
  port?: number
  bold?: boolean
}

const IPAddress: React.FC<Props> = (props) => {
  const { host, port, bold } = props;
  const { enqueueSnackbar } = useSnackbar();

  const copy = () => {
    var input = document.createElement('input');
    input.setAttribute('value', `${host}:${port}`);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    enqueueSnackbar('Address successfull copied!', { variant: 'success' });
  }

  const Wrapper = bold ? 'b' : React.Fragment;
  return (
    <span onClick={copy} style={{ cursor: 'pointer' }}>
      <Wrapper>{host}{port && `:${port}`}</Wrapper>
      <FileCopyIcon
        style={{
          fontSize: '.7rem',
          marginLeft: '0.3rem',
          color: '#747474'
        }}
      />
    </span>
  )
}

export default IPAddress;
