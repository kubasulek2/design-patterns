/* tag class */
class Tag {
	constructor (name = '', text = '') {
		this.name = name;
		this.text = text;
		this.children = [];
	}

	/* static method indentSize */
	static get indentSize () { return 2; }

	/* html formatting and so on */
	toStringImpl (indent) {
		let html = [];
		let i = ' '.repeat(indent * Tag.indentSize);

		html.push(`${ i }<${ this.name }>\n`);

		if (this.text.length) {
			html.push(`${ ' '.repeat(Tag.indentSize * (indent + 1)) }`);
			html.push(`${ this.text }\n`);
		}

		for (const c of this.children) {
			html.push(c.toStringImpl(indent + 1));
		}

		html.push(`${ i }</${ this.name }>\n`);
		return html.join('');
	}
	/* to string call own implementation of toString */
	toString () {
		return this.toStringImpl(0);
	}
	/* Thats the way to create Api. */
	static create (name, text) {
		return new HtmlBuilder(name, text);
	}
}

/* Class HtmlBuilder that is our Api. can be created either by new HtmlBuilder or Tag.create() */
class HtmlBuilder {
	constructor (rootName) {
		this.root = new Tag(rootName);
		this.rootName = rootName;
	}

	/* add a child tag with possibility of chaining */
	addChildFluent (childName, childText = '') {
		let child = new Tag(childName, childText);
		this.root.children.push(child);
		return this;
	}

	/* this.root is a Tag so has access to own toString method */
	toString () {
		return this.root.toString();
	}
	/* Clear a tag by setting it to empty one. */
	clear () {
		this.root = new Tag(this.rootName);
	}
	/* Just a way to indicate this is an API, can also be accessed via HtmlBuilder.root */
	build () {
		return this.root;
	}

}

const words = ['hello', 'world', 'finally'];
//let builder = new HtmlBuilder('ul');

// another way of setting the builder;
let builder = Tag.create('ul');

for (const w of words) {
	builder.addChildFluent('li', w);
}

console.log(builder.build().toString());

// here new empty ul builder
builder.clear();

builder
	.addChildFluent('li', 'foo')
	.addChildFluent('li', 'bar')
	.addChildFluent('li', 'bas');


/* grand children */
const imgBuilder = Tag.create('div');

imgBuilder.addChildFluent('img');

const ul = builder.build();

ul.children[0].children.push(imgBuilder.build());

console.log(ul.toString());