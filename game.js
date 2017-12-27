var game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameWrapper', { preload: preload, create: create, update: update });

var wall;
var wall2;
var bird;
var wallspeed = -200;
var gameOver = false;
var points = 0;

function preload() {

  game.load.image('bg', 'bg.jpg');
  game.load.spritesheet('bird', 'bird100x82.png', 100,82,8);
  //game.load.image('bird', 'bird.png');
  game.load.image('wall', 'wall.jpg');

}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, 900, 700, 'bg');

  bird = game.add.sprite(0, 50, 'bird');
  anim = bird.animations.add('fly');
  anim.play(8,true);

  game.physics.enable(bird, Phaser.Physics.ARCADE);

  bird.body.collideWorldBounds = true;
  bird.body.bounce.set(1);
  bird.body.gravity.y = 200;

  wall = game.add.sprite(game.width-50,0,'wall');
  game.physics.enable(wall, Phaser.Physics.ARCADE);

  wall2 = game.add.sprite(game.width-50,game.height-200,'wall');
  game.physics.enable(wall2, Phaser.Physics.ARCADE);
  wall2.scale.y = 10;

  randomWalls();

  cursors = game.input.keyboard.createCursorKeys();

  Enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  gameOverBox = game.add.group();
  gameOverback = game.add.sprite(0, 0, "bg");
  var style1 = { font: "46px Arial", fill: "#fff", align: "center" };
  startText = game.add.text(0, 0, '', style1);
  startText.stroke = '#000000';
  startText.strokeThickness = 6;
  gameOverback.width = game.width;
  gameOverback.height = game.height;
  gameOverBox.add(gameOverback);
  gameOverBox.add(startText);
  gameOverBox.x = -10000;

  var style2 = { font: "22px Arial Black", fill: "#000",};
  pointsText = game.add.text(0, 0, 'Points: '+points, style2);
  pointsText.fontWeight = 'bold';
  pointsText.x = game.width - pointsText.width - 10;
  pointsText.y = game.height - pointsText.height;

}

function update() {
  bg.tilePosition.x -= 1;

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
    points = 0;
    initBird();
    randomWalls();
    gameOverBox.x = -10000;
    gameOver = false;
    pointsText.y = game.height - pointsText.height;
  }

}

function collisionHandler (obj1, obj2) {
  newGame();
}

function randomWalls() {
  wall.x = game.width-50;
  wall.y = 0;
  wall.scale.y = game.rnd.integerInRange(3,6);
  wall.body.velocity.x = wallspeed;
  wall.body.velocity.y = 0;

  wall2.x = game.width-50;
  wall2.y = game.rnd.integerInRange(game.height/2+50,game.height-100);
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
    var s = points == 1 ? '' : 's'
    startText.text = 'Game over! \n You got '+points+' point'+s+'. \n Press Enter to start a new game.';
    startText.x = game.width/2 - startText.width/2;
    startText.y = game.height/2 - startText.height/2;
    pointsText.y = -100;
    var elem = document.getElementById("highscore");
    var high = parseInt(elem.innerHTML);
    if (high < points) {
      elem.innerHTML = points;
    }
    gameOverBox.x = 0;
    wall.body.velocity.x = 0;
    wall2.body.velocity.x = 0;
    bird.body.velocity.x = 0;
}
