const solar = document.querySelector(".solar-orbits");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let solarInView = true;

function updateSolarMotion() {
    if (reducedMotion.matches || !solarInView) {
        solar.pauseAnimations();
    } else {
        solar.unpauseAnimations();
    }
}

updateSolarMotion();
reducedMotion.addEventListener("change", updateSolarMotion);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
        solarInView = entry.isIntersecting;
        updateSolarMotion();
    });
    observer.observe(solar);
}
