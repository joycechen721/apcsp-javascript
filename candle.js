var candleColor1 = new Color(255, 226, 136); 
var candleColor2 = new Color(255, 233, 166);
var shadowColor = new Color(66, 52, 48);
var x = 200; var y = 350; 
var width = 0; var height = 0;
var fire; var shadow; var snowflake;
var degree = 0; var TIME = 1000;
var spiritedAway = new Audio('https://codehs.com/uploads/9e4574507aaf9bdc64a76a2590058629');

function start(){
    var size = readLine("Size of candle (S, M, L): ");
    checkSize(size);
    
    createSnow();
    setTimer(animateSnow, 200);
    createCandle();
    keyDownMethod(keyCandle);
    
    spiritedAway.play();
    spiritedAway.loop = true;
}


function checkSize(size){
    if (size == "S" || size == "s"){
        width = 75;
        height = 100;
    }
    else if (size == "M" || size == "m"){
        width = 120;
        height = 170;
    }
    else{
        width = 150;
        height = 200;
    }
}

var colorArr = [new Color(202, 237, 248), new Color(175, 235, 255), new Color(160, 215, 232)];
var snowArr = []; 
var xCoorArr = [];
var yCoorArr = [];
var count = 0;
function createSnow(){
    for (var k = 0; k < 8; k++){
        for (var i = 0; i < colorArr.length; i++){
            for (var j = 0; j < 25; j++){
                snowflake = new Circle(2);
                
                xCoorArr[count] = 20 + j * 14.5;
                yCoorArr[count] = 20 + i * (getHeight()/24) + k * (getHeight() / 8);
                
                snowflake.setPosition(xCoorArr[count],  yCoorArr[count]);
                snowflake.setColor(colorArr[i]);
                
                snowArr[count] = snowflake;
                count++;
                add(snowflake);
           }
        }
    }
}

function animateSnow(){
    for (var i = 0; i < count; i++){
        yCoorArr[i] += 10;
        if (yCoorArr[i] > getHeight()){
            snowArr[i].setPosition(xCoorArr[i], 2);
            yCoorArr[i] = 2;
        }
        else{
            snowArr[i].setPosition(xCoorArr[i], yCoorArr[i]);
        }
    }
}

function keyCandle(e){
    if(e.keyCode == Keyboard.letter('B')){
        stopTimer(rotate);
	    remove(fire);
	    remove(shadow);
	}
	else if(e.keyCode == Keyboard.letter('L')){
	    var color = readLine("Color of candle: ");
	    createShadow();
	    createCandle();
	    createFlame(color);
	    setTimer(rotate, TIME);
	}
}

function rotate() {
    if (degree == 10){
        fire.rotate(-20);
        fire.setPosition(x - 5, y - height - height/3.3);
        shadow.setPosition(x - 15, y);
        degree -= 20;
    }
    else{
        fire.rotate(20);
        fire.setPosition(x + 5, y - height - height/3.3);
        shadow.setPosition(x + 11, y);
        degree += 20;
    }
}

function createFlame(userCol){
    fire = new Oval(width / 2.2, height / 2);
    fire.setColor(userCol);
    fire.setPosition(x , y - height - height/3.3);
    fire.rotate(10);
    degree = 10;
    add(fire);
}

function createShadow(){
    shadow = new Oval(width * 1.75, height / 1.5);
    shadow.setPosition(x, y);
    shadow.setColor(shadowColor);
    add(shadow);
}

function createCandle(){
    createSupport();
    createWick();
    createText();
}

function createSupport() {
    var middle = new Rectangle(width, height);
    middle.setPosition(x - width/2, y - height);
    middle.setColor(candleColor1);
    add(middle);
    
    var bottom = new Oval(width, height - height / 1.5);
    bottom.setPosition(x, y);
    bottom.setColor(candleColor1);
    add(bottom);
    
    var top = new Oval(width, height - height / 1.5);
    top.setPosition(x, y - height);
    top.setColor(candleColor2);
    add(top);
    
}

function createWick(){
    var wick = new Rectangle(width/20, height/10);
    wick.setPosition(x - width/35, y - height - height/10);
    wick.setColor(new Color(240, 210, 120));
    add(wick);
}

function createText(){
    var txt = new Text("Press 'L' to light candle. Press 'B' to blow candle.", "10pt Arial");
    var txt2 = new Text("           CANNOT light candle consecutively.", "10pt Arial");
    txt.setPosition(x - 150, y + 100);
    txt2.setPosition(x - 150, y + 120);
    txt.setColor(Color.BLACK);
    txt2.setColor(Color.BLACK);
    add(txt);
    add(txt2);
}
