// console.log('Webpack Works');
import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './react/components/MainPage';
import render from './three/render/render';

ReactDOM.render(<MainPage/>,document.getElementById('app'),()=>{
  render();
})