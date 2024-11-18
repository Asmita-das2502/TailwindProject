const navDialog = document.getElementById("nav-dialog");

function handlMenu() {
  navDialog.classList.toggle("hidden");
}

const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = 36 * 4;

// Define scrollHandler outside to make it globally accessible
function scrollHandler(element, isLTR, speed) {
  if (!element || typeof element.getBoundingClientRect !== "function") {
    console.error("Invalid element passed to scrollHandler");
    return;
  }

  const translateX =
    (window.innerHeight - element.getBoundingClientRect().top) * speed;
  let totalTranslate = 0;
  if (isLTR) {
    totalTranslate = translateX + initialTranslateLTR;
  } else {
    totalTranslate = -(translateX + initialTranslateRTL);
  }
  element.style.transform = `translateX(${totalTranslate}px)`;
}

function setupIntersectionObserver(element, isLTR, speed) {
  const intersectionCallback = (entries) => {
    const isIntersecting = entries[0].isIntersecting;

    if (isIntersecting) {
      // Pass element, isLTR, and speed using an arrow function
      document.addEventListener("scroll", () =>
        scrollHandler(element, isLTR, speed)
      );
    } else {
      document.removeEventListener("scroll", () =>
        scrollHandler(element, isLTR, speed)
      );
    }
  };

  const intersectionObserver = new IntersectionObserver(intersectionCallback);
  intersectionObserver.observe(element);
}

// Set up observers for each line element
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");
setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.8);

const dtElements = document.querySelectorAll("dt");
dtElements.forEach((element) => {
  element.addEventListener("click", () => {
    const ddId = element.getAttribute("aria-controls");
    const ddElement = document.getElementById(ddId);
    const ddArrowIcon = element.querySelectorAll("i")[0];
    ddElement.classList.toggle("hidden");
    ddArrowIcon.classList.toggle("-rotate-180");
  });
});
