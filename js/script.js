var player;
var cursors;
var bow;
var PLAYER_SPEED = 500;
var GAME_HEIGTH = 300;
var GAME_WIDTH = 300;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGTH, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});


function init() {
  return
}
function update() {
  return
}

function preload() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.load.tilemap('background', '../assets/map.json', null, Phaser.Tilemap.TILED_JSON);

    // game.load.image('background', '../assets/map.png');
    game.load.image('bow', '../assets/bow.png');
    game.load.image('apple', '../assets/apple.png');
    game.load.image('boots', '../assets/boots.png');
    game.load.image('cheese', '../assets/cheese.png');


    game.load.spritesheet('swordguywalk', '../assets/swordguywalk.png', 64, 29);
    game.load.spritesheet('enemy', "../assets/SkeletonWalk.png", 21.97, 33, 13);

}

function create() {

    var background = game.add.tileSprite(0, 0, game.width, game.height, 'background');

    player = game.add.sprite(0, 0, 'swordguywalk');
    game.physics.arcade.enable(player);
    // player.body.collideWorldBounds = true;

    player.animations.add('walk');

    enemy = game.add.sprite(100, 300, 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    enemy.animations.add('walk');

    bow = game.add.sprite(100, 250, 'bow');
    game.physics.arcade.enable(bow);
    bow.body.collideWorldBounds = true;

    apple = game.add.sprite(150, 100, 'apple');
    game.physics.arcade.enable(apple);
    apple.body.collideWorldBounds = true;

    cheese = game.add.sprite(100, 350, 'cheese');
    game.physics.arcade.enable(cheese);
    cheese.body.collideWorldBounds = true;

    boots = game.add.sprite(200, 250, 'boots');
    game.physics.arcade.enable(boots);
    boots.body.collideWorldBounds = true;

    game.camera.follow(player);

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
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
  //fire the Weapon
  fireWeapon();
}
if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
  switchWeapon();
}
  game.physics.arcade.overlap(player, enemy, hurtPlayer);
  game.physics.arcade.overlap(player, bow, collectBow);
  game.physics.arcade.overlap(player, apple, collectApple);
  game.physics.arcade.overlap(player, boots, collectBoots);
  game.physics.arcade.overlap(player, cheese, collectCheese);

}

function walk() {
  player.animations.play('walk', 30);
}

function hurtPlayer() {
  player.kill();
}

function collectApple() {
  player.kill();
  apple.kill();
  swal({
  title: 'You ate the pioson apple!',
  text: 'Thanks for playing!',
  type: 'warning',
  showCancelButtons: false,
  confirmButtonText: 'Aw man',
  closeOnConfirm: true
});
}

function collectBow() {
  bow.kill();
  $("#items").append("<img src='../assets/bow.png'>");
}

function collectBoots() {
  boots.kill();
  $("#items").append("<img src='../assets/boots.png'>");
}

function collectCheese() {
  cheese.kill();
  $("#items").append("<img src='../assets/cheese.png'>");
}
