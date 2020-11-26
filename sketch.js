
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var  obstacleGroup , bananaGroup;
var survivalTime;
var ground;
var inivisibleGround;
var PLAY =1;
var END ;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,470);

  obstacleGroup = new Group();   
  bananaGroup = new Group();
  
         ground = createSprite(250,440,500,15);
         ground.shapeColor = "brown";
         ground.x = ground.width /2;
  
      invisibleGround = createSprite(250,442,500,10);
      invisibleGround.visible = false;
  
    monkey = createSprite(100,400,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.15;   
  
 survivalTime = 0;
  bananasCollected = 0;
  
}


function draw() {
       background("lightBlue");
 
    textSize(20);
        fill("black");
        text("SURVIVAL TIME:" + survivalTime,270,30);
  
    if(gameState===PLAY){
      
       ground.velocityX = -4;
                 if (ground.x > 0) {
                  ground.x = ground.width /2;
                  }

            if(keyDown("space")&& monkey.y >=50){
              monkey.velocityY = -15;
            }
            monkey.velocityY = monkey.velocityY + 0.6;

            monkey.collide(invisibleGround);

               spawnObstacle();
              spawnBanana();

            if(bananaGroup.isTouching(monkey)){
              bananaGroup.destroyEach();
            }
      
           
        survivalTime=Math.ceil(frameCount/frameRate()) 

      
        if(obstacleGroup.isTouching(monkey)){
          gameState = END;
        }  
    }
  
 else if(gameState===END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);

    }

  drawSprites();
}

function spawnObstacle(){
  if(frameCount%140===0){
    var obstacle = createSprite(430,400,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
  obstacleGroup.depth = monkey.depth;
  monkey.depth = monkey.depth+1;

}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,Math.round(random(120,230)),5,8);
    banana.addImage(bananaImage);
    banana.scale = 0.12;
  banana.velocityX = -3;
    
    bananaGroup.add(banana);
  }
}

