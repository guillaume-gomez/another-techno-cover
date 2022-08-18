// attributes
let canvasRemoved  = document.getElementById('canvas9');
let currentCanvas = document.getElementById('canvas7');
let ctxRemoved = canvasRemoved.getContext("2d");
let canvasRect = canvasRemoved.getBoundingClientRect();

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

function init() {
  window.scrollTo(0, 0);
  for(let i = 1; i <= 9; i++) {
    const canvas  = document.getElementById('canvas'+ i);
    const width = canvas.parentElement.clientWidth;
    canvas.width = width;
    canvas.height = width;

  }
  ctxRemoved = canvasRemoved.getContext("2d");
  canvasRect = canvasRemoved.getBoundingClientRect();
}

function readImage(event, index) {
  if (event.target.files && event.target.files[0]) {
      var FR = new FileReader();
      var canvas  = document.getElementById('canvas'+ index);
      var ctx = canvas.getContext("2d");
      FR.onload = function(e) {
         var img = new Image();
         img.src = e.target.result;
         img.onload = function() {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
         };
      };
      FR.readAsDataURL(event.target.files[0]);
    // set current layer
    currentCanvas = document.getElementById("canvas" + index);
    document.getElementById("layer" + index).checked = true;
  }
}

function setCurrentLayer(event, index) {
  currentCanvas = document.getElementById('canvas' + index);
}

function exportAsImage() {
  // create a second canvas
  var destinationCanvas = document.createElement("canvas");
  destinationCanvas.width = currentCanvas.width;
  destinationCanvas.height = currentCanvas.height;

  var destCtx = destinationCanvas.getContext('2d');
  //draw the original canvas onto the destination canvas
  for(i = 1; i <= 8; ++i) {
    var canvas = document.getElementById("canvas" + i);
    destCtx.drawImage(canvas, 0, 0);
  }

  const image = destinationCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}

function setMousePosition(e) {
    var ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
        mouse.x = ev.pageX - canvasRect.left;
        mouse.y = ev.pageY - canvasRect.top;
    } else if (ev.clientX) { //IE
        mouse.x = ev.clientX - canvasRect.left;
        mouse.y = ev.clientY -  document.body.scrollTop - canvasRect.top;
    }
}

