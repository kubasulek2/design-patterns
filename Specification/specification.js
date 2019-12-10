

// color enum
const Color = Object.freeze({
	red: 'red',
	blue: 'blue',
	green: 'green'
});

// size enum
const Size = Object.freeze({
	small: 'small',
	medium: 'medium',
	large: 'large'
});

// Product class.
class Product {
	constructor (name, color, size) {
		this.name = name;
		this.color = color;
		this.size = size;
	}
}
// simple specification
class SizeSpecification {
	constructor (size) {
		this.size = size;
	}

	isSatisfied (item) {
		return item.size === this.size;
	}
}
// simple specification
class ColorSpecification {
	constructor (color) {
		this.color = color;
	}

	isSatisfied (item) {
		return item.color === this.color;
	}
}
//combinator - specification that combine any number of specs.
class AndSpecification {
	constructor (...specs) {
		this.specs = specs;
	}

	isSatisfied (item) {
		return this.specs.every(spec => spec.isSatisfied(item));
	}
}
//combinator - specification that combine any number of specs.
class OrSpecification {
	constructor (...specs) {
		this.specs = specs;
	}

	isSatisfied (item) {
		return this.specs.some(spec => spec.isSatisfied(item));
	}
}

// filter class
class ProductFilter {
	filter (items, spec) {
		return items.filter(i => spec.isSatisfied(i));
	}
}

// products
let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.red, Size.large);
let house = new Product('House', Color.blue, Size.large);
let ball = new Product('Ball', Color.green, Size.small);

// products array
const products = [apple, tree, house, ball];

// filter
const pf = new ProductFilter();

// green and large combined spec
const complexSpec = new AndSpecification(new ColorSpecification(Color.green), new SizeSpecification(Size.small));

for (const p of pf.filter(products, complexSpec)) {
	console.log(`${ p.name } is small and green.`);
}