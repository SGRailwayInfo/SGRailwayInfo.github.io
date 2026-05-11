const wrapper = document.getElementById('carouselWrapper');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let index = 1;
let isTransitioning = false;
const intervalTime = 5000;

async function initCarousel() {
    try {
        const response = await fetch('../img-carousel.json');
        const data = await response.json();
        renderCarousel(data);
    } catch (error) {
        console.error('Error loading carousel data:', error);
    }
}

function renderCarousel(items) {
    const firstClone = items[items.length - 1];
    const lastClone = items[0];
    const displayList = [firstClone, ...items, lastClone];

    wrapper.innerHTML = displayList.map(item => {
    const buttonColor = item.color && item.color.trim() !== "" ? item.color : "deepskyblue";
    const hasTitle = item.title && item.title.trim() !== "";
    const descriptionClass = hasTitle ? "" : "description-bold";
    const titleHtml = hasTitle ? `<h2>${item.title}</h2>` : "";

    return `
        <div class="carousel-slide">
            <img src="${item.image}" alt="${hasTitle ? item.title : "Rail Update"}">
            <div class="slide-overlay">
                <div class="slide-text">
                    ${titleHtml}
                    <p class="${descriptionClass}">${item.description}</p>
                    <a href="${item.link}" class="read-more" style="background-color: ${buttonColor}">Read More</a>
                </div>
            </div>
        </div>
    `;
    }).join('');

    wrapper.style.transform = `translateX(-${index * 100}%)`;
    startAutoSlide();
}

function updateSlide() {
    isTransitioning = true;
    wrapper.style.transition = 'transform 0.5s ease-in-out';
    wrapper.style.transform = `translateX(-${index * 100}%)`;
}

wrapper.addEventListener('transitionend', () => {
    isTransitioning = false;
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (index === slides.length - 1) {
        wrapper.style.transition = 'none';
        index = 1;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
    } else if (index === 0) {
        wrapper.style.transition = 'none';
        index = slides.length - 2;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
    }
});

function nextSlide() {
    if (isTransitioning) return;
    index++;
    updateSlide();
}

function prevSlide() {
    if (isTransitioning) return;
    index--;
    updateSlide();
}

let slideInterval;
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

nextButton.addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval);
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
    startAutoSlide();
});

initCarousel();
