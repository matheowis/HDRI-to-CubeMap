import {renderer,mainScene,mainCamera,update} from '../components/base';
import customEvents from './events';
import {renderProps} from '../components/props';
const render = () => {
  console.log('Initial Rendering')
  customEvents();

  if(!renderProps.isRendering){
    renderProps.isRendering = true;
    update();
    requestAnimationFrame(eventTick);
  }
}
const eventTick = () => {
  renderer.render(mainScene,mainCamera);
  if(renderProps.isRendering){
    requestAnimationFrame(eventTick);
  }
}
export default render;