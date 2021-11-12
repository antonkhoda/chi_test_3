const resultBlock = document.getElementById("result");
const sliderValueBlock = document.getElementById("sliderValue");
const rangePointerLow = document.querySelector('.range-pointer-low');
const rangePointerHigh = document.querySelector('.range-pointer-high');
const rangeMin = document.querySelector('.range-min');
const rangeMax = document.querySelector('.range-max');
const rangeCurrentMin = document.querySelector('.current-range-min');
const rangeCurrentMax = document.querySelector('.current-range-max');
const rangeBar = document.querySelector('.range-bar');
const randomizer = document.forms.randomizer;

function randomize() {
    let min = +rangeCurrentMin.innerHTML;
    let max = +rangeCurrentMax.innerHTML;
    if (min > max) {
        max = +rangeCurrentMin.innerHTML;
        min = +rangeCurrentMax.innerHTML;
    }

    let result = [];
    for (let i = 0; i < randomizer.slider.value; i++) {
        result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    resultBlock.innerText = result.join(" ");
}

randomizer.startRandom.addEventListener("click", function () {
    randomize();
});

randomizer.slider.addEventListener("input", function () {
    sliderValueBlock.innerText = this.value;
});

rangeCurrentMin.innerHTML = rangeMin.innerHTML;
rangeCurrentMax.innerHTML = rangeMax.innerHTML;
randomize();

//===============================================================

let leftPosition = 0;
let rightPosition = rangeBar.offsetWidth - 5;

function pointerMove(currentEvent, currentPointer) {
    currentEvent.preventDefault();

    let shiftX = currentEvent.clientX - currentPointer.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(currentEvent) {
        let newLeft = currentEvent.clientX - shiftX - rangeBar.getBoundingClientRect().left;
        let rightEdge = rangeBar.offsetWidth - currentPointer.offsetWidth;

        if (currentPointer.classList.contains('range-pointer-low')) {
            if (newLeft > rightPosition) {
                newLeft = rightPosition - 5;
            } else if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
        } else if (currentPointer.classList.contains('range-pointer-high')) {
            if (newLeft < leftPosition) {
                newLeft = leftPosition + 5;
            } else if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
        }

        currentPointer.style.left = newLeft + 'px';
        let positionInPersent = Math.round((newLeft * 103) / currentPointer.parentNode.offsetWidth);
        currentPointer.setAttribute('data-location', positionInPersent);
        let positionInPx = +rangeMin.innerHTML + Math.round((rangeMax.innerHTML - rangeMin.innerHTML) / 100 * positionInPersent);
        if (currentPointer.classList.contains('range-pointer-low')) {
            rangeCurrentMin.innerHTML = positionInPx;
            leftPosition = newLeft;
            currentPointer.parentElement.style.paddingLeft = newLeft + 'px';
        } else if (currentPointer.classList.contains('range-pointer-high')) {
            rangeCurrentMax.innerHTML = positionInPx;
            rightPosition = newLeft;
            currentPointer.parentElement.style.paddingRight = currentPointer.parentElement.offsetWidth - 10 - newLeft + 'px';
        }
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }
}

rangePointerLow.onmousedown = function (event) {
    pointerMove(event, this);
}

rangePointerHigh.onmousedown = function (event) {
    pointerMove(event, this);
}