import {resize} from '../components/base';
import {resizeConv} from '../components/convert';
import cameraControl from '../controls/cameraControl';

const events =()=>{
  console.log('event',document.getElementById('MainCanvas'))

  window.addEventListener("resize",(event)=>{
    resize();
    resizeConv();
  })

  const canvas = document.getElementById('MainCanvas');
  canvas.addEventListener('mouseover',()=>{
    console.log('mouse is over!!!');
    cameraControl.enabled = true;
  })
  canvas.addEventListener('mouseout',()=>{
    console.log('mouse is out!!!');
    cameraControl.enabled = false;

  })
}

export default events;