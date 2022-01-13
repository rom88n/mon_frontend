import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import { Comment } from './Comments.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '1rem 0',
    width: '100%',
    border: '1px solid #f7f7f7',
  },
  avatar: {
    flex: '0 0 200px',
    display: 'flex',
    justifyContent: 'center',
  },
  noAvatar: {
    border: '2px solid #6666666b',
    borderRadius: '50%',
    padding: '20px',
    height: '60px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    
  }
})

type Props = {
  comment: Comment
}

const CommentItem: React.FC<Props> = (props) => {
  const { comment } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.avatar}>
        <div className={classes.noAvatar}>
          <PersonIcon style={{ fontSize: '40px' }} htmlColor="#6666666b"/>
        </div>
      </div>
      <div className={classes.content}>
      <Typography variant="h6" component="div">{comment.userName}</Typography>
      <Typography variant="body2" component="div">
        {comment.text}
      </Typography>
      </div>
    </div>
  )
}

export default CommentItem;
