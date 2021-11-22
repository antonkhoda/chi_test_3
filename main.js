const resultBlock = document.querySelector(".js-result");
const sliderValueBlock = document.querySelector(".js-slider-value");
const rangePointerLow = document.querySelector('.js-range-pointer-low');
const rangePointerHigh = document.querySelector('.js-range-pointer-high');
const rangeMin = document.querySelector(".js-range-min");
const rangeMax = document.querySelector(".js-range-max");
const rangeCurrentMin = document.querySelector(".js-current-range-min");
const rangeCurrentMax = document.querySelector(".js-current-range-max");
const rangeBar = document.querySelector(".js-range-bar");
const randomizer = document.forms.randomizer;

function randomize() {
  let min = +rangeCurrentMin.innerHTML;
  let max = +rangeCurrentMax.innerHTML;

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
let rightPosition = rangeBar.offsetWidth - 15;
let isMouseFlag = false;

function pointerMove(currentEvent) {
  let currentPointer = currentEvent.target;
  let shiftX =
    currentEvent.clientX - currentEvent.target.getBoundingClientRect().left;

  if (isMouseFlag) {
    document.addEventListener("mousemove", onMouseMove)
  };

  function onMouseMove(currentEvent) {
    let newLeft = currentEvent.clientX - shiftX - rangeBar.getBoundingClientRect().left;
    let rightEdge = rangeBar.offsetWidth - currentPointer.offsetWidth;

    if (currentPointer.dataset.pointer == "low") {
      if (newLeft > rightPosition) {
        newLeft = rightPosition - 5;
      }
      if (newLeft < 0) {
        newLeft = 0;
      }
    }

    if (currentPointer.dataset.pointer == "high") {
      if (newLeft < leftPosition) {
        newLeft = leftPosition + 5;
      }
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
    }

    currentPointer.style.left = newLeft + "px";
    let positionInPersent = Math.round(
      (newLeft * 103) / currentPointer.parentNode.offsetWidth
    );
    currentPointer.setAttribute("data-location", positionInPersent);
    let positionInPx = +rangeMin.innerHTML +
      Math.round(
        ((rangeMax.innerHTML - rangeMin.innerHTML) / 100) * positionInPersent
      );

    if (currentPointer.dataset.pointer == "low") {
      rangeCurrentMin.innerHTML = positionInPx;
      leftPosition = newLeft;
      currentPointer.parentElement.style.paddingLeft = newLeft + "px";
    }

    if (currentPointer.dataset.pointer == "high") {
      rangeCurrentMax.innerHTML = positionInPx;
      rightPosition = newLeft;
      currentPointer.parentElement.style.paddingRight =
        currentPointer.parentElement.offsetWidth - 10 - newLeft + "px";
    }

    if (!isMouseFlag) {
      document.removeEventListener("mousemove", onMouseMove)
    };
  }
}

rangePointerLow.addEventListener("mousedown", (event) => {
  isMouseFlag = true;
  pointerMove(event);
});

rangePointerHigh.addEventListener("mousedown", (event) => {
  isMouseFlag = true;
  pointerMove(event);
});

document.addEventListener("mouseup", () => {
  isMouseFlag = false;
});