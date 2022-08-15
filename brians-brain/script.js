const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let resolution = 10
		c.font = `${resolution + 4}px courier`
		c.textAlign = "start"
		c.textBaseline = "hanging"
		c.fillStyle = "#fff"

class Cell{
	constructor(x,y,alive = false){
		this.x = x
		this.y = y
		this.alive = Math.random() > .5 
		this.neighbors = Math.floor(Math.random() * 8)
	}

	toggleState(){
		if(this.alive && this.neighbors === 2 || this.neighbors === 3){
			this.alive = true
		}
		else{
			this.alive = false
		}
	}
	
	updateNeighbors(x){
		this.neighbors = x
	}

	display(){
		this.toggleState()
		c.fillText(this.alive ? "•":"·", this.x, this.y);	
	}
}

class Board{
	constructor(){
		this.boardArr = []	
	}

	createBoard(){
		for(let i = 0;i<canvas.height / resolution;i++){
			this.boardArr.push([])
			for(let j = 0;j<canvas.width/resolution;j++){
				this.boardArr[i].push(new Cell(j * resolution,i*resolution))
				this.boardArr[i][j].display()
			}
		}
	}
	
	update(){
		for(let i = 1;i<this.boardArr.length-1;i++){
			for(let j = 1;j<this.boardArr[i].length -1;j++){
				let count = 0;
				for(let k = -1;k<2;k++){
					for(let l = -1;l<2;l++){
						if(this.boardArr[i+k][j+l].alive){count ++}
					}
				}
				if(this.boardArr[i][j].alive){count --}
				this.boardArr[i][j].updateNeighbors(count)
			}
		}
		for(let i = 0;i<this.boardArr.length;i++){
			for(let j = 0;j<this.boardArr[i].length;j++){
				this.boardArr[i][j].display()
			}
		}	
	}
}

let board = new Board()
board.createBoard()
board.update()
console.log(board.boardArr)

function animate(){
	c.clearRect(0,0,canvas.width,canvas.height)
	board.update()
	
	requestAnimationFrame(animate)
}

animate()

