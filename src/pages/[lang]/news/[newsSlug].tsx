import { NextPageContext } from 'next';
import { createClient, withApollo } from '../../../apollo/withApollo';
import { NEWS_BY_SLUG } from '../../../apollo/queries/news';
import { News } from '../../../containers/NewsPage/news.types';
import SingleNewsPage from '../../../containers/SingleNewsPage';

export async function getServerSideProps(ctx: NextPageContext) {
  const client = createClient(ctx);
  try {
    const { data } = await client.query({
      query: NEWS_BY_SLUG,
      variables: {
        slug: ctx.query.newsSlug,
      }
    });

    return {
      props: {
        news: data.news,
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
  news: News
}

const newsBySlug = ({ news }: Props) => {
  return (
    <SingleNewsPage card={news} />
  )
};

newsBySlug.displayName = 'NewsBySlug';

export default newsBySlug;
