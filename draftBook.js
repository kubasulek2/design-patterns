class Shape {
	constructor (name, renderer) {
		this.render = renderer;
		this.name = name;
	}
}

class Triangle extends Shape {
	constructor (renderer) {
		super('triangle', renderer);
	}
}

class Square extends Shape {
	constructor (renderer) {
		super('square', renderer);
	}
}

class VectorRenderer {
	whatToRenderAs (name) {
		return `Drawing ${ name } as lines`;
	}
}

class RasterRenderer {
	whatToRenderAs (name) {
		return `Drawing ${ name } as pixels`;
	}
}
const rr = new RasterRenderer();
const vr = new VectorRenderer();

const tr = new Triangle(rr);
const tv = new Triangle(vr);
const sr = new Square(rr);
const sv = new Square(vr);

console.log(tr.render.whatToRenderAs(tr.name));
console.log(tv.render.whatToRenderAs(tv.name));
console.log(sr.render.whatToRenderAs(sr.name));
console.log(sv.render.whatToRenderAs(sv.name));