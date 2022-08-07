const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
canvas.width = 800
canvas.height = 800
let height = canvas.height
let width = canvas.width

class Cell{
	constructor(x,y,res = 10,alive = false){
		this.x = x;
		this.y = y;
		this.random = Math.random()
		this.resolution = res
		this.alive = alive	
	}

	displayCell(){
		c.fillStyle = this.alive ? "black" : "white"
		c.fillRect(this.y * width/this.resolution,this.x * height/this.resolution,width/this.resolution,height/this.resolution)
	}
}



class Board{
	constructor(res = 100,ruleN = "00011110"){
		this.resolution = res % 2 === 0 ? res + 1 : res
		this.grid = []
		this.ruleN = ruleN
		this.rule = {
			"111" : this.ruleN[0],	
			"110" : this.ruleN[1],	
			"101" : this.ruleN[2],	
			"100" : this.ruleN[3],	
			"011" : this.ruleN[4],	
			"010" : this.ruleN[5],	
			"001" : this.ruleN[6],	
			"000" : this.ruleN[7],	
		}

		

		for(let i = 0;i<1;i++){
			this.grid.push([])
			for(let j = 0;j<this.resolution;j++){
				this.grid[i].push(new Cell(i,j,this.resolution,(j == Math.floor(this.resolution/2))))	
			}
		}
	}

	

	display(){
		for(let i = 0;i<this.grid.length;i++){
			for(let j = 0;j<this.grid[i].length;j++){
				this.grid[i][j].displayCell()
			}
		}	
	}		
	

	update(){
		let arr = [false]
		for(let i = 1;i<this.grid[this.grid.length-1].length-1;i++){
			let current = ""
			for(let j = -1;j<2;j++){
				this.grid[this.grid.length-1][i + j].alive ? current += "1": current += "0"
			}			
			
		
		this.rule[current]==="1" ? arr.push(true) : arr.push(false)		

		}
		this.grid.push([])
		for(let i = 0;i<this.resolution;i++){
			this.grid[this.grid.length-1].push(new Cell(this.grid.length-1,i,this.resolution,arr[i]))
		}	
	}

	


}

let board = new Board(3000,(137).toString(2).padStart(8,"0"))

for(let i = 0;i<3000;i++){
	board.update()
}

board.display()

console.log(board.rule)
console.log((30).toString(2).padStart(8,"0"))

