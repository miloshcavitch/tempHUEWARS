var ahora = Date.now()// initialized here because this is first event
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var worldColor = colorRay[Math.round(Math.random() * 764)];
var s = 1;
function star(x){
  switch(x){
    case 16:
      this.thesize = Math.random()*0.3 + 0.3;
      this.speed = this.thesize * s;
      break;
    case 8:
      this.thesize = Math.random()*0.6 + 0.6;
      this.speed = this.thesize * s;
      break;
    case 4:
      this.thesize = Math.random() * 1.2 + 1.2;
      this.speed = this.thesize * s;
      break;
    case 2:
      this.thesize = Math.random() * 2.4 + 2.4;
      this.speed = this.thesize * s;
      break;
    case 1:
      this.thesize = Math.random() * 4.8 + 4.8;
      this.speed = this.thesize * s;
      break;
    default:
      this.thesize = Math.random() * 4.8;
      this.speed = this.thesize * s;
  }
  this.posY = -20;
  this.posX = Math.round(Math.random() * canvas.width);
  this.updateStar = function(){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.thesize, this.thesize * 1.5);
    ctx.fillStyle = 'white';//colorRay[Math.round(Math.random() * 764)];// or colorRay[charColorIndex]; colorRay[charColorIndex];
    ctx.fill();
    ctx.closePath();
    this.posY += this.speed * vel.speed;
  }
}
var starLayers = [];
var starSpawnTimer = {spawnTimer: 0, then: 0};

//new one

function spacedSpawner(){
    var spaceStat = Math.random() * 31;
    var x;
    if (spaceStat > 15){
      x = 16;
    }
    if (spaceStat <= 15 && spaceStat > 7){
      x = 8;
    }
    if (spaceStat <= 7 && spaceStat > 3){
      x = 4;
    }
    if (spaceStat <= 3 && spaceStat > 1){
      x = 2;
    }
    if (spaceStat <= 1){
      x = 1;
    }
    starLayers.push(new star(x))
}
function starVelocityController(){
  //console.log(vel.deltaSpeed);
  for (var i = 0; i < vel.deltaSpeed; i++){
    spacedSpawner();
  }
}
function LayerTraverse(el){//runs updateStar for all the stars
    el.updateStar();
}
var fpsCounter = 0;
var lastSecond = 0;
var fpsString = '';

function updateStars(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
//  spaceBackground();
  ctx.fillStyle = spaceColor;//variable can be found in rainbowray.js
  ctx.fill();
  ctx.closePath();
  starVelocityController();
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
