const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("min");
const secondHand = document.getElementById("sec");
const digital = document.getElementById("digital");
const dateDisplay = document.getElementById("date");
const zoneDisplay = document.getElementById("zone");
const ticksContainer = document.querySelector(".ticks");

if (ticksContainer) {
  for (let i = 0; i < 60; i += 1) {
    const tick = document.createElement("span");
    tick.style.setProperty("--i", i);
    if (i % 5 === 0) tick.classList.add("major");
    ticksContainer.appendChild(tick);
  }
}

if (zoneDisplay) {
  zoneDisplay.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function pad(value) {
  return String(Math.floor(value)).padStart(2, "0");
}

function tick() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  hourHand.style.transform = `rotate(${hours * 30}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
  secondHand.style.transform = `rotate(${seconds * 6}deg)`;

  if (digital && dateDisplay) {
    const displaySeconds = pad(seconds);
    const displayMinutes = pad(minutes);
    const displayHours = pad(now.getHours());
    digital.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    dateDisplay.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(now);
  }

  requestAnimationFrame(tick);
}

tick();
