var player;
var cursors;
var bow;
var enemy;
var level1;
var mapTiles;
var backgroundLayer;
var wallLayer
var map;
var PLAYER_SPEED = 250;
var GAME_HEIGTH = 500;
var GAME_WIDTH = 500;
var PLAYER_HEALTH = 50;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGTH, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});


function init() {
  return
}


function preload() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    game.load.tilemap('level1', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('gameTiles', 'assets/0x72_16x16DungeonTileset_walls.v1.png');


    game.load.image('bow', '../assets/bow.png');
    game.load.image('apple', '../assets/apple.png');
    game.load.image('boots', '../assets/boots.png');
    game.load.image('cheese', '../assets/cheese.png');
    game.load.image('cup', '../assets/cup.png');
    game.load.image('gloves', '../assets/gloves.png');
    game.load.image('necklace', '../assets/necklace.png');
    game.load.image('potion', '../assets/potion.png');
    game.load.image('ring', '../assets/ring.png');
    game.load.image('key', '../assets/key.png');


    game.load.spritesheet('swordguywalk', '../assets/swordguywalk.png', 64, 29);
    game.load.spritesheet('enemy', "../assets/SkeletonWalk.png", 21.97, 33, 13);
    // game.load.spritesheet('dead', "../assets/dead.png", 64, 29, 12);
    // game.load.spritesheet('attack', '../assets/attack.png', 24, 23, 4);

}

function create() {

    // var background = game.add.tileSprite(0, 50, 5120, 5120, 'background');
    // debugger;


    map = game.add.tilemap('level1');
    map.addTilesetImage('walls', 'gameTiles');

    backgroundLayer = map.createLayer('baselayer');
    wallLayer = map.createLayer('walls');
    map.setCollisionBetween(0, 52, true, wallLayer);

    // backgroundLayer.resizeWorld();


    game.world.setBounds(0, 50, 5120, 5120);

    pageAlignHorizontally = true;
    pageAlignVertically = true;

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'swordguywalk');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('swordguywalk');
    // player.animations.add('attack');
    // player.animations.add('dead');

    enemy = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    enemy.animations.add('enemy');

    bow = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'bow');
    game.physics.arcade.enable(bow);
    bow.body.collideWorldBounds = true;

    apple = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'apple');
    game.physics.arcade.enable(apple);
    apple.body.collideWorldBounds = true;

    cheese = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'cheese');
    game.physics.arcade.enable(cheese);
    cheese.body.collideWorldBounds = true;

    boots = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'boots');
    game.physics.arcade.enable(boots);
    boots.body.collideWorldBounds = true;

    cup = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'cup');
    game.physics.arcade.enable(cup);
    cup.body.collideWorldBounds = true;

    gloves = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'gloves');
    game.physics.arcade.enable(gloves);
    gloves.body.collideWorldBounds = true;

    key = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'key');
    game.physics.arcade.enable(key);
    key.body.collideWorldBounds = true;

    necklace = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'necklace');
    game.physics.arcade.enable(necklace);
    necklace.body.collideWorldBounds = true;

    potion = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'potion');
    game.physics.arcade.enable(potion);
    potion.body.collideWorldBounds = true;

    ring = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'ring');
    game.physics.arcade.enable(ring);
    ring.body.collideWorldBounds = true;


    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    style = 'STYLE_TOPDOWN';

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
    skeletonWalk();
    walk();
    // swordguywalk.animations.play('walk', 30, true);

  }
  else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.x = -PLAYER_SPEED;
    skeletonWalk();
    walk();
    // swordguywalk.animations.play('walk', 30, true);
  }

  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.body.velocity.y = -PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.y = PLAYER_SPEED;
    skeletonWalk();
    walk();
    // player.animations.play('walk', 30, true);
  }
  else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    player.body.velocity.y = PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.y = -PLAYER_SPEED;
    skeletonWalk();
    walk();
    // swordguywalk.animations.play('walk', 30, true);
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    player.animations.play('attack', 30);
}

  game.physics.arcade.overlap(player, enemy, hurtPlayer);
  game.physics.arcade.overlap(player, bow, collectBow);
  game.physics.arcade.overlap(player, apple, collectApple);
  game.physics.arcade.overlap(player, boots, collectBoots);
  game.physics.arcade.overlap(player, cheese, collectCheese);
  game.physics.arcade.overlap(player, cup, collectCup);
  game.physics.arcade.overlap(player, gloves, collectGloves);
  game.physics.arcade.overlap(player, key, collectKey);
  game.physics.arcade.overlap(player, necklace, collectNecklace);
  game.physics.arcade.overlap(player, potion, collectPotion);
  game.physics.arcade.overlap(player, ring, collectRing);
  game.physics.arcade.collide(player, wallLayer);


}

function walk() {
  player.animations.play('swordguywalk', 30);
}

function skeletonWalk() {
  enemy.animations.play('enemy', 30);
}

function hurtPlayer() {
  if (PLAYER_HEALTH > 0) {
    PLAYER_HEALTH = PLAYER_HEALTH - 25;
    console.log(PLAYER_HEALTH);
  } else {
    console.log(PLAYER_HEALTH);
    playerKill();
  }

}

function collectApple() {
  // player.animations.play('dead');
  playerKill();
  apple.kill();
  swal({
  title: 'You ate the poison apple!',
  text: 'Thanks for playing!',
  type: 'warning',
  buttons: false,
  timer: 2000,
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
  PLAYER_SPEED = PLAYER_SPEED * 1.25;
  $("#items").append("<img src='../assets/boots.png'>");
}

function collectCheese() {
  cheese.kill();
  PLAYER_HEALTH = PLAYER_HEALTH + 25;
//   swal({
//   title: 'You ate some cheese!',
//   text: '+25hp',
//   type: 'success',
//   buttons: false,
//   timer: 500,
//   showCancelButtons: false,
//   confirmButtonText: 'Yum!'
// });
}

function collectCup() {
  cup.kill();
  $("#items").append("<img src='../assets/cup.png'>");
}

function collectGloves() {
  gloves.kill();
  $("#items").append("<img src='../assets/gloves.png'>");
}

function collectKey() {
  key.kill();
  $("#items").append("<img src='../assets/key.png'>");
}

function collectNecklace() {
  necklace.kill();
  $("#items").append("<img src='../assets/necklace.png'>");
}

function collectPotion() {
  potion.kill();
  $("#items").append("<img src='../assets/potion.png'>");
}

function collectRing() {
  ring.kill();
  $("#items").append("<img src='../assets/ring.png'>");
}

function playerKill() {
  // player.animations.play('dead');
  player.kill();
  // location.reload();
}
