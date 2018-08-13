function collectBow() {
  // removes bow. plays pickup sound. updates gamelog and item list
  bow.kill();
  pickip.play();
  $("#items").append("<img src='./assets/bow.png'>");
  $('#gamelog').prepend('Picked up a Bow</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}

function collectBoots() {
  // removes boots. plays pickup sound. updates gamelog and item list
  boots.kill();
  pickip.play();
  // boots also increase speed
  PLAYER_SPEED = PLAYER_SPEED * 1.25;
  $("#items").append("<img src='./assets/boots.png'>");
  $('#gamelog').prepend('Picked up Boots. Speed increased 25%</br>');
  // add to stuff
  stuff += 1;
  checkWin();
}

function collectCheese() {
  // removes cheese. plays pickup sound. updates gamelog and item list
  cheese.kill();
  pickip.play();
  $("#items").append("<img src='./assets/cheese.png'>");
  // add to stuff
  stuff += 1;
  checkWin();
}

function collectCup() {
  // removes cup. plays pickup sound. updates gamelog and item list
  cup.kill();
  pickip.play();
  $("#items").append("<img src='./assets/cup.png'>");
  $('#gamelog').prepend('Picked up a Cup</br>');
  // add to stuff
  stuff += 1;
  checkWin();
}

function collectGloves() {
  // removes gloves. plays pickup sound. updates gamelog and item list
  gloves.kill();
  pickip.play();
  $("#items").append("<img src='./assets/gloves.png'>");
  $('#gamelog').prepend('Picked up some Gloves</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}

function collectKey() {
  // removes key. plays pickup sound. updates gamelog and item list
  key.kill();
  pickip.play();
  $("#items").append("<img src='./assets/key.png'>");
  $('#gamelog').prepend('Picked up a Key</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}

function collectNecklace() {
  // removes necklace. plays pickup sound. updates gamelog and item list
  necklace.kill();
  pickip.play();
  $("#items").append("<img src='./assets/necklace.png'>");
  $('#gamelog').prepend('Picked up a Necklace</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}

function collectPotion() {
  // removes potion. plays pickup sound. updates gamelog and item list
  potion.kill();
  pickip.play();
  $("#items").append("<img src='./assets/potion.png'>");
  $('#gamelog').prepend('Picked up a Potion</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}

function collectRing() {
  // removes ring. plays pickup sound. updates gamelog and item list
  ring.kill();
  pickip.play();
  $("#items").append("<img src='./assets/ring.png'>");
  $('#gamelog').prepend('Picked up a Ring</br>');
  // adds to stuff
  stuff += 1;
  checkWin();
}
