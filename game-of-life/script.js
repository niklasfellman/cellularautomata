const startBtn = document.querySelector(".start-btn")
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")
let width = 950;
let height = 950;
canvas.width = width
canvas.height = height
let resolution = 200

class Cell{
	constructor(x,y){
		this.x = x
		this.y = y
		this.alive = Math.random() > .5 ? true:false
		this.previous = this.alive
		this.neighbors = 0
		this.next = true	
		this.timeSinceAlive = 0
	}

	display(){
		//c.fillStyle = this.alive ? "white" : "black"
		c.fillStyle = `hsl(20,${this.timeSinceAlive }%,${100 - this.timeSinceAlive / 2}%)`
		c.fillRect(this.x*width/resolution,this.y*height/resolution,width/resolution,height/resolution)	
// =>=>=>=> FOR TROUBLESHOOTING NEIGHBORS <=<=<=<=<=
		//c.fillStyle = "red"
		//c.font = "12px Arial"
		//c.fillText(this.neighbors,this.x*width / resolution + height/resolution/2 - 3,(this.y*height /resolution) + (height/resolution)/2 +5)
// ===================================================================================================================================================
		this.deadOrAlive()
		this.updateTimeAlive()
	}

	updateNeighbors(x){
		if(this.alive){x = x-1}
		this.neighbors = x
	}

	deadOrAlive(){
		if(!this.alive && this.neighbors === 3){
			this.next = true
		}
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
	if(time - previousTime < 100){
		return
	}
	previousTime = time
	
	for(let i = 0;i<boardArr.length;i++){
		for(let j = 0;j<boardArr[i].length;j++){
			let count = 0
			for(let k = -1;k<2;k++){
				for(let l  = -1;l<2;l++){
					let current = boardArr[(i+k+resolution)%resolution][(j+l + resolution)%resolution]
					if(current.alive){
						count ++	
					}
				}
			}	
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
