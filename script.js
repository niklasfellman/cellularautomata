console.log("eyoo")

let canvas = document.querySelector("#canvas")
let c = canvas.getContext("2d")
let width = 400
let height = 400
canvas.width = width
canvas.height = height

console.log(canvas)
console.log(c)

let size = 10
let columns = size;
let rows = size
let boardArr = []

for (let i = 0;i<rows;i++){
	boardArr.push([])
	for(let j = 0;j<columns;j++){
		boardArr[i].push("x")
		c.fillRect(j*width/size,i*height/size,1,1)
	}
}

console.log(boardArr)
