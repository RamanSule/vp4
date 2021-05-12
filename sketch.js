
var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;
var milk;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/dogImg1.png");
washroomDog=loadImage("Images/WashRoom.png");
sleepingDog=loadImage("Images/BedRoom.png");
garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/WashRoom.png");
bedroom=loadImage("Images/BedRoom.png");
milk=loadImage("images/Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
foodStock.set(20);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  milkB=createSprite(60,300,10,10);
  milkB.addImage(milk);
  milkB.scale=0.1;
  
}

function draw() {
  background("grey")
  foodObj.display();
   writeStock(foodS);
  
  if(foodS===0){
    dog.addImage(sadDog);
    milkB.visible=false;
  }
  else{
    dog.addImage(happyDog);
    milkB.visible=true;

  }
  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;

  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    dog.y=250;
    milkB.visible=false;
  }

  var bath=createButton("Bathe me");
  bath.position(300,130);
  if(bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroomDog);
    dog.scale=1;
    dog.y=250;
    milkB.visible=false;
  }

  var sleep=createButton("Go to sleep");
  sleep.position(300,130);
  if(sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(sleepingDog);
    dog.y=250;
    milkB.visible=false;
  }
 
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();

}





function writeStock(x){
  database.ref('/').update({Food:x});
}