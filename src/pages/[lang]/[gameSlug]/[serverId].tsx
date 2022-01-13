import Server from '../../../containers/Server';
import { createClient, withApollo } from '../../../apollo/withApollo';
import { GET_SERVER } from '../../../apollo/queries/servers';
import { ServerType } from '../../../components/GameTableData/GameTableData.types';
import { NextPageContext } from 'next';

export async function getServerSideProps(ctx: NextPageContext) {
  const client = createClient(ctx)

  try {
    const { data } = await client.query({
      query: GET_SERVER,
      variables: { server: ctx.query.serverId }
    });

    return {
      props: {
        server: data.Server
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
  server: ServerType
}

const serverById = ({ server }: Props) => {
  return (
    <Server server={server} />
  )
};

serverById.displayName = 'ServerById';

export default serverById