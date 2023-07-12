import React, { useEffect } from 'react';

import {
  
  MDBIcon,

}
from 'mdb-react-ui-kit';

const Alert = ({ type, msg, icon, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  });
  
  return <h5 className={`alert alert-${type} fw-normal my-0 mt-1 mb-3 pb-3 mx-4`}
   style={{letterSpacing: '1px', borderRadius: 4}}>
   <MDBIcon fas icon={`${icon}`}/> &nbsp;&nbsp;{msg}
   </h5>
};

export default Alert;
