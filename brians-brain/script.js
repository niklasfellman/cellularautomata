const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const createBtn = document.getElementById("create-btn")
const bodySymbolInput = document.getElementById("body-symbol-input")
const trailSymbolInput = document.getElementById("trail-symbol-input")
const settingsBtn = document.querySelector(".settings-btn") 
const settingsContainer = document.querySelector(".settings-container")
	// - - - - - - - - - - - - - -  GAME OF LIFE RULES - - - - - - - - - - - - - -  
		//if(this.alive && this.neighbors === 2 || this.neighbors === 3){
		//	this.alive = true
		//}
		//else{
		//	this.alive = false
		//}

	
	// - - - - - - - - - - - - - - briansbrain without dying state - - - - - - - - - - - - - -  
		//if(this.alive){this.alive = false}
		//if(!this.alive && this.neighbors === 2){this.alive = true}
let rulesArr = ["briansBrain","conways","simpleTwoAlive"]

let rule = rulesArr[0]

let resolution =15
let columns
let rows
let bodySymbol = "#"
let trailSymbol = ";"
		c.font = `${resolution + 4}px courier`
		c.textAlign = "start"
		c.textBaseline = "hanging"
		c.fillStyle = "#fff"

class Cell{
	constructor(x,y,alive = false){
		this.x = x
		this.y = y
		this.alive = Math.random() > .99
		this.neighbors = Math.floor(Math.random() * 6)
		this.dying = false
	}

	toggleState(){
	
	if(rule === "briansBrain"){
	
		if(this.alive){
			this.alive = false
			this.dying = true
			return
		}
		if(this.dying){
			this.alive = false;
			this.dying = false;
			return	
		}
		if(!this.alive && this.neighbors === 2 && this.dying === false){
			this.alive = true;
			return
		}
	}
	if(rule === "conways"){
		if(this.alive && this.neighbors === 2 || this.neighbors === 3){
			this.alive = true
		}
		else{
			this.alive = false
		}
	}	
	if(rule === "simpleTwoAlive"){
		if(this.alive){this.alive = false}
		if(!this.alive && this.neighbors === 2){this.alive = true}

	}}
	
	updateNeighbors(x){
		this.neighbors = x
	}

	display(){
		this.toggleState()
		if(this.dying){
			c.fillStyle = "red"
			c.fillText(trailSymbol,this.x, this.y)
		}	
		if(this.alive){
			c.fillStyle = "#fff"
			c.fillText(bodySymbol,this.x,this.y)
		}
		//if(!this.dying && !this.alive){c.fillText(" ",this.x, this.y)}	
		//c.fillText(this.alive ? "•":"·", this.x, this.y);	
		this.lastX = this.x
		this.lastY = this.y
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
		columns = this.boardArr[0].length
		rows = this.boardArr.length


	}
	
	update(){
		for(let i = 0;i<this.boardArr.length;i++){
			for(let j = 0;j<this.boardArr[i].length;j++){
				let count = 0;
				for(let k = -1;k<2;k++){
					for(let l = -1;l<2;l++){
						let current = this.boardArr[(i+k+rows)%rows][(j+l+columns)%columns]
						if(current.alive){count ++}
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

let previousTime
let animationID

function animate(time){
	
	animationID = requestAnimationFrame(animate)
	//console.log(time - previousTime)	
	if(time - previousTime < 50){
		return
	}
	previousTime = time

	c.clearRect(0,0,canvas.width,canvas.height)
	board.update()
	
}

animate()

function stopAnimate(){
	cancelAnimationFrame(animationID)
}

//let animating = false
//startBtn.addEventListener("click",()=>{
//	!animating ? animate() : stopAnimate()
//	animating = !animating
//})
 console.log(createBtn)
console.log(bodySymbolInput)
console.log(trailSymbolInput)
createBtn.addEventListener("click",()=>{
bodySymbol = bodySymbolInput.value
trailSymbol =trailSymbolInput.value
	board = new Board()
	board.createBoard()
})

settingsBtn.addEventListener("click",()=>{
	settingsContainer.classList.toggle("show")
	settingsBtn.classList.toggle("show")
	console.log("ert")
})

