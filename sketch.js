
//making global variabal for eliments
var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey, monkey_running;
var monkeycollide;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var score;
var sarvivalTime,higestsurvivalTime;

function preload() {

//adding monkey running animation 
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  //add banana image
  bananaImage = loadImage("banana.png");
  //adding obstacle image
  obstacleImage = loadImage("obstacle.png");
  //adding monkey collideing image
  monkeycollide = loadImage("sprite_1.png");

}



function setup() {
  createCanvas(600, 600);
 //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  console.log(monkey.y);
  
//createing ground
  ground = createSprite(90, 325, 1800, 10);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  
 //createing group
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
  
  //make defult sarvival time and score
  sarvivalTime = 0;
  higestsurvivalTime=0;
  score = 0;
 

}


function draw() {
  background(250);

  if (gameState === PLAY) {
    
    //adding gravity
    monkey.velocityY = monkey.velocityY + 0.4;
    
     //making infenite ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //scoreing system
    if (monkey.isTouching(FoodGroup)) {

      FoodGroup.destroyEach();
      score = score + 1;
    }

     //sarvival time text 
  sarvivalTime = sarvivalTime + Math.round(getFrameRate()/62.5);


     //jumping the monkey
    if (keyDown("space") && monkey.y >= 289) {
      monkey.velocityY = -12;
    }




    Banana();
    Obstacles();

    if (monkey.isTouching(obstacleGroup)) {

      gameState = END;

    }
  } else if (gameState === END) {
    
     //ending state of monkey
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.addImage(monkeycollide);

    sarvivalTime.visivle=true;

    //ending state of food
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    //ending state of obstacle
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    // ending state of ground 
    ground.velocityX = 0;

    if(sarvivalTime>higestsurvivalTime){ 

      higestsurvivalTime=sarvivalTime;

    }

   
    //present reseting text
    fill(rgb(124, 0, 0));
    textSize(30);
    text("press r to restart", 300, 300);

    if (keyDown("r")) {
      reset();
    }
  }

  monkey.collide(ground);
    

  stroke("white");
  fill("red");
  textSize(30);
  text("Survival Time: " + sarvivalTime, 300, 50);

  stroke("white");
  fill("red");
  textSize(30);
  test("H.S survival Time"+ higestsurvivalTime,300,70);

  drawSprites();
  
  //scoring text
  fill(rgb(235, 124, 25));
  textSize(20);
  text("score: " + score, 50, 420);

 
}

function reset() {
  
  //resrting the game 
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  sarvivalTime = 0;
  score = 0;

}


function Banana() {
  
  //making banana
  if (frameCount % 140 === 0) {
    var banana = createSprite(600, 320, 20, 20);
    banana.y = Math.round(random(40, 200));
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    banana.lifetime = 120;
    FoodGroup.add(banana);
  }

}


function Obstacles() {

  if (frameCount % 160 === 0) {
    
     //making obatacle
    var obstacle = createSprite(600, 290, 20, 25);
    obstacle.velocityX = -5
    obstacle.scale = 0.2;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 310, 410);
    
  }


}