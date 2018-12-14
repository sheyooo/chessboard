import React from 'react';

import knight from './../assets/knight.svg';

export default (props) => {

  return (
    <div style={{height: 'auto', width: 'auto'}}>
      <img style={{height: '100%', width: '100%'}} src={knight} alt="Knight"/>
    </div>
  );
};
