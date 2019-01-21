class Game2048{
	constructor(size){
		this.size = size;
		this.layout = new Array(size);
		for(let i=0; i<size; i++){
			this.layout[i] = new Array(size);
		}
		//assert(this.size=this.layout.length)
		for(let i=0; i<size; i++){
			for(let j=0; j<size; j++){
				this.layout[i][j] = 0;
			}
		}
		this.__update_layout();
		this.__update_layout();

		//for test:
		this.layout[0] = [0,0,0,0];
		this.layout[1] = [0,0,2,0];
		this.layout[2] = [0,0,0,4];
		this.layout[3] = [0,0,0,0];
	}

	//show the current layout
	show(){
		for(let i=0; i<this.size; i++){
			console.log(this.layout[i]);
			for(let j=0; j<this.size; j++){
				//console.log("%10c",this.layout[i][j])
			}
		}
	//console.log(this.layout)
	}

	__move_left(){
		let movable = 0;
		for(let i=0; i<this.size; i++){
			let last_w = 0;
			for(let j=0; j<this.size; j++){
				let before_moving_w = this.layout[i][j];
				
				let x = this.layout[i][j];
				 while(x===0){
				 	let varj = j;
				 	for( ; varj + 1 < this.size; varj++){
				 		x = this.layout[i][varj+1];					
					 	this.layout[i][varj] = x;
					 	this.layout[i][varj+1] = 0;
					 	varj++;
				 	}
				 	if(varj + 1 == this.size)
				 		break;
				}

				let current_w = this.layout[i][j];
				if(current_w != before_moving_w){
					movable = 1;
				}

				if(current_w !== 0 && current_w === last_w){
					this.layout[i][j-1] *= 2;
					this.layout[i][j] = 0;
					movable = 1;
				}else{
					last_w = current_w;
				}
			}
		}
		if(movable === 0){
			return false;
		}else{
			return true;
		}
	}

	left(){
		if(this.__move_left()){
			if(this.__check_win()){
				console.log("You win!");
				return "win";
			}else{
				this.__update_layout();
				if(this.__check_movable()){
					return "continue";
				}else{
					console.log("You lost!");
					return "lost";
				}
			}
		}
		return "continue";

	}

	down(){

	}

	up(){

	}

	right(){

	}

	//judgut if already win
	__check_win(){
		for(let i=0; i<this.size; i++){
			for(let j=0; j<this.size; j++){
				if(this.layout[i][j]===2048){
					return true;
				}
			}
		}
		return false;
	}

	__new_w(){
		//in the ratio of 1:4 to generate 4:2
		return (Math.floor(5*Math.random())>0)?2:4;
	}

	//add one weight into the current layout
	__update_layout(){
		let empty_blocks = [];
		for(let i=0; i<this.size; i++){
			for(let j=0; j<this.size; j++){
				if(this.layout[i][j] === 0){
					empty_blocks.push([i,j]);
				}
			}
		}
		let insert_n = Math.floor(Math.random()*empty_blocks.length);
		var [insert_i,insert_j] = [empty_blocks[insert_n][0],empty_blocks[insert_n][1]];
		this.layout[insert_i][insert_j] = this.__new_w();
	}

	__check_movable(){
		for(let i=0; i<this.size; i++){
			for(let j=0; j<this.size; j++){
				if(this.layout[i][j] == 0){
					return true;
				}
			}
		}
		for(let i=0; i<this.size; i++){
			for(let j=0; j<this.size-1; j++){
				if(this.layout[i][j] === this.layout[i][j+1])
					return true;
			}
		}

		for(let j=0; j<this.size; j++){
			for(let i=0; i<this.size-1; i++){
				if(this.layout[i][j] == this.layout[i+1][j])
					return true;
			}
		}
		return false;
	}

}

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

