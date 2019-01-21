const Game2048 = require('./2048.js');

game1 = new Game2048(4)

//for test in terminal
var readline = require("readline")
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

game1.show();

rl.setPrompt("input the operation: 	");
rl.prompt();

rl.on('line', function(line){
	switch(line.trim()){
		case 'w':
			console.log("up");
			break;

		case 'a':
			console.log("left");
			let result = game1.left();
			if(result === "win" || result === "lost")
				rl.close();
			else if(result === "continue")
				game1.show();
			else
				rl.close();
			break;
		
		case 's':
			console.log("down");
			break;
		case 'd':
			console.log("right");
			break;
		default:
			console.log("invalid input")
			break;
	}
	rl.prompt();
});

rl.on('close', function(){
	process.exit(0);
})

