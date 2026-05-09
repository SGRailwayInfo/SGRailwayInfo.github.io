const wrapper = document.getElementById('carouselWrapper');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let index = 0;
const totalSlides = slides.length;
const intervalTime = 5000;

function showSlide(n) {
    if (n >= totalSlides) {
        index = 0;
    } else if (n < 0) {
        index = totalSlides - 1;
    } else {
        index = n;
    }
    wrapper.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

let slideInterval = setInterval(nextSlide, intervalTime);

nextButton.addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
});

prevButton.addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
});
