// create phaser game
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGTH, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});


function init() {
}


function preload() {
    // initialize game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // load map and tiles
    game.load.tilemap('level1', 'assets/testmap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('gameTiles', 'assets/0x72_16x16DungeonTileset_walls.v1.png');


    game.load.image('bow', './assets/bow.png');
    game.load.image('apple', './assets/apple.png');
    game.load.image('boots', './assets/boots.png');
    game.load.image('cheese', './assets/cheese.png');
    game.load.image('cup', './assets/cup.png');
    game.load.image('gloves', './assets/gloves.png');
    game.load.image('necklace', './assets/necklace.png');
    game.load.image('potion', './assets/potion.png');
    game.load.image('ring', './assets/ring.png');
    game.load.image('key', './assets/key.png');


    game.load.spritesheet('swordguywalk', './assets/adventurer-run3-sword-Sheet.png', 50, 37);
    game.load.spritesheet('enemy', "./assets/SkeletonWalk.png", 22, 33, 13);
    // game.load.spritesheet('dead', "../assets/dead.png", 64, 29, 12);
    game.load.spritesheet('attack', './assets/attack2.png', 43, 32);

    game.load.audio('music', './assets/song.mp3');
    game.load.audio('steps', './assets/steps.mp3');

    // load items
    game.load.image('bow', './assets/bow.png');
    game.load.image('apple', './assets/apple.png');
    game.load.image('boots', './assets/boots.png');
    game.load.image('cheese', './assets/cheese.png');
    game.load.image('cup', './assets/cup.png');
    game.load.image('gloves', './assets/gloves.png');
    game.load.image('necklace', './assets/necklace.png');
    game.load.image('potion', './assets/potion.png');
    game.load.image('ring', './assets/ring.png');
    game.load.image('key', './assets/key.png');
    // load spritesheets that will be animated
    game.load.spritesheet('swordguywalk', './assets/adventurer-run3-sword-Sheet.png', 50, 37);
    game.load.spritesheet('fire', './assets/flames.png', 16, 24, 12);
    // load sounds
    game.load.audio('music', './assets/song.mp3');
    game.load.audio('steps', './assets/steps.mp3');
    game.load.audio('pickup', './assets/pickup.mp3');


}

function create() {
    // set up sounds
    music = game.add.audio('music');
    steps = game.add.audio('steps', 0.33);
    pickip = game.add.audio('pickup');
    music.play();
    // creating map/background
    map = game.add.tilemap('level1');
    map.addTilesetImage('walls', 'gameTiles');
    // making different layers of the map to make the walls collidable
    backgroundLayer = map.createLayer('baselayer');
    wallLayer = map.createLayer('walls');
    map.setCollisionBetween(0, 52, true, wallLayer);

    backgroundLayer.resizeWorld();

    // create player, place in center of map, add arcade physics and keep player within map
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'swordguywalk');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    // set up to later flip player while going the other direction
    player.anchor.setTo(.5,.5);
    // add animation to player
    player.animations.add('swordguywalk');
    // create flames group
    flames = game.add.group();
    flames.enableBody = true;
    flames.physicsBodyType = Phaser.Physics.ARCADE;
    flames.createMultiple(50, 'fire');
    flames.setAll('outOfBoundsKill', true);
    flames.setAll('checkWorldBounds', true);
    flames.setAll('collideWorldBounds', true);
    flames.callAll('animations.add', 'animations', 'fire');
    // flames animation goes back and forth
    fireTween = game.add.tween(flames).to({
                 x: 300
            }, 5000, "Linear", true, 0, -1);
            fireTween.yoyo(true);

    // add items, enable physics and place them on the map
    bow = game.add.sprite(2608, 2640, 'bow');
    game.physics.arcade.enable(bow);


    apple = game.add.sprite((260 * 16), (35 * 16), 'apple');

    game.physics.arcade.enable(apple);

    cheese = game.add.sprite((180 * 16), (165 * 16), 'cheese');
    game.physics.arcade.enable(cheese);

    boots = game.add.sprite((269 * 16), (123 * 16), 'boots');
    game.physics.arcade.enable(boots);

    cup = game.add.sprite((136 * 16), (135 * 16), 'cup');
    game.physics.arcade.enable(cup);

    gloves = game.add.sprite((225 * 16), (287 * 16), 'gloves');
    game.physics.arcade.enable(gloves);

    key = game.add.sprite((14 * 16), (123 * 16), 'key');
    game.physics.arcade.enable(key);

    necklace = game.add.sprite((9 * 16), (224 * 16), 'necklace');
    game.physics.arcade.enable(necklace);

    potion = game.add.sprite((94 * 16), (156 * 16), 'potion');
    game.physics.arcade.enable(potion);

    ring = game.add.sprite((23 * 16), (57 * 16), 'ring');
    game.physics.arcade.enable(ring);
    // make more flames appear every 30 seconds
    game.time.events.loop(Phaser.Timer.SECOND * 30, makeFlames);
    // create the key presses
    cursors = game.input.keyboard.createCursorKeys(); // arrow keys
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.W]); // WASD to move
    // camera follows the player
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    style = 'STYLE_TOPDOWN';
}

function update() {
  // if key is not being pressed velocity is 0
  player.body.velocity.set(0);
  // play the background music, and restart when done
  if (music.isPlaying === false) {
    music.play();
  }
  // moves the player left
  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.velocity.x = -PLAYER_SPEED;
    walk();
    // flips the sprite so its facing left
    player.scale.x = -1;
  }
  // moves the player right
  else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = PLAYER_SPEED;
    walk();
    // player faces right
    player.scale.x = 1;
  }
  // moves player up
  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.body.velocity.y = -PLAYER_SPEED;
    walk();
  }
  // moves player down
  else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    player.body.velocity.y = PLAYER_SPEED;
    walk();
  }

  // kills player when you touch flame
  // collect item when you overlap
  game.physics.arcade.overlap(player, flames, killPlayer);
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
  // makes it so the player can't go through walls
  game.physics.arcade.collide(player, wallLayer);
  // plays the flames animation
  flames.callAll('play', null, 'fire');

}
