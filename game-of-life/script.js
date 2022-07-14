const startBtn = document.querySelector(".start-btn")
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")

let height = 600;
let widthToHeightRatio = 4
let width = height * widthToHeightRatio 
canvas.width = width
canvas.height = height
let resolution = 100

class Cell{
	constructor(x,y){
		this.x = x
		this.y = y
		this.alive = Math.random() * Math.random() > .5 ? true:false
		this.previous = this.alive
		this.neighbors = 0
		this.next = true	
		this.timeSinceAlive = 0
	}

	display(){
	//	c.fillStyle = this.alive ? "white" : "black"
		c.fillStyle = `hsl(20,${this.timeSinceAlive * 2 }%,${100 - this.timeSinceAlive * 1 }%)`
		c.fillRect(this.x * (width/(resolution*(width/height))),this.y*height/resolution,height/resolution,height/resolution)	
		this.deadOrAlive()
		this.updateTimeAlive()
	}

	updateNeighbors(x){
		if(this.alive){x = x-1}
		this.neighbors = x
	}

	deadOrAlive(){
		if(this.alive && this.neighbors === 2 || this.neighbors === 3){
			this.next = true
		}
		else{
			this.next = false
		}
	}

	updateTimeAlive(){
		if(!this.alive){
		this.timeSinceAlive ++
		}
		if(this.alive){
		this.timeSinceAlive = 0
		}
	}
}

let boardArr = []

for(let i = 0;i<resolution * (width / height);i++){
	boardArr.push([])
	for(let j = 0;j<resolution;j++){
		boardArr[i].push(new Cell(i,j))
		boardArr[i][j].display()
	}
}

console.log(boardArr)


let columns = resolution * widthToHeightRatio
let rows = resolution
 
let previousTime
let animationID
function animate(time){
	animationID = requestAnimationFrame(animate)
	if(time - previousTime < 100){
		return
	}
	previousTime = time
	
	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			let count = 0
// =>=>=>=>=>=>=>=>=>=>=>=>=> CHECK FOR NEIGHBORS <=<=<=<=<=<=<=<=<=<=<=<=<=<=
			for(let k = -1;k<2;k++){
				for(let l  = -1;l<2;l++){
					let current = boardArr[(i+k+columns)%columns][(j+l + rows)%rows]
					if(current.alive){
						count ++	
					}
				}
			}	
// =>=>=>=>=>=>=>=>=>=>=>=>=> =================== <=<=<=<=<=<=<=<=<=<=<=<=<=<=
			boardArr[i][j].updateNeighbors(count)
			boardArr[i][j].display()
		}
	}
// =>=>=>=>=>=>=>=>=> WANT TO TRY TO GET THIS INTO PREVIOUS LOOP <=<=<=<=<=<=<=<=
	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			boardArr[i][j].alive = boardArr[i][j].next
		}
	}
}

function stopAnimate(){
	cancelAnimationFrame(animationID)
}

animate()

let animating = false
startBtn.addEventListener("click",()=>{
	!animating ? animate() : stopAnimate()
	animating = !animating
})
