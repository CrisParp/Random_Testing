const btn = document.getElementById("btn");
const colorText = document.getElementById("color");
const modeSwitch = document.getElementById("modeSwitch");
const customControls = document.getElementById("customControls");
const hexInput = document.getElementById("hexInput");
const rRange = document.getElementById("rRange");
const gRange = document.getElementById("gRange");
const bRange = document.getElementById("bRange");
const sidebar = document.getElementById("sidebar");
const menuIcon = document.getElementById("menuIcon");
const customModeBtn = document.getElementById("customModeBtn");

let inCustomMode = false;

btn.addEventListener("click", () => {
  const randomColor = getRandomColor();
  document.body.style.backgroundColor = randomColor;
  colorText.textContent = randomColor;
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

modeSwitch.addEventListener("change", () => {
  inCustomMode = modeSwitch.checked;
  toggleMode();
});

customModeBtn.addEventListener("click", () => {
  inCustomMode = true;
  modeSwitch.checked = true;
  toggleMode();
  sidebar.classList.remove("open");
});

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function toggleMode() {
  if (inCustomMode) {
    btn.style.display = "none";
    colorText.style.display = "none";
    customControls.style.display = "flex";
    document.body.style.backgroundColor = "#000";
    updateFromRGB(); // Initial black
  } else {
    btn.style.display = "inline-block";
    colorText.style.display = "inline-block";
    customControls.style.display = "none";
  }
}

hexInput.addEventListener("input", () => {
  const val = hexInput.value;
  if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(val)) {
    document.body.style.backgroundColor = val;
  }
});

function updateFromRGB() {
  const r = parseInt(rRange.value) || 0;
  const g = parseInt(gRange.value) || 0;
  const b = parseInt(bRange.value) || 0;
  const color = `rgb(${r}, ${g}, ${b})`;
  document.body.style.backgroundColor = color;
}

[rRange, gRange, bRange].forEach(slider => {
  slider.addEventListener("input", updateFromRGB);
});
