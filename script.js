const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
let width = 400
let height = 400
canvas.width = width
canvas.height = height

console.log(canvas)
console.log(c)

class Cell{
	constructor(x,y,id){
		this.x = x,
		this.y = y,		
		this.id = id,
		this.alive = Math.random() < .5	
	}

	display(){
		c.fillStyle = this.alive ? "white" : "black"	
		c.fillRect(this.x * width / size,this.y * width / size,width/size,width/size)
	
	}
}

let size = 10
let columns = size;
let rows = size
let boardArr = []

for (let i = 0;i<rows;i++){
	boardArr.push([])
	for(let j = 0;j<columns;j++){
// =>=>=>=>=>=>=>=> WILL CHANGE <=<=<=<=<=<=<=<=
		boardArr[i].push(new Cell(i,j,`${i}-${j}`))
		boardArr[i][j].display()
// =>=>=>=>=>=>=>=> WILL CHANGE <=<=<=<=<=<=<=<=
	}
}

console.log(boardArr)
