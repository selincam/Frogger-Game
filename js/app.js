// enemies class
var Enemy = function(row, speed) {
    this.x = -70;
    this.y = 60 + (row - 1) * 80;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// the enemy's position
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 450) this.x = -70;
};

// draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function(){
    this.x = 200;
    this.y = 390;
    this.score = 0;
    this.gemScore = 0;
    this.sprite = 'images/char-cat-girl.png';
};

// increase the score 1 when the water is reached
Player.prototype.update = function(){
    this.x = 200;
    this.y = 390;
    this.score += 1;
    this.finishGame();
};

// determines how to win
Player.prototype.finishGame = function() {
    if (this.score === 3) {
        window.alert("Congratulations! You won the game!");
        this.reset();
    }
}

// restart the game when the player hits the enemy
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
    this.score = 0;
    this.gemScore = 0;
};

// draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// determine the coordinates of the player with keyboard movements
Player.prototype.handleInput = function(key) {
    if(key === 'left') {
        if(this.x > 0) {
            this.x = this.x - 100;
        }
    }
    else if(key === 'right') {
        if(this.x < 400) {
            this.x = this.x + 100;
        }
    }
    else if(key === 'up') {
        if(this.y > 0) {
            this.y = this.y - 80;
        }
    }
    else if(key === 'down') {
        if(this.y < 380) {
            this.y = this.y + 80;
        }
    }
};

var player = new Player();

// enables the enemy to come
var allEnemies = [];

for(var i = 0; i < 5; i++){
    var random_speed = getRandomNumber(10, 31) * 8;
    var random_row = getRandomNumber(1, 4);
    allEnemies[i] = new Enemy(random_row, random_speed);
};

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

// gem class
var Gem = function(row, column) {
    this.x = 0 + (column) * 100;
    this.y = 60 + (row - 1) * 80;
    this.sprite = 'images/gem-blue.png';
};



// increase the gem score 1 when the water is reached
Gem.prototype.update = function() {
    this.x = 0 + (column) * 100;
    this.y = 60 + (row - 1) * 80;
    this.gemScore += 1;
};

// draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Mix the gem
var gem;
var random_column = getRandomNumber(0, 4);
var random_row = getRandomNumber(1, 4);
gem = new Gem(random_row, random_column);

// move the player with key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
