let count = 0;

let first_body;
let second_body;

let n;

let FPS=0;

class body {
	constructor(x_coordinate,y_coordinate,width,velocity,mass,constrain) {
		this.x=x_coordinate;
		this.y=y_coordinate;
		this.w=width;
		this.v=velocity;
		this.m=mass;
		this.constrain=constrain  //дальше этой координаты блок не может рисоваться
	}
	update(){
		this.x+=this.v;
	}
	show(){
		square(constrain(this.x, this.constrain, width), this.y,this.w);
	}

	bump(other) {
		return !(this.x + this.w < other.x ||
			this.x > other.x + other.w); // +this.w чтобы считать не центр тела,а его боковые стороны
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
function setup() {
	createCanvas(3000, 300);
	background(51);
	count=0;
	n= parseInt(document.getElementById("userInput").value);

	if (n-2>=0){
		FPS=10**(n-2)
	}
	else {
		FPS=10**n
	}
	let m2=10**n
	first_body=new body(100,height-20 ,20,0,1,0);
	second_body=new body(200, height-150,150,-1/FPS,m2,first_body.w)    //-1/FPS,m2 такая же скорость,но на каждый кадр в секунду
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

	document.getElementById("counter").textContent = "Количество столкновений: " + count

	first_body.show();
	second_body.show();
}
