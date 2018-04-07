var fileUpload1 = document.getElementById('fileUpload1');
var fileUpload2 = document.getElementById('fileUpload2');
var fileUpload3 = document.getElementById('fileUpload3');
var fileUpload4 = document.getElementById('fileUpload4');
var fileUpload5 = document.getElementById('fileUpload5');
var fileUpload6 = document.getElementById('fileUpload6');

var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function readImage(event, index) {
  if (event.target.files && event.target.files[0]) {
      var FR = new FileReader();
      FR.onload = function(e) {
         var img = new Image();
         img.src = e.target.result;
         img.onload = function() {
           ctx.drawImage(img, 0, 0, 512, 512);
           ctx.clearRect(30,50, Math.random() * 100, Math.random() * 400);
         };
      };
      FR.readAsDataURL(event.target.files[0]);
  }
}

fileUpload1.onchange = (event) => { readImage(event, 1); };
fileUpload2.onchange = (event) => { readImage(event, 2); };
fileUpload3.onchange = (event) => { readImage(event, 3); };
fileUpload4.onchange = (event) => { readImage(event, 4); };
fileUpload5.onchange = (event) => { readImage(event, 5); };
fileUpload6.onchange = (event) => { readImage(event, 6); };

canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
};