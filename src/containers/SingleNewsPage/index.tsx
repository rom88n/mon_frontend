import Head from "next/head";
import { memo, useContext } from "react";
import { withApollo } from "../../apollo/withApollo";
import MainLayout from "../../components/MainLayout";
import { News } from "../NewsPage/news.types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from "../../components/mui/Link";
import Button from "@material-ui/core/Button";
import ThemeContext from "../../utils/ThemeContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Comments from "../../components/Comments";

interface Props {
  card: News
}

const useStyles = makeStyles({
  root: {
    borderWidth: '1px',
    borderStyle: 'solid',
    marginBottom: '1rem'
  },
  header: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'inherit',
    padding: '.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'inherit',
    padding: '.2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picture: {
    margin: '1rem 0',
    '& img': {
      width: '50%',
      height: 'auto',
      borderRadius: '4px'
    }
  },
  description: {
    padding: '0 1rem',
    '& p': {
      textIndent: '1rem'
    }
  },
  source: {
    margin: '1rem 0',
    padding: '0 1rem'
  },
  backButton: {
    margin: '1rem 0 1rem 1rem',
  },
  comments: {
    marginBottom: '3rem'
  }
});

const SingleNewsPage: React.FC<Props> = memo((props) => {
  const { card } = props;
  const classes = useStyles();
  const { lang } = useContext(ThemeContext);

  const handleBack = () => history.back();

  return (
    <MainLayout>
      <Head>
        <title>{card.title}</title>
      </Head>
      <div>
        <Link href={`/${lang}/news`} underline="none" onClick={handleBack}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            color="inherit"
            size="small"
            className={classes.backButton}
          >
            Back to News
          </Button>
        </Link>
        <Paper elevation={0} className={classes.root}>
          <div className={classes.header}>
            <Typography
              variant="h6"
              component="div"
              dangerouslySetInnerHTML={{ __html: card.title }}
            />
          </div>
          <div>
            <Box display="flex" justifyContent="center" className={classes.picture}>
              <img src={card.picture} alt={card.title} />
            </Box>
            <Typography
              variant="body2"
              component="div"
              dangerouslySetInnerHTML={{ __html: card.description }}
              className={classes.description}
            />
          </div>
          {card.sourceLink && (
            <Typography  variant="caption" component="div" className={classes.source}>
              Source: <Link href={card.sourceLink} target="_blank">{card.sourceLink}</Link>{card.sourceAuthor ? ` by ${card.sourceAuthor}` : ''}
            </Typography>
          )}
          <div className={classes.footer}>
            <Typography variant="caption" component="span"/>
            <Typography variant="caption" component="span">
              Views: {card.visitors || 0}
            </Typography>
          </div>
        </Paper>
        {/* <div className={classes.comments}> */}
          {/* <Comments variables={{ post: card.id }} /> */}
        {/* </div> */}
      </div>
    </MainLayout>
  )
})

export default withApollo({ ssr: true })(SingleNewsPage);
