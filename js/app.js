// Initializing the score and life variables */
var life= 3;
var score=0;
var greet;

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
	// to make sure that vechicles start with the beginning after crossing the playong area
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
var Player = function (x, y) { //player class
    this.sprite = "images/char-princess-girl.png";
    this.x = 200;
    this.y = 400;
	
	/* displaying the initial score and life of player */
	display();
	console.log("life left" +life);
	console.log("score" +score);	
    //this.speed = 100;
};
//Setting the rule for update- start from beginning
Player.prototype.update = function (dt) {
	// check for the collision
    this.checkCollisions();
	/*if player reach the water tile i.e top */
    if (this.y < 20) {
        this.reset();
		// if the player reach at top, she will score 100 points
        score+=100;
		// displaying the updated score
        display();
        console.log(score);
    }
	// if the player scores 1000 points then she wins
    if(score>=1000){
        greet="Congratulations you win!!";
		// dislay modal
        modalShow();
		//reset score and life to their initial values
        score_reset();
    }
};


var player = new Player();

//Adds player to the field
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Declaring an array called allEnemies and placing all enemy objects inside it
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
//Setting width and height for the gameboard tiles
var BlockWidth = 101;
var BlockHeight = 90;

//For each keystroke, the player shall move along the x and y axis
//Set variable to less than 100 for up and down to keep player inside game tile
Player.prototype.handleInput = function (code) {
    switch (code) {
        case "up":
            if (this.y > 0) {
                this.y -= BlockHeight;
            }
            break;

        case "down":
            if (this.y < 400) {
                this.y = this.y + BlockHeight;
            }
            break;

        case "left":
            if (this.x > 0) {
                this.x = this.x - BlockWidth;
            }
            break;

        case "right":
            if (this.x < 400) {
                this.x += BlockWidth;
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
            //if collision occurs reset the player
			this.reset();
			//reduce the score on collision
            score-= 50;
			console.log("score" +score);
			//reduce the life by 1
            life-=1;
			console.log("life left" +life);
			//display the reduced score and life
            display();
			//check if the score is negative, if so then make it equals to zero
            if(score<0){
                score= 0;
                display();
            }
			//if life-left equals zero then stop the game, display the score and reset 
            if(life<=0){
                display();
                greet="Nice try!!!";
                modalShow();
                console.log("score" +score);
                score_reset();
            }
        }
    }
};

// display the score and life-left
function display() {
    $("#score_points").text(score+"ml");
    $("#life_left").text(" "+life);
}
// resetting the score to initial values and display them.
function score_reset(){
    score=0;
    life=3;
    display();
}

function modalShow(){
    $("#modal-game").removeClass("display-hide"); // Not to display the present div
    $("#modal-game").addClass("display-modal");
    $("#score_points_modal").text("You have collected:"+" "+score+"ml");
    $("#greeting_msg").text(greet);
    $("#buttonOK").click(function () {
    $("#modal-game").removeClass("display-modal");
    $("#modal-game").addClass("display-hide");
});
}

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

