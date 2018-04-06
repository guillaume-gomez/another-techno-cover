var fileUpload1 = document.getElementById('fileUpload1');
var fileUpload2 = document.getElementById('fileUpload2');
var fileUpload3 = document.getElementById('fileUpload3');
var fileUpload4 = document.getElementById('fileUpload4');
var fileUpload5 = document.getElementById('fileUpload5');
var fileUpload6 = document.getElementById('fileUpload6');

var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function readImage() {
  if (this.files && this.files[0]) {
      var FR= new FileReader();
      FR.onload = function(e) {
         var img = new Image();
         img.src = e.target.result;
         img.onload = function() {
           ctx.drawImage(img, 0, 0, 512, 512);
         };
      };
      FR.readAsDataURL(this.files[0]);
  }
}

fileUpload1.onchange = readImage;
fileUpload2.onchange = readImage;
fileUpload3.onchange = readImage;
fileUpload4.onchange = readImage;
fileUpload5.onchange = readImage;
fileUpload6.onchange = readImage;

canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
};