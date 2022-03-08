function fadeOut(elementString) {
  const el = document.querySelector(elementString);
  el.classList.add("transition-long");
  el.classList.add("invisible");
  el.classList.add("hidden");
}

function fadeIn(elementString) {
  const el = document.querySelector(elementString);
  el.classList.add("invisible");
  el.classList.add("transition-long");
  el.classList.remove("hidden");
  el.classList.remove("invisible");
}
