import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { ALL_LANGUAGES } from '../apollo/queries/languages';

const useLanguages = () => {
  const client = useApolloClient()
  const data = client.readQuery({
    query: ALL_LANGUAGES,
  });

  if (!data) return []

  return data.allLanguages.data;
};

export default useLanguages;