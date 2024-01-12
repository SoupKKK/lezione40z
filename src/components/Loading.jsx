import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';



const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader color="#36D7B7" loading size={50}  />
    </div>
  );
};

export default Loading;
