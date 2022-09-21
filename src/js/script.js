import tabs from './modules/tabs';
import modal, {openModal} from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import slider from './modules/slider';
import timer from './modules/timer';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); //Появление модалки через 5 сек.

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
	////////////////////////////////////////////////////////

	// new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	"Меню 'Фитнес'",
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container',
	// 	'big'
	// 	).render();

	// new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	"Меню “Премиум”",
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	14,
	// 	'.menu .container'
	// ).render();

	// new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	"Меню 'Постное'",
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	21,
	// 	'.menu .container'
	// ).render();
/////////////////////////////////////////////////////////////////

// // меняем цвет кнопки
// const btnWhite = document.querySelector('.btn_white');
// let timer,
// 	i = 1;

// btnWhite.addEventListener('click', () => { // Меняем цвет кнопки по клику с задержкой 1с
// 	// const timer = setTimeout(text, 2000);
// 	timer = setInterval(changeColor, 500);
// });
// clearInterval(timer);

// let changeColor = () => {
// 		btnWhite.style.backgroundColor = color; // функция смена цвета кнопки
// 	if (i === 3) {
// 		clearInterval(timer);
// 	}
// 	console.log('t');
// 	i++;
// };
////////////////////////////////////////

////random

// // let max = 290,
// //     min = 180;

// let max = 240,
//     min = 112;

//     let randomColor = () => {
//         return `#${(Math.floor(Math.random() * (max - min) + min))}`;
//     };
// let color = randomColor();
// // let c2 = `#${c()}`;
// // console.log(c2);
// // console.log(typeof(c2));
/////////////////////////////////////////

//Параметры документа, окна и работа с ними

// const block = document.querySelector('.tabcontent__descr');
// const width = block.clientWidth;
// const height = block.clientHeight;

// // console.log(width, height);
// const btn = document.querySelector('.btn_white');
// btn.addEventListener('click', () => {
// 	block.style.height = block.scrollTop + 'px';
// });
// console.log(block.getBoundingClientRect());
// const style = window.getComputedStyle(block);
// console.log(style.display);

// console.log(document.documentElement.scrollTop);
//////////////////////////////////////////////////

// new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	"Меню 'Фитнес'",
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container'
	// ).render();

	// new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	"Меню “Премиум”",
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	14,
	// 	'.menu .container'
	// ).render();

	// new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	"Меню 'Постное'",
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	21,
	// 	'.menu .container'
	// ).render();
