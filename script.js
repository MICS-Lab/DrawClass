const canvas = document.getElementById("canvas");
const saveButton = document.getElementById("saveButton");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
}

saveButton.addEventListener("click", saveDrawing);

function saveDrawing() {
  const dataURL = canvas.toDataURL("image/png");
  const formData = new FormData();
  formData.append("imageData", dataURL);

  fetch("save_image.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Drawing saved successfully!");
      } else {
        alert("Error saving drawing.");
      }
    })
    .catch((error) => {
      console.error("Error saving drawing:", error);
    });
}
