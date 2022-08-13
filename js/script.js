window.addEventListener('DOMContentLoaded', () => {

	//////////////////////Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
				 tabsContent = document.querySelectorAll('.tabcontent'),
				 tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {	  //скрываем контент(табы)
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {	//убираем у всех класс активности	
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i = 0) {	//добавляем класс активности
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	
	hideTabContent();
	showTabContent();
	
	tabsParent.addEventListener('click',(event) => {	//выбор табов по клику с помощью перебора табов
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//////////////////////////////////Timer

	const deadLine = '2022-08-15';  ///
	function getTimeReamening(endtime) {
		let  days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if(t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 3600 *  24));
			hours = Math.floor((t / (1000 * 3600) % 24));
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}
			
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'second': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const t = getTimeReamening(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.second);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);

	///////////////////Modal window

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');
	const modalCloseBtn = document.querySelector('[data-close]');


	function openModal () {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);
	}
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});


	function closeModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = '';
	}
	modalCloseBtn.addEventListener('click', closeModal);

	// modalCloseBtn.addEventListener('click', () => {
	// 	// modal.classList.add('hide');
	// 	// modal.classList.remove('show');
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = '';
	// });

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 5000); //Появление модалки через 5 сек.
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);


	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 10500;
			this.changeToUZS();
		}
		changeToUZS() {
			this.price = this.price * this.transfer;
		}
		render() {
			const element = document.createElement('div');
			if (this.classes === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `

				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> uzs/день </div>
				</div>
			`;
			this.parent.append(element);
		}
	}
	const div = new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню 'Фитнес'",
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item'
		// 'big'
	);
	div.render();

	const div2 = new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню “Премиум”",
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'.menu .container',
		'menu__item'
	);
	div2.render();

	const div3 = new MenuCard(
		"img/tabs/post.jpg",
		"post",
		"Меню 'Постное'",
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container',
		'menu__item'
	);
	div3.render();

	//Forms
		const form = document.querySelectorAll('form');

		const message = {
			loading: 'Loading...',
			success: 'Thanks! We will call you back...',
			failure: 'Something went wrong'
		};

	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const statusMessage = document.createElement('div');


			const request = XMLHttpRequest();
			request.open('POST', 'server.php');

			request.setRuquestHeader('COntent-type', 'multipart/form-data');
			const formData = new FormData(form);

			request.send(formData);
			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
				}
			});
		});
	}
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
	