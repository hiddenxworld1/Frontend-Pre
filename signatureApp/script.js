const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let color = "#531e99ff";
let bgColor = "#ffffff";
let fontSize = 5;

const colorPicker = document.getElementById("colorPicker");

const bgColorPicker = document.getElementById("bgColor");

const fontSizeSelect = document.getElementById("fontSize");

const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");
const retrieveBtn = document.getElementById("retreive");

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

colorPicker.addEventListener("input", (e) => {
  color = e.target.value;
});

bgColorPicker.addEventListener("input", (e) => {
  bgColor = e.target.value;
  canvas.style.backgroundColor = bgColor;
});

fontSizeSelect.addEventListener("change", (e) => {
  fontSize = e.target.value;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "signature.png";
  a.click();
});

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

canvas.addEventListener("mouseup", () => {
  const dataURL = canvas.toDataURL();
  localStorage.setItem("signature", dataURL);
});
