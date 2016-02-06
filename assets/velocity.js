var velocity = function(){
  this.speed = 1;
  this.lastFrameSpeedCount = 0;
  this.speedCount = 0;
  this.deltaSpeed = 0;
  this.deltaDecimal = 0;
  this.speedIncrement = 0.01;
  this.modifySpeed = function(i, d){
    console.log(this.speed);
    if (d == true){
      this.speed -= this.speedIncrement;
    } else{
      this.speed += this.speedIncrement;
    }
    if (this.speed < 0.1){
      this.speed = 0.1;
    }
    if (this.speed > 4){
      this.speed = 5;
    }
  }
  this.mouseSpeed = function(Xpos){
    Xpos = Xpos * 0.002;
    this.speed = Xpos;
  }
  this.incrementCount = function(){
    this.lastFrameSpeedCount = this.speedCount;
    this.speedCount += this.speed;
    this.deltaSpeed = Math.floor(this.speedCount - this.lastFrameSpeedCount);
    this.deltaDecimal += this.speedCount - Math.floor(this.speedCount);
    if (this.deltaDecimal >= 1){
      this.deltaSpeed += Math.floor(this.deltaDecimal);
      this.deltaDecimal = this.deltaDecimal - Math.floor(this.deltaDecimal);
    }
  }
}