function writeText(canvasId, string, x, y , size, color = '#000') {
  let canvas = document.getElementById(`canvas${canvasId}`);
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${size}px sans-serif`;
  ctx.fillStyle = color;
  ctx.fillText(string,x , y);
}

function writeAlbumName(string, x, y, size, color) {
  writeText('7', string, x, y, size, color);
}

function writeBandName(string, x, y, size, color) {
  writeText('8', string, x, y, size, color);
}

window.onload = () => {
  const fileUpload1 = document.getElementById('fileUpload1');
  const fileUpload2 = document.getElementById('fileUpload2');
  const fileUpload3 = document.getElementById('fileUpload3');
  const fileUpload4 = document.getElementById('fileUpload4');
  const fileUpload5 = document.getElementById('fileUpload5');
  const fileUpload6 = document.getElementById('fileUpload6');

  const checboxLayer1 = document.getElementById('layer1');
  const checboxLayer2 = document.getElementById('layer2');
  const checboxLayer3 = document.getElementById('layer3');
  const checboxLayer4 = document.getElementById('layer4');
  const checboxLayer5 = document.getElementById('layer5');
  const checboxLayer6 = document.getElementById('layer6');

  const bandName = document.getElementById("band-name");
  const bandNameX = document.getElementById("band-name-x");
  const bandNameY = document.getElementById("band-name-y");
  const bandNameFontSize = document.getElementById("band-name-font-size");
  const bandNameColor = $("#band-name-color");


  const albumTitle = document.getElementById("album-title");
  const albumTitleX = document.getElementById("album-title-x");
  const albumTitleY = document.getElementById("album-title-y");
  const albumTitleFontSize = document.getElementById("album-title-font-size");
  const albumTitleColor = $("#album-title-color");

  const saveButton = document.getElementById('export-to-png');


  fileUpload1.onchange = (event) => { readImage(event, 1); };
  fileUpload2.onchange = (event) => { readImage(event, 2); };
  fileUpload3.onchange = (event) => { readImage(event, 3); };
  fileUpload4.onchange = (event) => { readImage(event, 4); };
  fileUpload5.onchange = (event) => { readImage(event, 5); };
  fileUpload6.onchange = (event) => { readImage(event, 6); };

  checboxLayer1.onchange = (event) => { setCurrentLayer(event, 1); };
  checboxLayer2.onchange = (event) => { setCurrentLayer(event, 2); };
  checboxLayer3.onchange = (event) => { setCurrentLayer(event, 3); };
  checboxLayer4.onchange = (event) => { setCurrentLayer(event, 4); };
  checboxLayer5.onchange = (event) => { setCurrentLayer(event, 5); };
  checboxLayer6.onchange = (event) => { setCurrentLayer(event, 6); };

  saveButton.onclick = exportAsImage;

  canvasRemoved.onmousemove = function (e) {
      setMousePosition(e);
      if (isErasing) {
          rect.width = Math.abs(mouse.x - mouse.startX);
          rect.height = Math.abs(mouse.y - mouse.startY);
          rect.startX = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
          rect.startY = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
          ctxRemoved.clearRect(0, 0, canvasRect.width, canvasRect.height);
          ctxRemoved.fillRect(rect.startX, rect.startY, rect.width, rect.height);
          ctxRemoved.fillStyle = 'rgba(225,225,225,0.5)';
      }
  }

  canvasRemoved.onclick = function (e) {
    setMousePosition(e);
    if (isErasing) {
        isErasing = false;
        canvasRemoved.style.cursor = "default";
        var ctx = currentCanvas.getContext("2d");
        if (currentCanvas.id !== "canvas1") {
          ctx.clearRect(rect.startX, rect.startY, rect.width, rect.height);
        }
        ctxRemoved.clearRect(0, 0, canvasRect.width, canvasRect.height);
        rect = { startX: 0, startY: 0, width: 0, height: 0 };
        mouse = { startX: 0, startY: 0, x: 0, y: 0 };
    } else {
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        isErasing = true;
        rect = { startX: 0, startY: 0, width: 0, height: 0};
        canvasRemoved.style.cursor = "crosshair";
    }
  }

  albumTitle.onchange = (event) => {
    const x = albumTitleX;
    const y = albumTitleY;
    writeAlbumName(event.target.value, x.value, y.value, albumTitleFontSize.value, albumTitleColor.val());
  }

  albumTitleX.onchange = (event) => {
    const y = albumTitleY;
    writeAlbumName(albumTitle.value, event.target.value, y.value, albumTitleFontSize.value, albumTitleColor.val());
  }

  albumTitleY.onchange = (event) => {
    const x = albumTitleX;
    writeAlbumName(albumTitle.value, x.value,  event.target.value, albumTitleFontSize.value, albumTitleColor());
  }

  albumTitleFontSize.onchange = (event) => {
    writeAlbumName(albumTitle.value, albumTitleX.value, albumTitleY.value, event.target.value, albumTitleColor.val());
  }

  albumTitleColor.change( function() {
    const newColor = `#${$(this).val()}`;
    writeAlbumName(albumTitle.value, albumTitleX.value, albumTitleY.value, albumTitleFontSize.value, newColor);
  });

  bandName.onchange = (event) => {
    const x = bandNameX;
    const y = bandNameY;
    writeBandName(event.target.value, x.value, y.value, bandNameFontSize.value, bandNameColor.val());
  }

  bandNameX.onchange = (event) => {
    const y = bandNameY;
    writeBandName(bandName.value, event.target.value, y.value, bandNameFontSize.value, bandNameColor.val());
  }

  bandNameY.onchange = (event) => {
    const x = bandNameX;
    writeBandName(bandName.value, x.value, event.target.value, bandNameFontSize.value, bandNameColor.val());
  }

  bandNameFontSize.onchange = (event) => {
    writeBandName(bandName.value, bandNameX.value, bandNameY.value, event.target.value, bandNameColor.val());
  }

  bandNameColor.change( function() {
    const newColor = `#${$(this).val()}`;
    writeBandName(bandName.value, bandNameX.value, bandNameY.value, bandNameFontSize.value, newColor);
  });

  document.addEventListener('keydown', function(event) {
      const key = event.key;
      if (key === "Escape") {
        isErasing = false;
        canvasRemoved.style.cursor = "default";
        ctxRemoved.clearRect(0, 0, canvasRect.width, canvasRect.height);
        rect = { startX: 0, startY: 0, width: 0, height: 0 };
        mouse = { startX: 0, startY: 0, x: 0, y: 0 };
      }
  });
  init();

}
