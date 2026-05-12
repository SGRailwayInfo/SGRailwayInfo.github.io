const exploreCards = document.querySelectorAll('.explore-card');

exploreCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        exploreCards.forEach(c => {
            if (c !== card) {
                c.classList.add('compressed');
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        exploreCards.forEach(c => {
            c.classList.remove('compressed');
        });
    });
});
