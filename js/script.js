var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game', {
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

    game.load.image('background', '../assets/map.png');
    // game.load.image('player', '../assets/swordguy.png');

    game.load.spritesheet('swordguywalk', '../assets/swordguywalk.png', 64, 36);
    game.load.spritesheet('enemy', "../assets/SkeletonWalk.png", 21.97, 33)

}

function create() {

    var background = game.add.tileSprite(0, 0, game.width, game.height, 'background');

    player = game.add.sprite(0, 0, 'swordguywalk');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('walk');

    enemy = game.add.sprite(100, 300, 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    enemy.animations.add('walk');

    // player.animations.play('walk', 50, true);

    // var swordguywalk = game.add.sprite(300, 200, 'swordguywalk');

    // var walk = swordguywalk.animations.add('swordguywalk');


    cursors = game.input.keyboard.createCursorKeys(); //arrow keys
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.W]);

}

function update() {
  player.body.velocity.set(0);
  enemy.body.velocity.set(0);

  // player.animations.paused = true;

  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.velocity.x = -PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.x = PLAYER_SPEED;
    enemy.animations.play('walk', 30);
    walk();
    // swordguywalk.animations.play('walk', 30, true);

  }
  else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.x = -PLAYER_SPEED;
    enemy.animations.play('walk', 30);
    walk();
    // swordguywalk.animations.play('walk', 30, true);
  }

  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.body.velocity.y = -PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.y = PLAYER_SPEED;
    enemy.animations.play('walk', 30);
    walk();
    // player.animations.play('walk', 30, true);
  }
  else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    player.body.velocity.y = PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.y = -PLAYER_SPEED;
    enemy.animations.play('walk', 30);
    walk();
    // swordguywalk.animations.play('walk', 30, true);
  }
}

function walk() {
  player.animations.play('walk', 30);
}
