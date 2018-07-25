import {resize} from '../components/base';
import {resizeConv} from '../components/convert';
import cameraControl from '../controls/cameraControl';
import {convProps}from '../components/props';
const customEvents =()=>{
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

const customEventsCanv = () =>{
  const inside = [false,false,false,false,false,false]
  inside.map((n,i)=>{
    
    convProps.refs[i].addEventListener('mouseover',()=>{
      inside[i] = true;
      cameraControl.enabled = true;
      console.log('inside of container')
    })
    convProps.refs[i].addEventListener('mouseout',()=>{
      inside[i] = false;
      if(inside.every(bool => !bool)){
        cameraControl.enabled = false;
      }
      console.log('out of container')
    })
  })
}

export {customEvents,customEventsCanv};