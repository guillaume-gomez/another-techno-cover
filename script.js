var fileUpload1 = document.getElementById('fileUpload1');
var fileUpload2 = document.getElementById('fileUpload2');
var fileUpload3 = document.getElementById('fileUpload3');
var fileUpload4 = document.getElementById('fileUpload4');
var fileUpload5 = document.getElementById('fileUpload5');
var fileUpload6 = document.getElementById('fileUpload6');

//var canvas  = document.getElementById('canvas');
//var canvasRect = canvas.getBoundingClientRect();
//var ctx = canvas.getContext("2d");
//ctx.globalCompositeOperation="destination-over";

var mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0
};
var rect = {
  startX: 0,
  startY: 0,
  width: 0,
  height: 0
}

var isErasing = false;

function readImage(event, index) {
  if (event.target.files && event.target.files[0]) {
      var FR = new FileReader();
      var canvas  = document.getElementById('canvas'+ index);
      var ctx = canvas.getContext("2d");
      FR.onload = function(e) {
         var img = new Image();
         img.src = e.target.result;
         img.onload = function() {
          ctx.drawImage(img, 0, 0, 512, 512);
          if(index !== 1) {
            ctx.clearRect(0, 0, index *20, index *20);
          }
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

/*function setMousePosition(e) {
    var canvasRect = canvas.getBoundingClientRect();
    var ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
        mouse.x = ev.pageX - canvasRect.left;
        mouse.y = ev.pageY - window.pageYOffset - canvasRect.top;
    } else if (ev.clientX) { //IE
        mouse.x = ev.clientX - canvasRect.left;
        mouse.y = ev.clientY -  document.body.scrollTop - canvasRect.top;
    }
};

canvas.onmousemove = function (e) {
    setMousePosition(e);
    if (isErasing) {
        rect.width = Math.abs(mouse.x - mouse.startX);
        rect.height = Math.abs(mouse.y - mouse.startY);
        rect.startX = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
        rect.startY = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        //ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
        ctx.fillStyle="#FF0000";
    }
}

canvas.onclick = function (e) {
  if (isErasing) {
      isErasing = false;
      canvas.style.cursor = "default";
      console.log("finished.");
  } else {
      console.log("begun.");
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      isErasing = true;
      ctx.clearRect(rect.startX, rect.startY, rect.width, rect.height);
      rect = { startX: 0, startY: 0, width: 0, height: 0}
      canvas.style.cursor = "crosshair";
  }
}
*/
