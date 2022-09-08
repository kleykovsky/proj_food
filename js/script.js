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
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//////////////////////////////////Timer

	const deadLine = '2022-08-17';  ///
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
	// const modalCloseBtn = document.querySelector('[data-close]');

	//open modal
	function openModal () {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);
	}
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	//close modal
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	// modalCloseBtn.addEventListener('click', closeModal);

	// modalCloseBtn.addEventListener('click', () => {
	// 	// modal.classList.add('hide');
	// 	// modal.classList.remove('show');
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = '';
	// });

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 300000); //Появление модалки через 5 сек.
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);


	// Используем классы для карточек

	class MenuCard {
		constructor(src, altimg, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.altimg = altimg;
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
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `

				<img src=${this.src} alt=${this.altimg}>
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
	async function getResource(url) {
		let res = await fetch(url);
		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	}

	//examle #1
	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
			});
		});


	// example with axios
	// axios.get('http://localhost:3000/menu' )
	// 	.then(response => {
	// 		response.data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
	// 		});
	// 	});
	
	//exampl #2
	// getResource('http://localhost:3000/menu')
	// 	.then(data =>  {
	// function createCard(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		price *= 10500;
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 		<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> uzs/день </div>
	// 			</div>
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
	// createCard(data);
	// 	});

	// GET request


//////////////////////////////////////////////////////////////////////////////////////////
	// const div = new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	"Меню 'Фитнес'",
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container',
	// 	'menu__item'
	// 	// 'big'
	// );
	// div.render();

	// const div2 = new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	"Меню “Премиум”",
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	14,
	// 	'.menu .container',
	// 	'menu__item'
	// );
	// div2.render();

	// const div3 = new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	"Меню 'Постное'",
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	21,
	// 	'.menu .container',
	// 	'menu__item'
	// );
	// div3.render();
//////////////////////////////////////////////////////////////////////////////////////

	//Forms
		const form = document.querySelectorAll('form');

		const message = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо! В ближайшее время мы вам перезвоним!',
			failure: 'Что то пошло не так...'
		};

		form.forEach(item => {
			binPostData(item);
		});

		const postData = async (url, data) => {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: data
			});
			return await res.json();

		};

	function binPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			// form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);

			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');

			// request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// const obj = {a: 23, b: 24};
			// console.log(Object.entries(obj));

				// Fetch request
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				form.reset();
			});
		});
	}

	//спинер + диалогом

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 2000);
	}


	// fetch('http://localhost:3000/menu')
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));

	// Slider

		let slideIndex = 1;
		let offset = 0;

		const slides = document.querySelectorAll('.offer__slide'),
			  slider = document.querySelector('.offer__slider'),
			  prev = document.querySelector('.offer__slider-prev'),
			  next = document.querySelector('.offer__slider-next'),
			  total = document.querySelector('#total'),
			  current = document.querySelector('#current'),
			  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
			  slidesField = document.querySelector('.offer__slider-inner'),
			  width = window.getComputedStyle(slidesWrapper).width;

		if(slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}

		// example #2(carousel)
		slidesField.style.width = 100 * slides.length + '%';
		slidesField.style.display = 'flex';
		slidesField.style.transition = '0.8s all';
		slidesWrapper.style.overflow = 'hidden';

		slides.forEach(slide => {
			slide.style.width = width;
		});

		slider.style.position = 'relative';

	const arrDots = [];
	function dotsNavigation() {
		const dots = document.createElement('ol');
		dots.classList.add('carousel-indicators');

		slider.append(dots);

		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement('li');
			dot.setAttribute('data-slide-to', i + 1);
			dot.classList.add('dot');
			if ( i === 0) {
				dot.style.opacity = 1;

			}
			dots.append(dot);
			arrDots.push(dot);
		}
	}
	dotsNavigation();

	function buttonNavigationSliders() {
		// button right
		next.addEventListener('click', () => {
			if(offset === +width.slice(0, width.length - 2) * (slides.length - 1)){
				offset = 0;
			} else {
				offset += +width.slice(0, width.length - 2);
			}
			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slideIndex === slides.length) {
				slideIndex= 1;
			} else {
				slideIndex ++;
			}

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = `slideIndex`;
			}
			arrDots.forEach(dot => dot.style.opacity = '.5');
			arrDots[slideIndex - 1].style.opacity = 1;
		});

		// button left
		prev.addEventListener('click', () => {
			if(offset === 0){
				offset = +width.slice(0, width.length - 2) * (slides.length - 1);
			} else {
				offset -= +width.slice(0, width.length - 2);
			}
			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slideIndex === 1) {
				slideIndex= slides.length;
			} else {
				slideIndex --;
			}

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			arrDots.forEach(dot => dot.style.opacity = '.5');
			arrDots[slideIndex - 1].style.opacity = 1;

		});
	}
	buttonNavigationSliders();

	arrDots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
			arrDots.forEach(dot => dot.style.opacity = '.5');
			arrDots[slideIndex - 1].style.opacity = 1;
		});
	});

	//example #1(journal)

	// showSlides(slideIndex);
	// if(slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }
	//
	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}
	//
	// 	slides.forEach((item) => item.style.display = 'none');
	// 	slides[slideIndex - 1].style.display = 'block';
	//
	// 	if (slides.length < 10) {
	// 		current.textContent =  `0${slideIndex}`;
	// 	} else {
	// 		current.textContent =  slideIndex;
	// 	}
	// }
	//
	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }
	//
	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });
	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });

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
