const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
let width = 600
let height = 600
canvas.width = width
canvas.height = height

console.log(canvas)
console.log(c)

class Cell{
	constructor(x,y){
		this.x = x
		this.y = y
		this.alive = Math.random() < .50	
		this.neighbors = 0
	}

	display(){
		c.fillStyle = this.alive ? "#eee" : "#555"	
		c.fillRect(this.x * width / size,this.y * width / size,width/size,width/size)
	
	}

	countNeighbors(x){
		if(this.alive){x--}
		this.neighbors = x
	}	
	
	amIalive(){
		this.alive = this.neighbors >=aliveRule ? true : false
	}	

}

let size = 200
let columns = size;
let rows = size
let boardArr = []
let aliveRule = 4

for (let i = 0;i<rows;i++){
	boardArr.push([])
	for(let j = 0;j<columns;j++){
		boardArr[i].push(new Cell(i,j))
	}
}


for(let i = 0;i<boardArr.length;i++){
	for(let j = 0;j<boardArr[i].length;j++){
		let num = 0
		for(let k = -1;k<2;k++){
			for(let l = -1;l<2;l++){
				if(i + k >= 0 && i + k<size && j+l>= 0 && j+l < size){
					if(boardArr[i+k][j+l].alive){num ++}
				}
			}	
		}
		boardArr[i][j].countNeighbors(num)
	}
}

for(let i = 0;i<boardArr.length;i++){
	for(let j = 0;j<boardArr[i].length;j++){
		boardArr[i][j].amIalive()
		boardArr[i][j].display()
	}
}

console.log(boardArr)
