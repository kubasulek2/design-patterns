// FACTORIES ARE USED WHEN THERE IS A COMPLEX OBJECT WITH A LOT OF CONDITIONAL PARAMS ETC 
// AND OPPOSITELY TO BUILDER IT IS ONE STEP CREATION


// Factory methods example:
const CoordinateSystem = {
	CARTESIAN: 0,
	POLAR: 1
};

class Point {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
	// old constructor handling conditional logic, if we want add third way we would have
	// to mess up with open/close principle.

	// constructor(a, b, cs=CoordinateSystem.CARTESIAN)
	// {
	//   switch (cs)
	//   {
	//     case CoordinateSystem.CARTESIAN:
	//       this.x = a;
	//       this.y = b;
	//       break;
	//     case CoordinateSystem.POLAR:
	//       this.x = a * Math.cos(b);
	//       this.y = a * Math.sin(b);
	//       break;
	//   }
	//
	//   // steps to add a new system
	//   // 1. augment CoordinateSystem
	//   // 2. change ctor
	// }

	// factory method;
	static newCartesianPoint (x, y) {
		return new Point(x, y);
	}

	// factory method;
	static newPolarPoint (rho, theta) {
		return new Point(
			rho * Math.cos(theta),
			rho * Math.sin(theta)
		);
	}
	// also can be that way
	//static get factory () { return new PointFactory(); }
}

// factory class example

class PointFactory {
	static newCartesianPoint (x, y) {
		return new Point(x, y);
	}
	static newPolarPoint (rho, theta) {
		return new Point(
			rho * Math.cos(theta),
			rho * Math.sin(theta)
		);
	}
}


/* Factory with non static method (factory that store some data) */

class Person {
	constructor (id, name) {
		this.id = id;
		this.name = name;
	}
}

class PersonFactory {
	constructor () {
		this.count = 0;
	}
	createPerson (name) {
		return new Person(this.count++, name); // increment counter
	}
}