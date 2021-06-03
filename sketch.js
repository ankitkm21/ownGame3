var start, finish;
var frog1, frog2;
var track, trackimg;
var path1, path2, pathimg;
var car1, car2, car3, car4, car5, car6, carsgroup, carsgroup2;
var coin, coinimg, coingroup, coingroup2;
var f1score=0, f2score=0;

function preload(){
  pathimg = loadImage("images/Path.PNG");
  frog1img = loadImage("images/frog1.png");
  frog2img = loadImage("images/frog2.png");

  //load car images
  car1 = loadImage("images/Car1.png");
  car2 = loadImage("images/Car2.png");
  car3 = loadImage("images/Car3.png");
  car4 = loadImage("images/Car4.png");
  car5 = loadImage("images/Car5.png");
  car6 = loadImage("images/Car6.png");

  lifeimg = loadImage("images/life.png");
  coinimg = loadImage("images/coin.png")

}

function setup(){
  createCanvas(displayWidth,displayHeight);

  //create start and finish line
  start = createSprite(displayWidth/2,720,displayWidth,10);
  finish = createSprite(displayWidth/2,displayHeight+200,displayWidth,10);

  //create frog sprites
  frog1 = createSprite(displayWidth/2-200,displayHeight-10,50,50);
  frog1.shapeColor="green";
  frog1.addImage(frog1img);
  frog1.scale = 0.4;
  frog1.setCollider("rectangle",0,-40,80,80);

  frog2 = createSprite(displayWidth/2+200,displayHeight-10,50,50);
  frog2.shapeColor="green";
  frog2.addImage(frog2img);
  frog2.scale = 0.4;
  frog2.setCollider("rectangle",0,-40,80,80);

  //create path sprites
  path1 = createSprite(displayWidth/2,displayHeight/2-130,displayWidth,50);
  path1.addImage(pathimg);
  path1.scale=1.35;

  path2 = createSprite(displayWidth/2,displayHeight/2+130,displayWidth,50);
  path2.addImage(pathimg);
  path2.scale=1.35;

  //create groups for cars
  carsgroup = new Group();
  carsgroup2 = new Group();
  coingroup = new Group();
  coingroup2 = new Group();
  
}

function draw(){
  background("yellow");

  //create the paths for frogs
  //image(pathimg,0,-displayHeight*4,displayWidth,displayHeight*5);
  //console.log(image.positionY);

  //create a line which separates both the players
  for(var i = 0; i<displayHeight*4; i=i+20){
    line(displayWidth/2,i,displayWidth/2,i+10)
  }

  //add movements 
  if(keyDown("w")){
    frog1.y = frog1.y-10
    f1score = f1score+1;
  }
  if(keyDown(UP_ARROW)){
    frog2.y = frog2.y-10
    f2score = f2score+1;
  }

  carsgroup.depth = frog1.depth+5;
  //path1.depth = frog1.depth;
  frog1.depth = frog1.depth+1;
  frog2.depth = frog1.depth+1;

 for (var i = 30; i < 250; i=i+50){
    var life = createSprite(i,30,20,20);
    life.addImage(lifeimg);
    life.scale=0.2;
  }

  for (var i = 1120; i < 1350; i=i+50){
    var life = createSprite(i,30,20,20);
    life.addImage(lifeimg);
    life.scale=0.2;
  } 

  if(frog1.isTouching(carsgroup) || frog1.isTouching(carsgroup2)){
    frog1.y=displayHeight-10;
    f1score=0;
  }

  if(frog2.isTouching(carsgroup) || frog2.isTouching(carsgroup2)){
    frog2.y=displayHeight-10;
    f2score=0;
  }

  spawnCars();

  if(frameCount % 100 ===0){
    coin = createSprite(frog1.x,Math.round(random(200,frog1.y)),20,20);
    coin.addImage(coinimg);
    coin.scale = 0.1;
    coingroup.add(coin);
  }
  if(frameCount % 100 ===0){
    coin = createSprite(frog2.x,Math.round(random(200,frog2.y)),20,20);
    coin.addImage(coinimg);
    coin.scale = 0.1;
    coingroup2.add(coin);
  }

  if(frog1.isTouching(coingroup)){
    f1score = f1score+10;
    coingroup.destroyEach();
  }

  if(frog2.isTouching(coingroup2)){
    f2score = f2score+10;
    coingroup2.destroyEach();
  }

  if(f1score===100){
    coingroup.destroyEach();
  }
  if(f2score===100){
    coingroup2.destroyEach();
  }

  drawSprites();

  textSize(30);
  fill("black");
  stroke("black");
  strokeWeight(2);
  text("Distance: " + f1score,10,80);

  textSize(30);
  fill("black");
  stroke("black");
  strokeWeight(2);
  text("Distance: " + f2score,1180,80)
}

function spawnCars(){
  if(frameCount % 60 === 0){
    var car = createSprite(displayWidth,displayHeight/2-130,25,25);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: car.addImage(car1);
       break;
      case 2: car.addImage(car2);
       break;
      case 3: car.addImage(car3);
       break;
      default : break;

    }

    car.velocityX = -6;
    car.lifetime = displayWidth/2;
    car.scale = 0.25;
    carsgroup.add(car);
    //car.depth = frog1.depth + 2;
    
  }

  if(frameCount % 60 === 0){
    var car = createSprite(10,displayHeight/2+130,25,25);

    var rand = Math.round(random(4,6));
    switch(rand) {
      case 4: car.addImage(car4);
       break;
      case 5: car.addImage(car5);
       break;
      case 6: car.addImage(car6);
       break;
      default : break;

    }

    car.velocityX = 6;
    car.lifetime = displayWidth/2;
    car.scale = 0.25;
    carsgroup2.add(car);
    //car.depth = frog1.depth + 2;
    
  }
}

