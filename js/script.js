var player;
var cursors;
var bow;
var enemies;
var level1;
var mapTiles;
var backgroundLayer;
var wallLayer
var map;
var score;
var stuff = 0;
var PLAYER_SPEED = 250;
var GAME_HEIGTH = 480;
var GAME_WIDTH = 480;
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


    game.load.spritesheet('swordguywalk', '../assets/adventurer-run3-sword-Sheet.png', 50, 37);
    game.load.spritesheet('enemy', "../assets/SkeletonWalk.png", 22, 33, 13);
    // game.load.spritesheet('dead', "../assets/dead.png", 64, 29, 12);
    game.load.spritesheet('attack', '../assets/attack2.png', 44, 32);

    game.load.audio('music', '../assets/song.mp3');
    game.load.audio('steps', '../assets/steps.mp3');
    game.load.audio('pickup', '../assets/pickup.mp3');
    game.load.audio('sword', '../assets/sword.wav');

}

function create() {

    // var background = game.add.tileSprite(0, 50, 5120, 5120, 'background');
    music = game.add.audio('music');
    steps = game.add.audio('steps', 0.33);
    pickip = game.add.audio('pickup');
    sword = game.add.audio('sword');
    music.play();

    map = game.add.tilemap('level1');
    map.addTilesetImage('walls', 'gameTiles');

    backgroundLayer = map.createLayer('baselayer');
    wallLayer = map.createLayer('walls');
    map.setCollisionBetween(0, 52, true, wallLayer);

    backgroundLayer.resizeWorld();


    // game.world.setBounds(0, 50, 5120, 5120);


    player = game.add.sprite(game.world.centerX, game.world.centerY, 'swordguywalk');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.anchor.setTo(.5,.5);

    player.animations.add('swordguywalk');
    // player.animations.add('attack');
    // player.animations.add('dead');

    // enemies = game.add.group();
    // enemies.enableBody = true;
    // enemies.physicsBodyType = Phaser.Physics.ARCADE;
    // enemies.createMultiple(50, 'enemy');
    // enemies.setAll('collideWorldBounds', true);
    //
    // enemies.callAll('animations.add', 'animations', 'enemy');

    enemy = game.add.sprite(game.world.centerX + 100, game.world.centerY + 100, 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    enemy.anchor.setTo(.5,.5);

    enemy.animations.add('enemy');


    bow = game.add.sprite(2608, 2640, 'bow');
    // bow = game.add.sprite(150, 150, 'bow');
    game.physics.arcade.enable(bow);

    apple = game.add.sprite(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1920), 'apple');
    game.physics.arcade.enable(apple);

    cheese = game.add.sprite((180 * 16), (165 * 16), 'cheese');
    // cheese = game.add.sprite(150, 150, 'cheese');
    game.physics.arcade.enable(cheese);

    boots = game.add.sprite((269 * 16), (123 * 16), 'boots');
    // boots = game.add.sprite(150, 150, 'boots');
    game.physics.arcade.enable(boots);

    cup = game.add.sprite((136 * 16), (135 * 16), 'cup');
    // cup = game.add.sprite(150, 150, 'cup');
    game.physics.arcade.enable(cup);

    gloves = game.add.sprite((225 * 16), (287 * 16), 'gloves');
    // gloves = game.add.sprite(150, 150, 'gloves');
    game.physics.arcade.enable(gloves);

    key = game.add.sprite((14 * 16), (123 * 16), 'key');
    // key = game.add.sprite(150, 150, 'key');
    game.physics.arcade.enable(key);

    necklace = game.add.sprite((9 * 16), (224 * 16), 'necklace');
    // necklace = game.add.sprite(150, 150, 'necklace');
    game.physics.arcade.enable(necklace);

    potion = game.add.sprite((94 * 16), (156 * 16), 'potion');
    // potion = game.add.sprite(150, 150, 'potion');
    game.physics.arcade.enable(potion);

    ring = game.add.sprite((23 * 16), (57 * 16), 'ring');
    // ring = game.add.sprite(150, 150, 'ring');
    game.physics.arcade.enable(ring);


    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    style = 'STYLE_TOPDOWN';

    // player.animations.play('walk', 50, true);

    // var swordguywalk = game.add.sprite(300, 200, 'swordguywalk');

    // var walk = swordguywalk.animations.add('swordguywalk');

    // game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);


    cursors = game.input.keyboard.createCursorKeys(); //arrow keys
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.W]);

}

