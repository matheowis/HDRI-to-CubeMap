
import {renderer,mainScene,mainCamera,update} from '../components/base';
import customEvents from './events';
import {renderProps} from '../components/props';
import tickAnimation from './tickAnimation';
import {convRender} from '../components/convert';
const render = () => {
  console.log('Initial Rendering')
  

  if(!renderProps.isRendering){
    renderProps.isRendering = true;
    update();
    customEvents();
    requestAnimationFrame(eventTick);
  }
}
const eventTick = () => {
  tickAnimation();
  renderer.render(mainScene,mainCamera);
  convRender();
  if(renderProps.isRendering){
    requestAnimationFrame(eventTick);
  }
}
export default render;