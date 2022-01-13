import { useRouter } from "next/router";
import pick from 'lodash/pick';

function useRouterQuery() {
  const { query, pathname, ...rest }: { query: any, pathname: string } = useRouter();
  const omitQuries = Object.keys(query).filter(q => !pathname.includes(q) || q !== 'lang');
  return pick(query, omitQuries);
}

export default useRouterQuery;