function update() {
  player.body.velocity.set(0);
  enemy.body.velocity.set(0);
  if (music.isPlaying === false) {
    music.play();
  }

  // player.animations.paused = true;

  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.velocity.x = -PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.x = PLAYER_SPEED;
    skeletonWalk();
    walk();
    player.scale.x = -1;
    enemy.scale.x = 1;


  }
  else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = PLAYER_SPEED;
    // player.animations.paused = true;
    enemy.body.velocity.x = -PLAYER_SPEED;
    skeletonWalk();
    walk();
    player.scale.x = 1;
    enemy.scale.x = -1;
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
    sword.play();
    player.animations.play('attack');
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
  game.physics.arcade.collide(enemy, wallLayer);


}

function walk() {
  player.animations.play('swordguywalk', 15);
  if (steps.isPlaying === false) {
    steps.play();
  }
}

function skeletonWalk() {
  enemy.animations.play('enemy');
  // enemies.callAll('play', null, 'enemies');
}

function hurtPlayer() {
  if (PLAYER_HEALTH > 0) {
    PLAYER_HEALTH = PLAYER_HEALTH - 25;
    $('#gamelog').prepend('OUCH!</br>');
    console.log(PLAYER_HEALTH);
  } else {
    console.log(PLAYER_HEALTH);
    playerKill();
    $('#gamelog').prepend('You DIED</br>');
    enemy.animations.destroy();
  }

}

function collectApple() {
  // player.animations.play('dead');
  playerKill();
  apple.kill();
  $('#gamelog').prepend('You ate the poison Apple</br>');
  $('#gamelog').prepend('You DIED</br>');
  enemy.animations.destroy();
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
  pickip.play();
  $("#items").append("<img src='../assets/bow.png'>");
  $('#gamelog').prepend('Picked up a Bow</br>');
  stuff += 1;
  checkWin();
}

function collectBoots() {
  boots.kill();
  pickip.play();
  PLAYER_SPEED = PLAYER_SPEED * 1.25;
  $("#items").append("<img src='../assets/boots.png'>");
  $('#gamelog').prepend('Picked up Boots. Speed increased 25%</br>');
  stuff += 1;
  checkWin();
}

function collectCheese() {
  cheese.kill();
  pickip.play();
  PLAYER_HEALTH = PLAYER_HEALTH + 25;
  $("#items").append("<img src='../assets/cheese.png'>");
  $('#gamelog').prepend('Picked up some cheese. Health +25</br>');
  stuff += 1;
  checkWin();
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
  pickip.play();
  $("#items").append("<img src='../assets/cup.png'>");
  $('#gamelog').prepend('Picked up a Cup</br>');
  stuff += 1;
  checkWin();
}

function collectGloves() {
  gloves.kill();
  pickip.play();
  $("#items").append("<img src='../assets/gloves.png'>");
  $('#gamelog').prepend('Picked up some Gloves</br>');
  stuff += 1;
  checkWin();
}

function collectKey() {
  key.kill();
  pickip.play();
  $("#items").append("<img src='../assets/key.png'>");
  $('#gamelog').prepend('Picked up a Key</br>');
  stuff += 1;
  checkWin();
}

function collectNecklace() {
  necklace.kill();
  pickip.play();
  $("#items").append("<img src='../assets/necklace.png'>");
  $('#gamelog').prepend('Picked up a Necklace</br>');
  stuff += 1;
  checkWin();
}

function collectPotion() {
  potion.kill();
  pickip.play();
  $("#items").append("<img src='../assets/potion.png'>");
  $('#gamelog').prepend('Picked up a Potion</br>');
  stuff += 1;
  checkWin();
}

function collectRing() {
  ring.kill();
  pickip.play();
  $("#items").append("<img src='../assets/ring.png'>");
  $('#gamelog').prepend('Picked up a Ring</br>');
  stuff += 1;
  checkWin();
}

function playerKill() {
  // player.animations.play('dead');
  player.kill();
  // location.reload();
}

function checkWin() {
  if (stuff === 9) {
    $('#gamelog').prepend('YOU FOUND ALL THE ITEMS! YOU WIN!</br>');
    player.body.moves = false;
    player.animations.destroy();
    enemy.body.moves = false;
    enemy.animations.destroy();
  }
}

// function spawnEnemy() {
//   var enemy = enemies.getFirstExists(false);
//   enemy.reset(Math.floor(Math.random() * 4800), Math.floor(Math.random() * 4800));
// }
