const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//  CANVAS SIZE 
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();

//  STATE
let drawing = false;
let color = "#531e99ff";
let bgColor = "#ffffff";
let fontSize = 5;

//  CONTROLS 
const colorPicker = document.getElementById("colorPicker");
const bgColorPicker = document.getElementById("bgColor");
const fontSizeSelect = document.getElementById("fontSize");
const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");
const retrieveBtn = document.getElementById("retreive");

// GENERATE FONT OPTIONS 
fontSizeSelect.innerHTML = "";
for (let i = 0; i <= 50; i += 1) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `${i}px`;
  fontSizeSelect.appendChild(opt);
}
fontSizeSelect.value = fontSize; // set default

// DRAWING EVENTS 
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.lineWidth = fontSize;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

// INPUT HANDLERS 
colorPicker.addEventListener("input", (e) => {
  color = e.target.value;
});

bgColorPicker.addEventListener("input", (e) => {
  bgColor = e.target.value;
  canvas.style.backgroundColor = bgColor;
});

fontSizeSelect.addEventListener("change", (e) => {
  fontSize = Number(e.target.value);
});

//  CLEAR 
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// SAVE 
saveBtn.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "signature.png";
  a.click();
});

//  RETRIEVE 
retrieveBtn.addEventListener("click", () => {
  const saved = localStorage.getItem("signature");
  if (!saved) {
    alert("No Signature Found!");
    return;
  }

  const img = new Image();
  img.src = saved;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
});

//  AUTO SAVE ONLY IF DRAWN 
canvas.addEventListener("mouseup", () => {
  if (!drawing) return;
  const dataURL = canvas.toDataURL();
  localStorage.setItem("signature", dataURL);
});
