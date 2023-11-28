import { scoreCheck } from './assets/scripts/scores.js';
import BurgerMenu from './assets/scripts/burger.js';
import Carousel from './assets/scripts/carousel.js';
import Popup from './assets/scripts/popup.js';

const burger = new BurgerMenu();
const popup = new Popup();
const carousel = new Carousel(popup);
console.log(scoreCheck());