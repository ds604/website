function setup() {
	createCanvas(windowWidth,windowHeight);
	noStroke();
	colorMode(HSB);
}

function draw() {
  fill(random(255),255,255);
  var d=map(mouseY,0,height,1,50);
  ellipse(mouseX,mouseY,d,d);
}