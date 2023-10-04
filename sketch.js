
let countDiv;
let count = 0;
class body {
	constructor(x_coordinate,width,velocity,mass) {
		this.x=x_coordinate;
		this.y=height-width;
		this.w=width;
		this.v=velocity;
		this.m=mass
	}

	update(){
		this.x+=this.v;
	}

	show(){
		square(this.x, this.y,this.w);

	}

	bump(other) {
		return !(this.x + this.w < other.x ||
			this.x > other.x + other.w); // +this.w so we check not center of body but left/right corner

	}
	push_off(other){
		let sumM = this.m + other.m;
		let newV = (this.m - other.m) / sumM * this.v;
		newV += (2 * other.m / sumM) * other.v;
		return newV;
	}

	hit_the_wall (){
		return	this.x<=0;
	}
	reverse() {
		this.v *= -1;
	}


}

let first_body;
let second_body;


function preload() {
	blockImg = loadImage('block.png');
}

function setup() {
	createCanvas(3000, 300);

	background(51);
	countDiv = createDiv(count);
	first_body=new body(100,20,0,1000);
	second_body=new body(200,150,-90,10000000)

}

function draw() {
	background(0);
	if (first_body.bump(second_body)){
		const v1 = first_body.push_off(second_body);
		const v2 = second_body.push_off(first_body);
		first_body.v = v1;
		second_body.v = v2;
		count++;

	}
	if(first_body.hit_the_wall()){
			first_body.reverse()
		count++;
	}


	first_body.update();
	second_body.update();

	first_body.show();
	second_body.show();


countDiv.html(count)


}
