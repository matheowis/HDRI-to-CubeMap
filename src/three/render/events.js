import {resize} from '../components/base';

const events =()=>{
  window.addEventListener("resize",(event)=>{
    resize();
  })
}

export default events;