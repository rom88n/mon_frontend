import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./CommentItem";
import { useQuery } from "@apollo/react-hooks";
import { COMMENTS_BY_ENTITY } from "../../apollo/queries/comments";
import TextField from "@material-ui/core/TextField";
import { Comment } from './Comments.types';

const useStyles = makeStyles({
  title: {
    height: '40px',
    lineHeight: '40px',
    fontWeight: 'bold',
    padding: '.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #f7f7f7',
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  comment: {
    width: 'calc(100% - 200px - 1rem)',
    margin: '1rem 1rem 1rem 200px'
  }
})

type Props = {
  variables: any
}

const Comments: React.FC<Props> = (props) => {
  const { variables } = props;
  const classes = useStyles();
  const { data, called } = useQuery(COMMENTS_BY_ENTITY, { variables });

  return (
    <Paper elevation={0}>
      <Typography component="div" className={classes.title}>
        Comments
      </Typography>
      <div className={classes.content}>
        {data?.comments.map((comment: Comment) => (
          <CommentItem comment={comment} key={comment.id}/>
        ))}
      </div>
      <TextField
        fullWidth
        label="Comment"
        multiline
        rows={4}
        placeholder="Enter Text"
        variant="outlined"
        className={classes.comment}
      />
    </Paper>
  )
}

export default Comments;
