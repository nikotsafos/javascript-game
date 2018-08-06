var game = new Phaser.Game(300, 300, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});
var player;
var cursors;
var PLAYER_SPEED = 200;

function init() {
  return
}
function update() {
  return
}

function preload() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.load.image('background', '../assets/tile.png');
    game.load.image('player', '../assets/swordguy.png');

    // game.load.spritesheet('swordguywalk', '/Users/nikotsafos/code/wdi20/javascript-game/assets/swordguywalk.png', 24, 24);

}

function create() {

    var background = game.add.tileSprite(0, 0, game.width, game.height, 'background');

    player = game.add.sprite(100, 200, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    // var swordguywalk = game.add.sprite(300, 200, 'swordguywalk');

    // var walk = swordguywalk.animations.add('swordguywalk');


    cursors = game.input.keyboard.createCursorKeys(); //arrow keys
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.W]);

}

function update() {
  player.body.velocity.set(0);

  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.velocity.x = -100;
    // swordguywalk.animations.play('walk', 30, true);

  }
  else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = 100;
    // swordguywalk.animations.play('walk', 30, true);
  }

  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.body.velocity.y = -100;
    // swordguywalk.animations.play('walk', 30, true);
  }
  else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    player.body.velocity.y = 100;
    // swordguywalk.animations.play('walk', 30, true);
  }
}
