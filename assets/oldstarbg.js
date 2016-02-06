var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var worldColor = colorRay[Math.round(Math.random() * 764)];

function star(){
  this.thesize = Math.random()*4;
  this.speed = this.thesize * 2;
  if (this.thesize < 0.6){
    this.speed = this.thesize * 2;
  }
  this.posY = 0;
  this.posX = Math.round(Math.random() * canvas.width);
  this.updateStar = function(){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.thesize, this.thesize * 1.5);
    ctx.fillStyle = colorRay[Math.round(Math.random() * 764)];;
    ctx.fill();
    ctx.closePath();
    this.posY += this.speed;
  }
}
var starLayers = [];
var starSpawnTimer = {spawnTimer: 0, then: 0};
function spawner(obj){
  var ahora = Date.now();
  if (ahora >= obj.spawnTimer + obj.then){
    obj.then = ahora;
    obj.spawnTimer = Math.round(Math.random() * 20);
    starLayers.push(new star());
  }
}

function LayerTraverse(el){//runs updateStar for all the stars
  if (el.posY >= canvas.height){
    el = new star(0);//trouble here

  } else {
    el.updateStar();
  }
}
var fpsCounter = 0;
var lastSecond = 0;
var fpsString = '';

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  spawner(starSpawnTimer, 0);
  starLayers.forEach(LayerTraverse);
  //counts frames per second for debugging, should be 50
  fpsCounter++;
  if (Date.now() >= lastSecond + 1000){
    fpString = fpsCounter + " FPS";
    fpsCounter = 0;
    lastSecond = Date.now();
  }
  ctx.font = "15px Arial"
  ctx.fillText(fpString, 10, 20);

}

setInterval(update, 20);
