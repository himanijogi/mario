
 var ground
 var mario 
var starImage
var score,life

var obstacleGroup,starGroup




 function preload(){
 groundImage=loadImage("ground.png")
marioImage=loadImage("mario.png")
   starImage=loadImage("star.png")
   blockImage=loadImage("blocks mario.png") 
}

function setup() {
  createCanvas(200,200)
score=0
  life=5
  //gameState=PLAY
  ground2=createSprite(100,150,100,10000)
  ground2.addImage(groundImage)
  ground2.scale=0.5
  ground=createSprite(100,150,100,10000)
  ground.addImage(groundImage)
  ground.scale=0.5
  mario=createSprite(50,100,100,10)
  mario.addImage(marioImage)
  mario.scale=0.1
 
  starsGroup = createGroup()
  obstacleGroup = createGroup()
}

function draw() {
  background("green")
  
   
  
      
  ground.velocityX=-1
  if (ground.x<50){
    ground.x=190
    
  }
  mario.velocityY = mario.velocityY + 0.8
  mario.collide(ground2)
   if (World.frameCount % 60 == 0) {
     star()
     //obstacle()
   }
  if (touches.length>85||keyDown("space")&&mario.y >=85){
    mario.velocityY=-8
    touches=[]
  }
  if (World.frameCount % 85 == 0) {
     //star()
     obstacle()
   }
  if (obstacleGroup.isTouching(mario)){
   mario.scale=mario.scale-0.02; 
   obstacleGroup.destroyEach();
   life=life-1
  } 
  
  if (mario.isTouching(starsGroup)){
    score=score+1
    mario.scale=mario.scale+0.02; 
    starsGroup.destroyEach()
  }
textSize(10);
  stroke("green");
  fill("white");
 
 drawSprites();
  text("score = "+score,15,20)
  text("life = "+life,15,30)
   if (life===0){
    ground.setVelocity(0,0)
  starsGroup.destroyEach()
  obstacleGroup.destroyEach()
  text("gameOver",80,80)
  score.visible=false
    mario.setVelocity(0,0)
    text("reload to restart",100,100)
     
  }
  
}

function star() {
  var star=createSprite(250,Math.round(random(30,110)),10,10)
  star.addImage(starImage)
  star.scale=0.02
  star.lifetime=200
  star.velocityX=-4
  starsGroup.add(star)
}


function obstacle(){
  
  var block=createSprite(250,Math.round(random(100,110)),20,20)
  block.addImage(blockImage)
  block.velocityX=-4
  block.scale=0.09
  obstacleGroup.add(block)
}

function reset(){
  ground.destroyEach(0,0)
  starGroup.destroyEach(0,0)
  obstacleGroup.destroyEach(0,0)
  text("gameOver",50,50)
  score.score=0
}