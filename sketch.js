var dog,happyDog,database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood,foodObj;

function preload()
{
happyDog=loadImage("images/dogImg.png");
dogimg1=loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200,800);
dog=createSprite(600,400,5,5);
dog.addImage(dogimg1);

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
   lastFed=data.val();
  });

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);


}
 
 // fill("white");
  //textSize(15);
//text("Note: Press 'UP_ARROW' to feed the Dog milk",30,790);



function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  } else
  {
    x=x-1
  }

database.ref('/').update({
  Food:x
})
}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
  dog.addimage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}