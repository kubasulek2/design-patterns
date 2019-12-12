/* Graphic object is either a base object or collection of graphic objects */
class GraphicObject {
	constructor (name = 'Group ' + (GraphicObject.count++)) {
		this._name = name;
		this.color = undefined; drawing.children.push(new Circle('yellow'));

		/* Here are the children, if its empty it's base object */
		this.children = [];
	}

	get name () { return this._name; }


	toString () {
		let buffer = [];
		this.print(buffer, 0);
		return buffer.join('');
	}

	/* recursive print, if there are children print calls itself with depth + 1 */
	print (buffer, depth) {
		buffer.push('*'.repeat(depth));
		if (depth > 0)
			buffer.push(' ');
		if (this.color)
			buffer.push(this.color + ' ');

		buffer.push(this.name);
		buffer.push('\n');

		for (const child of this.children) {
			child.print(buffer, depth + 1);
		}
	}
}
/* Static property for counting the group */
GraphicObject.count = 0;

class Circle extends GraphicObject {
	constructor (color) {
		super('Circle');
		this.color = color;
	}
}

class Square extends GraphicObject {
	constructor (color) {
		super('Square');
		this.color = color;
	}
}

/* this is group */
let drawing = new GraphicObject();
/* pushing single objects to group */
drawing.children.push(new Square('red'));
drawing.children.push(new Square('blue'));

/* another group */
let group = new GraphicObject();
group.children.push(new Square('red'));
group.children.push(new Square('blue'));

/* push group as a child */
drawing.children.push(group);

drawing.children.push(new Circle('yellow'));
drawing.children.push(new Circle('green'));


console.log(drawing.toString());