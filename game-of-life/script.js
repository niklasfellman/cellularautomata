const startBtn = document.querySelector(".start-btn")

const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
let width = 400;
let height = 400;
canvas.width = width
canvas.height = height
let resolution = 10

class Cell{
	constructor(x,y){
		this.x = x
		this.y = y
		this.alive = Math.random() > .5 ? true:false
	}
	
	display(){
		c.fillStyle = this.alive ? "white" : "black"
		c.fillRect(this.x*width/resolution,this.y*height/resolution,width/resolution,height/resolution)	
	}

}

let boardArr = []

for(let i = 0;i<resolution;i++){
	boardArr.push([])
	for(let j = 0;j<resolution;j++){
		boardArr[i].push(new Cell(i,j))
		boardArr[i][j].display()
	}
}

console.log(boardArr)

let previousTime
let animationID
function animate(time){
	animationID = requestAnimationFrame(animate)
	if(time - previousTime < 500){
		return
	}
	previousTime = time
	

	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			boardArr[i][j].alive = !boardArr[i][j].alive
			boardArr[i][j].display()
		}
	}
}

function stopAnimate(){
cancelAnimationFrame(animationID)
}

let animating = false
startBtn.addEventListener("click",()=>{
	!animating ? animate() : stopAnimate()
	animating = !animating
})
