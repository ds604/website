var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
    FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;
    
//Functions.........

function drawCircle() {
	context.beginPath();
  	context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, Math.PI*2, true);
  	context.stroke();
}

function drawNumerals() {
	var numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
        angle = 0,
        numeralWidth = 0;
  
  	numerals.forEach(function(numeral) {
      angle = Math.PI/6 * (numeral-3);
      numeralWidth = context.measureText(numeral).width;
      context.fillText(numeral,
                      canvas.width/2 + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
                      canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);
  });
}

function drawCenter() {
	context.beginPath();
  	context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
  	context.fill();
}

function drawHand(loc, isHour) {
	
}

function drawHands() {}

function drawClock() {}

//Initialization...........