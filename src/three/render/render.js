import {renderer,mainScene,mainCamera,update} from '../components/base';
import customEvents from './events';
import {renderProps} from '../components/props';
import tickAnimation from './tickAnimation';
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
  tickAnimation();
  renderer.render(mainScene,mainCamera);
  if(renderProps.isRendering){
    requestAnimationFrame(eventTick);
  }
}
export default render;