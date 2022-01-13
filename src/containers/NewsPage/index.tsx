import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo } from "react";
import { withApollo } from "../../apollo/withApollo";
import MainLayout from "../../components/MainLayout";
import Link from "../../components/mui/Link";
import { News } from "./news.types";
import useRouterQuery from "../../utils/useRouterQuery";
import NewsCard from "./NewsCard";
import omit from 'lodash/omit';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface Props {
  news: News[]
  total: number
}

type RouterQuery = {
  asPath: string
}

type RouterQueryProps = {
  [key: string]: string
}

const useStyles = makeStyles({
  title: {
    margin: '2rem 0 1rem 1rem'
  },
  newsItem: {
    margin: '1rem 0'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0'
  }
});

const NewsPage: React.FC<Props> = memo((props) => {
  const { news, total } = props;
  const classes = useStyles();
  const { asPath }: RouterQuery = useRouter();
  const query: RouterQueryProps = useRouterQuery()
  const currentPage = parseInt(query.page || '1', 10);

  return (
    <MainLayout>
      <Head>
        <title>Latest News</title>
      </Head>
      <div>
        <Typography variant="h4" component="div" className={classes.title}>Latest News of gaming world</Typography>
        {news.map((card: News) => (
          <div className={classes.newsItem} key={card.id}>
            <NewsCard card={card}/>
          </div>
        ))}
        <div className={classes.pagination}>
          <Pagination
            count={Math.round(total/10)}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => {
              if (item.page < 1 || item.page > total || item.page === currentPage) {
                return <PaginationItem {...item} />
              }

              let queryObject: RouterQueryProps = { ...query, page: String(item.page) };

              if (item.page === 1) queryObject = omit(queryObject, ['page']);

              const queryString = new URLSearchParams(queryObject).toString();

              return (
                <Link href={`${asPath.split('?')[0]}${queryString ? `?${queryString}` : ''}`} underline="none">
                  <PaginationItem
                    {...item}
                  />
                </Link>
              )
            }}
          />
        </div>
      </div>
    </MainLayout>
  )
})

export default withApollo({ ssr: true })(NewsPage);
