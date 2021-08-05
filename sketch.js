var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObject;

function preload(){
sadDog=loadImage("Images/Dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObject = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  foodObject.display();

  
 
  fill(255,255,254);
  textSize(15);


  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  
  var food_stock_val = foodObject.getFoodStock();
  if(food_stock_val <= 0){
      foodObject.updateFoodStock(food_stock_val *0);
  }else{
      foodObject.updateFoodStock(food_stock_val -1);
  }
  
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}