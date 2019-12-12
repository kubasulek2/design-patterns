/* Prototype - a partially or  fully initialized object that you copy(clone)  and make use of it*/

/* Explicit copy example */
class Address {
	constructor (streetAddress, city, country) {
		this.streetAddress = streetAddress;
		this.city = city;
		this.country = country;
	}

	toString () {
		return `Address: ${ this.streetAddress }, ` +
			`${ this.city }, ${ this.country }`;
	}
}

class Person {
	constructor (name, address) {
		this.name = name;
		this.address = address; //!
	}

	toString () {
		return `${ this.name } lives at ${ this.address }`;
	}

	greet () {
		console.log(
			`Hi my name is ${ this.name }` +
			`My address is ${ this.address.toString() }`
		);
	}
}
/* eslint-disable no-prototype-builtins */


/* This wont work with functions in constructor */
class Serializer {
	constructor (types) {
		this.types = types;
	}

	/* This recursive function can apply typeIndex to complex types (obj, arr etc.)
	if you try add a property to eg. plain number, you will silently fail: number.property = undefined */
	markRecursive (object) {
		let idx = this.types.findIndex(t => t.name === object.constructor.name);

		if (idx !== -1) {
			object['typeIndex'] = idx;

			for (let key in object) {
				if (object.hasOwnProperty(key) && object[key] !== null) {
					this.markRecursive(object[key]);
				}
			}
		}
	}

	unmarkRecursive (object) {

		let idx = this.types.findIndex(t => t.name === object.constructor.name);

		if (idx !== -1) {
			delete object.typeIndex;

			for (let key in object) {
				if (object.hasOwnProperty(key) && object[key] !== null) {
					this.unmarkRecursive(object[key]);
				}
			}
		}
	}

	/* mark object, serialize it, unmark old object, reconstruct new object */
	clone (object) {
		this.markRecursive(object);
		let copy = JSON.parse(JSON.stringify(object));
		this.unmarkRecursive(object);
		return this.reconstructRecursive(copy);
	}

	/* Recursively reconstructing object */
	reconstructRecursive (object) {
		if (object.hasOwnProperty('typeIndex')) {
			let type = this.types[object.typeIndex];
			let obj = new type();
			for (let key in object) {
				if (object.hasOwnProperty(key) && object[key] !== null) {
					obj[key] = this.reconstructRecursive(object[key]);
				}
			}
			delete obj.typeIndex;
			return obj;
		}
		return object;
	}
}

const john = new Person('John',
	new Address('123 London Road', 'London', 'UK'));

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
// json will only copy properties, not functions, also object will become plain object and loose its relation to a class. For example wont be reach to its prototype;	

//const jane = JSON.parse(JSON.stringify(john));


const s = new Serializer([Person, Address]);
const july = s.clone(john);

july.address.city = 'Sriraha';

console.log('john:', john);
console.log('july:', july);

