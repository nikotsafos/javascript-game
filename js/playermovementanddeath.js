function walk() {
  // plays the walking animation
  player.animations.play('swordguywalk', 15);
  // plays the step sound, for footsteps
  if (steps.isPlaying === false) {
    steps.play();
  }
}

function killPlayer() {
    // adds you died to the gamelog, and displays a sweetalert
    $('#gamelog').prepend('You DIED</br>');
    swal({
    title: 'You DIED!',
    text: 'Thanks for playing!',
    type: 'warning',
    buttons: false,
    timer: 2000,
    showCancelButtons: false,
    confirmButtonText: 'Aw man',
    closeOnConfirm: true
  });
  // removes player sprite, stops music and removes the flames animation
  player.kill();
  music.pause();
  flames.animations.destroy();
  }

function collectApple() {
  // removes apple from the screen
  apple.kill();
  $('#gamelog').prepend('You ate the poison Apple</br>');
  // kills player. poison apple
  killPlayer();
}

function checkWin() {
  // checks if all 9 items have been picked up
  if (stuff === 9) {
    // updates gamelog
    $('#gamelog').prepend('YOU FOUND ALL THE ITEMS! YOU WIN!</br>');
    // stops player movement and animation. stops flames animation
    player.body.moves = false;
    player.animations.destroy();
    flames.animations.destroy();
    // alert that you won
    swal({
    title: 'You WIN!',
    text: 'Thanks for playing!',
    type: 'success',
    buttons: false,
    timer: 2000,
    showCancelButtons: false,
    confirmButtonText: 'Woohoo!',
    closeOnConfirm: true
  });
  }
}


function makeFlames() {
  // makes flames for flame group
  flame = flames.getFirstExists(false);
  flame.reset(game.world.randomX, game.world.randomY, 'fire');
}
