var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var redB, greenB, blueB, pinkB, arrowGroup;

var score=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  sound = loudSound("burst.mp3");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  right_edge = createSprite(width,height/2,1,height)
  
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();
  rightB = new Group();
  rightB.add(right_edge);
  
  
   score = 0    
}

function draw() {
 background(0);
  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
   
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 5 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }  
  if(arrowGroup.isTouching(redB)){
    redB.destroyEach();
    console.log(redB.x)
    arrowGroup.destroyEach();
    score = score + 1
    sound.play();
  }
  if(redB.isTouching(rightB) && score != 0 ){
    score -= 5;
    redB.destroyEach();
  }
  if(arrowGroup.isTouching(greenB)){
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 2;
    sound.play();
  }
  if(greenB.isTouching(rightB) && score != 0){
    score -= 5;
    greenB.destroyEach();
  }
  if(arrowGroup.isTouching(blueB)){
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 3;
    sound.play();    
  }
  if(blueB.isTouching(rightB) && score != 0){
    score -= 5;
    blueB.destroyEach();
  }
  if(arrowGroup.isTouching(pinkB)){
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 4;   
    sound.play();
  }
  if(pinkB.isTouching(rightB) && score != 0){
    score -= 5;
    pinkB.destroyEach();
  }
    
  drawSprites();
  text("Score: "+ score, 300,50);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrow.setCollider("rectangle",15,0,300,50);
  arrowGroup.add(arrow);      
}

function redBalloon() {
  red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 5;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 5;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue)
}

function greenBalloon() {
  green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 5;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green)
}

function pinkBalloon() {
  pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 5;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink)
}

function keyPressed(){
  if (keyCode === 32) {
    createArrow();
  }
}
