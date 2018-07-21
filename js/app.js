// Enemies our player must avoid
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

  // Update the player's position, required method for game
  update(dt) {
    if (this.y === -23) {
      setTimeout(function() {
        // create a modal omg
        player.x = 200;
        player.y = 392;
      }, 500);
    } else {
      // do nothing
    }
  }


  // Draw the player on the screen, required method for game
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
const player = new Player(200, 392);
const enemy = new Enemy(-150, 226, 2.5);
const enemy2 = new Enemy(-150, 60, 2);
const enemy3 = new Enemy(-150, 143, 1.5);
const allEnemies = [];
allEnemies.push(enemy, enemy2, enemy3);

// This listens for key presses and sends the keys to your
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


function checkCollisions() {
  if ((player.y === enemy.y && enemy.x <= player.x + 70 && enemy.x >= player.x - 70) ||
      (player.y === enemy2.y && enemy2.x <= player.x + 70 && enemy2.x >= player.x - 70) ||
      (player.y === enemy3.y && enemy3.x <= player.x + 70 && enemy3.x >= player.x - 70)) {
        player.x = 200;
        player.y = 392;
  }
}
