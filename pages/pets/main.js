import { scoreCheck } from '../../assets/scripts/scores.js';
import BurgerMenu from '../../assets/scripts/burger.js';
import Paginator from '../../assets/scripts/paginator.js';
import Popup from '../../assets/scripts/popup.js';

const burger = new BurgerMenu();
const popup = new Popup();
const carousel = new Paginator(popup);
console.log(scoreCheck());