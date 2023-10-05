
let countDiv;
let count = 0;
let first_body;
let second_body;
let digits=5;
let FPS=10**digits-2
class body {
	constructor(x_coordinate,width,velocity,mass,constrain) {
		this.x=x_coordinate;
		this.y=height-width;
		this.w=width;
		this.v=velocity;
		this.m=mass;
		this.constrain=constrain  //дальше этой координаты блок не может рисоваться
	}

	update(){
		this.x+=this.v;
	}

	show(){
		const x = constrain(this.x, this.constrain, width);
		square(x, this.y,this.w);

	}

	bump(other) {
		return !(this.x + this.w < other.x ||
			this.x > other.x + other.w); // +this.w so we check not center of body but left/right corner

	}
	push_off(other){
		return ((this.m-other.m)/(this.m+other.m))*this.v+ ((2*other.m)/(this.m+other.m))*other.v
	}

	hit_the_wall (){
		return	this.x<=0;
	}
	reverse() {
		this.v *= -1;
	}


}




function preload() {
	blockImg = loadImage('block.png');
}

function setup() {
	createCanvas(3000, 300);
	background(51);

	countDiv = createDiv(count);

	let m2=100**digits-1
	first_body=new body(100,20,0,1,0);
	second_body=new body(200,150,-1/FPS,m2,first_body.w)    //-1/FPS,m2 so same velocity but divided by amount of frames per second

}

function draw() {
	background(0);

	for (let i=0;i<FPS;++i) {

		if (first_body.bump(second_body)) {
			let v1 = first_body.push_off(second_body);
			let v2 = second_body.push_off(first_body);
			first_body.v = v1;
			second_body.v = v2;
			count++;

		}
		if (first_body.hit_the_wall()) {
			first_body.reverse()
			count++;
		}


		first_body.update();
		second_body.update();
	}
	first_body.show();
	second_body.show();


countDiv.html(nf(count,digits+1))


}
