import React from 'react';
import ProfileLayout from '../Layouts/ProfileLayout';
import { withApollo } from '../../../apollo/withApollo';

const MainPage = () => {
  return (
    <ProfileLayout>
      <div>
        profile
      </div>
    </ProfileLayout>
  );
};

export default withApollo({ ssr: false })(MainPage);
