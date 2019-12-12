/* Prototype factory is when we wont to use more then one prototype and for that have factory class that will create copies of desired prototype. */



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

class Address {
	constructor (suite, streetAddress, city) {
		this.suite = suite;
		this.streetAddress = streetAddress;
		this.city = city;
	}

	toString () {
		return `Suite ${ this.suite }, ${ this.streetAddress }, ${ this.city }`;
	}
}

class Employee {
	constructor (name, address) {
		this.name = name;
		this.address = address;
	}
	toString () {
		return `${ this.name } lives at: ${ this.streetAddress.toString() }.`;
	}
}


class EmployeeFactory {
	/* This is an abstract class it shouldn't be instantiated. */
	constructor () {
		if (this.constructor.name === 'EmployeeFactory') {
			throw new Error('This is abstract class');
		}
	}
	/* Private method */
	static _newEmployee (proto, name, suite) {
		let copy = EmployeeFactory.serializer.clone(proto);
		copy.name = name;
		copy.address.suite = suite;
		return copy;
	}
	/* static method for one prototype */
	static newMainOfficeEmployee (name, suite) {
		return this._newEmployee(
			this.main, name, suite
		);
	}

	/* static method for another prototype */
	static newAuxOfficeEmployee (name, suite) {
		return this._newEmployee(
			this.aux, name, suite
		);
	}
}
EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 London Road', 'Oxford'));

let john = EmployeeFactory.newMainOfficeEmployee('John', 403);
let andres = EmployeeFactory.newAuxOfficeEmployee('Andres', 113);

console.log(john);
console.log(andres);