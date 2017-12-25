var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var wall;
var wall2;
var bird;
var wallspeed = -200;

function preload() {

  //game.load.spritesheet('bird', 'birdsprite.png', 100,100,5);
  game.load.image('bird', 'bird.png');
  game.load.image('wall', 'wall.png');
  game.load.image('wall2', 'wall.png');

}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  bird = game.add.sprite(0, 50, 'bird');
  //anim = bird.animations.add('fly');
  //anim.play(10,true);

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

  var text = "Crappy Bird";
  var style = { font: "22px Verdana", fill: "#ff0044", align: "center" };

  var t = game.add.text(game.world.centerX-300, 0, text, style);

}

function update() {

  game.physics.arcade.collide(bird, wall, collisionHandler);
  game.physics.arcade.collide(bird, wall2, collisionHandler);

  if (cursors.up.isDown) {
    bird.body.velocity.y = -100;

  }

  if (wall.x <= 0) {
    randomWalls();
  }

}

function collisionHandler (obj1, obj2) {
  alert('you lost!');
  initBird();
  randomWalls();
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
