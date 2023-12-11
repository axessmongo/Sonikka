const carouselList = document.querySelector('.in-ex-carousel__list');
const elems = Array.from(document.querySelectorAll('.in-ex-carousel__item'));

carouselList.addEventListener('click', function (event) {
    const newActive = event.target.closest('.in-ex-carousel__item');

    if (!newActive || newActive.classList.contains('in-ex-carousel__item_active')) {
        return;
    }

    update(newActive);
});

function update(newActive) {
    const newActivePos = newActive.dataset.pos;
    elems.forEach(item => {
        const itemPos = item.dataset.pos;
        item.dataset.pos = getPos(itemPos, newActivePos);
    });
}

function getPos(current, active) {
    const diff = current - active;
    return Math.abs(diff) > 2 ? -current : diff;
}
