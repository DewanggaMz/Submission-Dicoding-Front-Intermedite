import 'regenerator-runtime';
import './index.scss';
import setSlider from './script/components/sliders';
import main from './script/view/main';

window.addEventListener('DOMContentLoaded', () => {
  main();
  setSlider.swiperHero();
});