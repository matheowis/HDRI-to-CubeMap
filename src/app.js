import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './react/components/MainPage';
import render from './three/render/render';
import preview from './three/scenes/preview';

ReactDOM.render(<MainPage/>,document.getElementById('app'),()=>{
  preview();
  render();
})