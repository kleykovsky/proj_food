function slider() {
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

    if (slides.length < 10) {
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
            if (i === 0) {
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
            if (offset === deleteNotDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex === slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `slideIndex`;
            }
            arrDots.forEach(dot => dot.style.opacity = '.5');
            arrDots[slideIndex - 1].style.opacity = 1;
        });

        // button left
        prev.addEventListener('click', () => {
            if (offset === 0) {
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex === 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if (slides.length < 10) {
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
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            arrDots.forEach(dot => dot.style.opacity = '.5');
            arrDots[slideIndex - 1].style.opacity = 1;
        });
    });

    // RegExp
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;