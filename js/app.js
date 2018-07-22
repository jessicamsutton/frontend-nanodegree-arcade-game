// Class to generate the enemy bugs
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'
  }

  // Updates the enemy's position
  update(dt) {
    // Makes speed of bug appear to be random
    this.random = Math.random() * (1 - 0) + 0;
    this.x = this.x + this.speed + this.random * dt;

    // After bug leaves view, x and y coordinates are changed
    if (this.x > 510) {
      this.x = -100;
      const yCoordinates = [60, 143, 226];
      this.y = yCoordinates[Math.floor(Math.random()*yCoordinates.length)];
    }
  }

  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Class to generate the player
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
  }

  // Update the player's position
  update(dt) {
    if (this.y === -23) {
      $('#myModal').modal('show')
    } else {
      // do nothing
    }
  }

  // Draw the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Takes input from user's keyboard and moves player accordingly
  handleInput(input) {
    if (input === 'left' && this.x > 0) {
      this.x -= 101;
    } else if (input === 'right' && this.x < 400) {
      this.x += 101;
    } else if (input === 'up' && this.y > 0) {
      this.y -= 83;
    } else if (input === 'down' && this.y < 400) {
      this.y += 83;
    } else {  // do nothing
    }
  }
}

// Player and enemy objects
let player = new Player(200, 392);
let allEnemies = [];
let enemy = new Enemy(-150, 226, 2.5);
let enemy2 = new Enemy(-150, 60, 2);
let enemy3 = new Enemy(-150, 143, 1.5);
allEnemies.push(enemy, enemy2, enemy3);

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function to check for collisions between player and enemy objects
function checkCollisions() {
  if ((player.y === enemy.y && enemy.x <= player.x + 70 && enemy.x >= player.x - 70) ||
      (player.y === enemy2.y && enemy2.x <= player.x + 70 && enemy2.x >= player.x - 70) ||
      (player.y === enemy3.y && enemy3.x <= player.x + 70 && enemy3.x >= player.x - 70)) {
        player.x = 200;
        player.y = 392;
  }
}

// Event listener for Play Again button in modal
const playAgainButton = document.querySelector('.btn-primary');
playAgainButton.addEventListener('click', function(e) {
  $('#myModal').modal('toggle');
  player.x = 200;
  player.y = 392;
  allEnemies = [];
  enemy = new Enemy(-150, 226, 2.5);
  enemy2 = new Enemy(-150, 60, 2);
  enemy3 = new Enemy(-150, 143, 1.5);
  allEnemies.push(enemy, enemy2, enemy3);
});

// Event listener for No Thanks button in modal
const exitButton = document.querySelector('.btn-secondary');
exitButton.addEventListener('click', function(e) {
  $('#myModal').modal('toggle');
  allEnemies = [];
  player.x = -200;
  player.y = -200;
});
