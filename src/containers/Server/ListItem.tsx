import { makeStyles } from "@material-ui/core/styles";
import { CSSProperties } from "react";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

interface Props {
  label: string
  value: string | JSX.Element | Function
  style?: CSSProperties
}

const ListItem: React.FC<Props> = ({ label, value, style }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={style}>
      <b>{label}</b>
      <span>{typeof value === 'function' ? value() : value}</span>
    </div>
  )
}

export default ListItem;
