function setup() {
	createCanvas(2000, 100);
	background(51);
}

function draw() {

	let  static_object= square(5, 20, 10);
	static_object.fill(0)
	let  moving_object= square(100, 10, 20);

	moving_object.fill(100)


}
