require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal, {openModal} from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import slider from './modules/slider';
import timer from './modules/timer';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000); //Appearance of modal after 30 sec.))

    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-10-16');
    cards();
    calculator();
    forms('form', modalTimerId);
    slider({
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        nexArrow: '.offer__slider-next',
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
});


