var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameWrapper', { preload: preload, create: create, update: update });

var wall;
var wall2;
var bird;
var wallspeed = -200;
var gameOver = false;
var points = 0;

function preload() {

  game.load.spritesheet('bird', 'bird100x82.png', 100,82,8);
  //game.load.image('bird', 'bird.png');
  game.load.image('wall', 'wall.png');
  game.load.image('wall2', 'wall.png');

}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  bird = game.add.sprite(0, 50, 'bird');
  anim = bird.animations.add('fly');
  anim.play(8,true);

  game.physics.enable(bird, Phaser.Physics.ARCADE);

  bird.body.collideWorldBounds = true;
  bird.body.bounce.set(1);
  bird.body.gravity.y = 200;

  wall = game.add.sprite(game.width-50,0,'wall');
  game.physics.enable(wall, Phaser.Physics.ARCADE);

  wall2 = game.add.sprite(game.width-50,game.height-200,'wall2');
  game.physics.enable(wall2, Phaser.Physics.ARCADE);
  wall2.scale.y = 10;

  randomWalls();

  cursors = game.input.keyboard.createCursorKeys();

  Enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  gameOverBox = game.add.group();
  gameOverback = game.add.sprite(0, 0, "wall");
  var style1 = { font: "46px Arial", fill: "#fff", align: "center" };
  startText = game.add.text(50, 200, 'Game over! \n Press Enter to start a new game.', style1);
  gameOverback.width = game.width;
  gameOverback.height = game.height;
  gameOverBox.add(gameOverback);
  gameOverBox.add(startText);
  gameOverBox.x = -10000;

  var style2 = { font: "16px Arial", fill: "#fff",};
  pointsText = game.add.text(0, 0, 'Points: '+points, style2);

}

function update() {
  pointsText.text = 'Points: '+points;
  game.physics.arcade.collide(bird, wall, collisionHandler);
  game.physics.arcade.collide(bird, wall2, collisionHandler);

  if (cursors.up.isDown) {
    bird.body.velocity.y = -200;

  }

  if (wall.x <= -50) {
    points += 1;
    randomWalls();
  }

  if (Enter.isDown && gameOver == true){
    initBird();
    randomWalls();
    gameOverBox.x = -10000;
    gameOver = false;
  }

}

function collisionHandler (obj1, obj2) {
  newGame();
}

function randomWalls() {
  wall.x = game.width-50;
  wall.y = 0;
  wall.scale.y = game.rnd.integerInRange(1,10);
  wall.body.velocity.x = wallspeed;
  wall.body.velocity.y = 0;

  wall2.x = game.width-50;
  wall2.y = game.rnd.integerInRange(game.width-200,game.width-400);
  wall2.body.velocity.x = wallspeed;
  wall2.body.velocity.y = 0;
}

function initBird() {
  bird.body.velocity.x = 0;
  bird.body.velocity.y = 0;
  bird.body.acceleration.y = 0;
  bird.body.acceleration.x = 0;
  bird.y = 0;
  bird.x = 0;
}

function newGame() {
    gameOver = true;
    gameOverBox.x = 0;
    wall.body.velocity.x = 0;
    wall2.body.velocity.x = 0;
    bird.body.velocity.x = 0;
    points = 0;
}
