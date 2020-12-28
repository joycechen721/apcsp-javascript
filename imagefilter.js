var RED = 0;
var GREEN = 1;
var BLUE = 2;
/* makes the amount of red in the original pixel become the amount of blue in the original
 * pixel + vice versa.
 */
function customFilter(image) {
    for (var x = 0; x < IMAGE_WIDTH; x++){
        for (var y = 0; y < IMAGE_HEIGHT; y++){
            var pixel = image.getPixel(x,y);
            var newPixel = modify(pixel);
            
            image.setRed(x,y,newPixel[RED]);
            image.setGreen(x,y,newPixel[GREEN]);
            image.setBlue(x,y,newPixel[BLUE]);
        }
    }
}


function modify(pixel){
    pixel[RED] = pixel[BLUE];
    pixel[BLUE] = pixel[RED];
    return pixel;
}

 
// Constants for the image
var IMAGE_URL = "https://codehs.com/static/img/about/goldengate.jpg";
var IMAGE_WIDTH = 350;
var IMAGE_HEIGHT = 250;
var IMAGE_X = getWidth() / 2 - IMAGE_WIDTH / 2;
var IMAGE_Y = getHeight() / 2 - IMAGE_HEIGHT / 2;

// We need to wait for the image to load before modifying it
var IMAGE_LOAD_WAIT_TIME = 450; 

function start() {
    // Set up the image
    var image = new WebImage(IMAGE_URL);
    image.setSize(IMAGE_WIDTH, IMAGE_HEIGHT);
    image.setPosition(IMAGE_X, IMAGE_Y);
    
    // Add it to the canvas
    add(image);
    
    // Wait for it to load before applying the filter
    setTimeout(function(){
        customFilter(image);
    }, IMAGE_LOAD_WAIT_TIME);
}
