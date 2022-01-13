import { NextPageContext } from 'next';
import NewsPage from '../../../containers/NewsPage';
import { createClient, withApollo } from '../../../apollo/withApollo';
import { ALL_NEWS } from '../../../apollo/queries/news';
import { News } from '../../../containers/NewsPage/news.types';

export async function getServerSideProps(ctx: NextPageContext) {
  const client = createClient(ctx);
  try {
    const { data } = await client.query({
      query: ALL_NEWS,
      variables: {
        lang: ctx.query.lang,
        limit: 10,
        skip: ctx.query.page ? (Number(ctx.query.page) - 1) * 10 : 0,
      }
    });

    return {
      props: {
        news: data.news,
        total: data.total.count
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    };
  }
}

interface Props {
  news: News[]
  total: number
}

const newsList = ({ news, total }: Props) => {
  return (
    <NewsPage news={news} total={total} />
  )
};

newsList.displayName = 'NewsBySlug';

export default newsList;
