var MAX_HEIGHT = 100;

function render(src) {
  var image = new Image();
  image.onload = function() {
    var canvas = document.getElementById("myCanvas");
    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };
  image.src = src;
}