var monkey, monkeyrunning,collided;
var bg, ground, bgImage;
var bananaimg, stoneimg, bananaGroup, stoneGroup;
var count;
var stop, state, play, FIRST = 1, SECOND =2, chance;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  collided = loadImage("Monkey_02.png");
  bgImage = loadImage("jungle.jpg")
  bananaimg=loadImage("banana.png");
  stoneimg=loadImage("stone.png");
  
  collided = loadImage("Monkey_10.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  state = play;
  chance = FIRST;
  
  count=0;
  
  monkey = createSprite(100,350);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("collided",collided);
  monkey.scale=0.2;
  monkey.velocityX += 5;

  //bg = createSprite(200,180,400,20);
  //bg.addImage("ground",bgImage);
  //bg.x = bg.width/2;
  //bg.velocityX = -3;
  
  ground = createSprite(displayWidth/2,height-200,displayWidth,10);
  ground.visible = false;
    
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  stroke("red");
  textSize(20);
  fill("red");
  textStyle("bold");
}

function draw() {console.log(monkey.y);
  background(bgImage);
  
  monkey.depth = monkey.depth + 1;
  monkey.collide(ground);
  monkey.velocityY += 0.5;

  ground.width += 10;
  
  if(state===play){
    
    if(keyDown("space") & monkey.y > 700) {
      monkey.velocityY = -15;
    }
  
    /*if (bg.x < 200){
      bg.x = bg.width/2;
    }*/
    
    spawnStones();
    spawnBananas();

    //camera.position.y = canvas/2;
    camera.position.x = monkey.x + 400;
  

  for(var i = 0; i < bananaGroup.length; i++){
    if(bananaGroup.get(i).isTouching(monkey)){
      bananaGroup.get(i).destroy();
      count += 2;
      monkey.scale += 0.025;
      //chance = SECOND;
    }
  }
 
  /*for(var i = 0; i < stoneGroup.length; i++){
    if(stoneGroup.get(i).isTouching(monkey) && chance >= SECOND){
      count -= 1;
      monkey.scale = 0.2;
      chance = FIRST
    }
  }*/
  
  for(var i = 0; i < stoneGroup.length; i++){
    if(stoneGroup.get(i).isTouching(monkey) && chance === FIRST){
      //count -= 1;
      //monkey.scale = 0.2;
      state = stop;
    }
  }
  
  
    
    /*for(var i = 0; i < stoneGroup.length; i++){
    if(stoneGroup.get(i).isTouching(monkey) && count === 0 && chance === FIRST){
      state = stop;
      chance = SECOND;
    }
  }*/
    
}
  
  if(state === stop){
    monkey.changeImage("collided",collided);
    monkey.velocityX = 0;
    
    //bg.velocityX = 0;
    
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);

    push();
    textSize(100);
    text("Game Over",camera.position.x,displayHeight/2);
    pop();
  }
  
  drawSprites();
  
  text("bananas: "+ count,camera.position.x + 300,50);
}

function spawnStones() {
  if(frameCount % 100 === 0) {
    var stone = createSprite(camera.position.x + 1000,height-250);
    stone.addImage("obstacle",stoneimg);
    stone.velocityX = -4;          
    stone.lifetime = 250;
    stone.scale=0.3;
    stone.setCollider("circle",-20,20,220);
    stoneGroup.add(stone);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var banana = createSprite(camera.position.x+1000);
    banana.y = Math.round(random(height-500,height-300));
    banana.addImage("food",bananaimg);
    banana.velocityX = -5;
    banana.lifetime = 200;
    banana.scale=0.1;
    banana.setCollider("rectangle",0,0,1000,500);
    bananaGroup.add(banana);
  }
}