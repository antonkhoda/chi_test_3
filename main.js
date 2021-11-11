const resultBlock = document.getElementById("result");
const sliderValueBlock = document.getElementById("sliderValue");
const randomizer = document.forms.randomizer;

function randomize() {
  let min = +randomizer.limit1.value;
  let max = +randomizer.limit2.value;
  if (min > max) {
    max = +randomizer.limit1.value;
    min = +randomizer.limit2.value;
  }

  let result = [];
  for (let i = 0; i < randomizer.slider.value; i++) {
    result.push(Math.floor(Math.random() * (max - min)) + min);
  }
  resultBlock.innerText = result.join(" ");
}

randomize();

randomizer.startRandom.addEventListener("click", function () {
  randomize();
});

randomizer.slider.addEventListener("input", function () {
  sliderValueBlock.innerText = this.value;
});