/* Real image uses resource, even if it wont be drawn. */
class Image {
	constructor (url) {
		this.url = url;
		// here im loading
		console.log(`Loading image from ${ this.url }`);
	}

	draw () {
		console.log(`Drawing image ${ this.url }`);
	}
}

/* virtual proxy */
class LazyImage {
	constructor (url) {
		this.url = url;
	}

	draw () {
		// im loading image only when if not exists already and im drawing
		if (!this.image)
			this.image = new Image(this.url);
		// call underlying Image class method	
		this.image.draw();
	}
}

/* function to show whats going on */
function drawImage (img) {
	console.log('About to draw the image');
	img.draw();  // With lazy image, wont load image, if draw isn't called.
	console.log('Done drawing the image');
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);