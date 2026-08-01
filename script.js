const totalSlides = 14;
const slide = document.querySelector(".slide");
const backdrop = document.querySelector(".backdrop");
const currentSlideLabel = document.querySelector("#current-slide");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentSlide = 1;
let touchStartX = 0;
let transitionTimer;

function imagePath(number) {
  return `images/${number}.png`;
}

function showSlide(number) {
  const nextSlide = Math.min(Math.max(number, 1), totalSlides);

  if (nextSlide === currentSlide) return;

  currentSlide = nextSlide;
  clearTimeout(transitionTimer);
  slide.classList.add("is-changing");

  transitionTimer = setTimeout(() => {
    const source = imagePath(currentSlide);
    slide.src = source;
    slide.alt = `Mahishasura Mardhini story, slide ${currentSlide} of ${totalSlides}`;
    backdrop.style.backgroundImage = `url("${source}")`;
    currentSlideLabel.textContent = String(currentSlide).padStart(2, "0");

    previousButton.hidden = currentSlide === 1;
    nextButton.hidden = currentSlide === totalSlides;

    requestAnimationFrame(() => slide.classList.remove("is-changing"));
  }, 130);
}

previousButton.hidden = true;
previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
});

document.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 50) return;

    showSlide(currentSlide + (distance < 0 ? 1 : -1));
  },
  { passive: true },
);

for (let index = 2; index <= totalSlides; index += 1) {
  const image = new Image();
  image.src = imagePath(index);
}
