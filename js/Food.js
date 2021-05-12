class Food {
  constructor(){
 
  }

  display(){
    var button=createButton("Feed the Dog");
    button.position(400,130);
    if(button.mousePressed(function(){
      foodS=foodS-1;
      gameState=1;
      database.ref('/').update({'gameState':gameState});
  
      
    }));
    var addFood=createButton("Add Food");
    addFood.position(500,130);
    if(addFood.mousePressed(function(){
      foodS=foodS+1;
      gameState=2;
      database.ref('/').update({'gameState':gameState});
  
      
    }));

    

      
  }
}