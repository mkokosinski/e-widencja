import React from 'react';
import { LoaderContainer, LoaderPage, LoaderSpinner } from './LoadingStyles';

const Loading = ({ errors }) => {
  return (
    <LoaderPage>
      <LoaderContainer>
        {errors ? (
          errors.map((err) => <div>{err}</div>)
        ) : (
          <>
            <LoaderSpinner />
            <div>Ładowanie...</div>
          </>
        )}
      </LoaderContainer>
    </LoaderPage>
  );
};

export default Loading;
