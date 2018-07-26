import {resize} from '../components/base';
import {resizeConv} from '../components/convert';
import cameraControl from '../controls/cameraControl';
import {convProps}from '../components/props';
const customEvents =()=>{
  // console.log('event',document.getElementById('MainCanvas'))

  window.addEventListener("resize",(event)=>{
    resize();
    resizeConv();
  })

  const canvas = document.getElementById('MainCanvas');
  canvas.addEventListener('mouseover',()=>{
    cameraControl.enabled = true;
  })
  canvas.addEventListener('mouseout',()=>{
    cameraControl.enabled = false;
    
  })
}

const customEventsCanv = () =>{
  const inside = [false,false,false,false,false,false]
  inside.map((n,i)=>{
    
    convProps.refs[i].addEventListener('mouseover',()=>{
      inside[i] = true;
      cameraControl.enabled = true;
    })
    convProps.refs[i].addEventListener('mouseout',()=>{
      inside[i] = false;
      if(inside.every(bool => !bool)){
        cameraControl.enabled = false;
      }
    })
  })
}

export {customEvents,customEventsCanv};