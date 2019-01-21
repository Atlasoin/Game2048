module.exports = class Game2048{
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
		// this.layout[0] = [0,0,0,0];
		// this.layout[1] = [0,0,2,0];
		// this.layout[2] = [0,0,0,4];
		// this.layout[3] = [0,0,0,0];
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
		for(let i = 0; i < this.size; i++){
			let compressed = [];
			let meetblank = 0;
			for(let j = 0; j < this.size; j++){
				if(this.layout[i][j]){
					compressed.push(this.layout[i][j]);
					if(meetblank)
						movable = 1;
				}
				else
					meetblank = 1;
			}
			
			for(let k = 0; k + 1 < compressed.length; k++){
				if(compressed[k] && compressed[k] == compressed[k+1]){
					movable = 1;
					compressed[k] *= 2;
					compressed = compressed.slice(0,k+1).concat(compressed.slice(k+2))
				}
			}
			
			this.layout[i] = compressed.concat(new Array(this.size-compressed.length).fill(0));
		}

		if(movable === 0){
			return false;
		}else{
			return true;
		}
	}

	__move_right(){
		for(let i = 0; i < this.size; i++){
			this.layout[i].reverse();
		}

		let result = this.__move_left();

		for(let i = 0; i < this.size; i++){
			this.layout[i].reverse();
		}

		return result;
	}

	
	__move_up(){
		let transpose = a => a[0].map((_, c) => a.map(r => r[c]));
		this.layout = transpose(this.layout);
		let result = this.__move_left();
		this.layout = transpose(this.layout);
		return result;
	}

	__move_down(){
		let transpose = a => a[0].map((_, c) => a.map(r => r[c]));
		this.layout = transpose(this.layout);
		let result = this.__move_right();
		this.layout = transpose(this.layout);
		return result;
	}

	__move(direction){

		if(direction == "left")
			return this.__move_left();
		else if(direction == "right")
			return this.__move_right();
		else if(direction == "up")
			return this.__move_up();
		else if(direction == "down")
			return this.__move_down();
	}

	move(direction){
		if(this.__move(direction)){
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
		console.log("not movable");
		return "continue";
	}

	left(){
		return this.move("left");
	}

	right(){
		return this.move("right");
	}

	down(){
		return this.move("down");

	}

	up(){
		return this.move("up");
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
