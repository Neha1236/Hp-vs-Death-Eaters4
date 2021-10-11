var bg,bgImg;
var player, hpImg, hp_casting;
var dementer,dementerImg;
var hallows1,hallows2,hallows3;
var hallows1Img,hallows2Img,hallows3Img
var dementerGroup
var score = 0;
var life = 3;

var spells = 50;
var gameState = "fight"
var lose, winning ,explosionSound
var spellsImg


function preload(){
  
  hpImg = loadImage("assets/hp.png")
  hp_casting = loadImage("assets/hp_casting.png")

  hallows1Img = loadImage("assets/hallows_1.png")
  hallows2Img = loadImage("assets/hallows_2.png")
  hallows3Img = loadImage("assets/hallows_3.png")

  dementerImg = loadImage("assets/dementer.png")

  bgImg = loadImage("assets/bg.png")
spellsImg = loadImage("assets/spells.png");
lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  


player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(hpImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)



   hallows1 = createSprite(displayWidth-150,40,20,20)
   hallows1.visible = false
    hallows1.addImage("hallows1",hallows1Img)
    hallows1.scale = 0.4

    hallows2 = createSprite(displayWidth-100,40,20,20)
    hallows2.visible = false
    hallows2.addImage("hallows2",hallows2Img)
    hallows2.scale = 0.4

    hallows3 = createSprite(displayWidth-150,40,20,20)
    hallows3.addImage("hallows3",hallows3Img)
    hallows3.scale = 0.4
   
    dementerGroup = new Group();
    spellsGroup = new Group()
}

function draw() {
  background(0); 

  if(gameState === "fight"){
    if(life===3){
      hallows3.visible = true
      hallows1.visible = false
      hallows2.visible = false
    }
    if(life===2){
      hallows2.visible = true
      hallows1.visible = false
      hallows3.visible = false
    }
    if(life===1){
      hallows1.visible = true
      hallows3.visible = false
      hallows2.visible = false
    }

    if(life===0){
      gameState = "lost"
      
    }
    if(life===0){
      gameState = "lost"
      
    }

if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



if(keyWentDown("space")){
  spells = createSprite(displayWidth-1150,player.y-30,20,10)
  spells.addImage(spellsImg);
  spells.velocityX = 20
  
  spellsGroup.add(spells)
  player.depth = spells.depth
  player.depth = player.depth+2
  player.addImage(hp_casting)
  spells = spells-1
  explosionSound.play();
}

else if(keyWentUp("space")){
  player.addImage(hpImg)
}


if(spells==0){
  gameState = "spells"
  lose.play();
}


if(dementerGroup.isTouching(spellsGroup)){
  for(var i=0;i<dementerGroup.length;i++){     
      
   if(dementerGroup[i].isTouching(spellsGroup)){
        dementerGroup[i].destroy()
        spellsGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}


if(dementerGroup.isTouching(player)){

 for(var i=0;i<dementerGroup.length;i++){     
      
  if(dementerGroup[i].isTouching(player)){
       dementerGroup[i].destroy()
       life=life-1
       } 
 
 }
}


enemy();


drawSprites();

textSize(20)
fill("white")
text("Spells = " + spells,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

}


if(gameState == "lost"){
  
  textSize(50)
  fill("red")
  text("YOU ARE KISSED BY THE DEMENTOR ",300,300)
  dementerGroup.destroyEach();
  player.destroy();

}


else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  dementerGroup.destroyEach();
  player.destroy();

}
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}


else if(gameState == "spells"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of Spells!!!",470,410)
  dementerGroup.destroyEach();
  player.destroy();
  spellsGroup.destroyEach();

}
}


function enemy(){
  if(frameCount%50===0){

    
    dementer = createSprite(random(500,1100),random(100,500),40,40)

    dementer.addImage(dementerImg)
    dementer.scale = 0.15
    dementer.velocityX = -3
    dementer.debug= true
    dementer.setCollider("rectangle",0,0,400,400)
   
dementer.lifetime = 400
   dementerGroup.add(dementer)
  }

}