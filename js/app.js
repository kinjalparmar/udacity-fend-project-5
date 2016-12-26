// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 500) {
        this.x = 1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function (x, y, score, life, greet) { //player class
    this.sprite = "images/char-princess-girl.png";
    this.x = 200;
    this.y = 400;
    this.life= 3;
    this.score=0;
	console.log("score" + " " + this.score);
    console.log("life left" + " " + this.life);
    //this.speed = 100;
};

//Set rule if player is within 20, the player must reset to beginning
Player.prototype.update = function (dt) {
    this.checkCollisions();
    if (this.y < 20) {
        this.reset();
        this.score+= 100;
        this.display();
        console.log("score" + " " + this.score);
    }
    if(this.score>= 1000){
        this.greet="Congratulations you win!!";
		console.log("Congratulations you win");
        this.modalShow();
		this.score_reset();
    }
};

var player = new Player();

//Adds player to the field
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// to display the score and life left
Player.prototype.display = function() {
	$("#score_points").text(" " + this.score + "ml");
    $("#life_left").text(" " + this.life);
};
// to reset the score nd life left
Player.prototype.score_reset = function () {
    this.score=0;
    this.life=3;
    this.display();
	console.log("New Game")
	console.log("score" + " " + this.score);
    console.log("life left" + " " + this.life);
};
// to display the modal
Player.prototype.modalShow = function () {
    $("#modal-game").removeClass("display-hide"); // Not to display the present div
    $("#modal-game").addClass("display-modal");
	console.log("Your score is" + " " + this.score);
    $("#score_points_modal").text("You have collected:"+" "+this.score+"ml");
    $("#greeting_msg").text(this.greet);
    $("#buttonOK").click(function () {
        $("#modal-game").removeClass("display-modal");
        $("#modal-game").addClass("display-hide");
    });
};
//Setting width and height for the gameboard tiles
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

//For each keystroke, the player shall move along the x and y axis
//Set variable to less than 100 for up and down to keep player inside game tile
Player.prototype.handleInput = function (code) {
    switch (code) {
        case "up":
            if (this.y > 0) {
                this.y -= TILE_HEIGHT;
            }
            break;

        case "down":
            if (this.y < 400) {
                this.y = this.y + TILE_HEIGHT;
            }
            break;

        case "left":
            if (this.x > 0) {
                this.x = this.x - TILE_WIDTH;
            }
            break;

        case "right":
            if (this.x < 400) {
                this.x += TILE_WIDTH;
            }
            break;
    }
};

//reset or start over function to staring position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

//Set all collisons with player to make player reset game
Player.prototype.checkCollisions = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x + 40 > this.x && this.x + 40 > allEnemies[i].x && allEnemies[i].y + 50 > this.y && this.y + 50 > allEnemies[i].y) {
            this.reset();
			console.log("Collision");
            this.score-= 50;
            this.display();
            if(this.score< 0){
                this.score= 0;
                this.display();
            }
			console.log("score" + " " + this.score);
            this.life-=1;
            this.display();
            console.log("life left" + " " + this.life);
            if(this.life<=0){
				console.log("Game Over");
                this.display();
                this.greet="Nice try!!!";
                this.modalShow();
				this.score_reset();
            }
        }
    }
};

// Place all enemy objects in an array called allEnemies
// Now instantiate your objects.
//Set enemies initial coordinates and speed (x, y, speed)
var allEnemies = [];
var enemy = new Enemy(100, 50, 80);
allEnemies.push(enemy);
var enemy = new Enemy(300, 50, 70);
allEnemies.push(enemy);
var enemy = new Enemy(200, 150, 80);
allEnemies.push(enemy);
var enemy = new Enemy(150, 225, 90);
allEnemies.push(enemy);
var enemy = new Enemy(200, 150, 100);
allEnemies.push(enemy);

//Adds enemy to the field
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

