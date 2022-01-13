import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from "../../components/mui/Link";
import { useContext } from "react";
import ThemeContext from "../../utils/ThemeContext";
import { News } from "./news.types";
import removeTags from "../../utils/removeTags";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '210px',
    borderRadius: '16px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: '350px',
    border: '6px solid #efefef',
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  readFull: {
    padding: '4px 10px',
    textTransform: 'capitalize'
  },
  readFullLabel: {
    fontSize: '13px'
  },
  description: {
    marginTop: '0.5rem'
  }
});

interface Props {
  card: News
}

const NewsCard: React.FC<Props> = (props) => {
  const { card } = props;
  const classes = useStyles();
  const { lang } = useContext(ThemeContext);

  const description = removeTags(card.description);
  return (
    <Card className={classes.root} elevation={0} raised>
       <CardMedia
        className={classes.cover}
        image={card.picture}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h5"
            component={Link}
            href={`/${lang}/news/${card.slug}`}
            dangerouslySetInnerHTML={{ __html: card.title }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
            dangerouslySetInnerHTML={{ __html:  `${description.substring(0, 300)}...` }}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            color="inherit"
            size="small"
            classes={{ root: classes.readFull, label: classes.readFullLabel }}
            endIcon={<ArrowForwardIosIcon/>}
            component={Link}
            underline="none"
            href={`/${lang}/news/${card.slug}`}
          >
            Read full
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default NewsCard;
