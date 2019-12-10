/* 
For Complex objects (here the example is easy, but in real life there can be huge objects) need
to use couple of builders for managing different aspects of object.
So here you have main builder to combine two sub builders:
*/

class Person {
	constructor () {
		// address
		this.street = this.city = this.postcode = '';

		// employment
		this.companyName = this.position = '';
		this.annualIncome = 0;
	}

	toString () {
		return `Person lives at ${ this.street }, ${ this.city }, ${ this.postcode }\n`
			+ `and works at ${ this.companyName } as a ${ this.position } earning ${ this.annualIncome }`;
	}
}

/* Main builder that combines two sub builders */
class PersonBuilder {
	/* constructor default value new empty person*/
	constructor (person = new Person()) {
		this.person = person;
	}
	/* partial builder */
	get lives () { return new PersonAddressBuilder(this.person); }

	/* partial builder */
	get works () { return new PersonJobBuilder(this.person); }

	build () { return this.person; }
}

// Sub builder

class PersonJobBuilder extends PersonBuilder {
	// this here below is super important: PersonJobBuilder is called by PersonBuilder.works
	// so person  arg in a constructor below is actually person from PersonBuilder
	// then calling super(person) we skip PersonBuilder default constructor value(empty person) and resign a existing person 
	constructor (person) {
		super(person);
	}
	/* API methods */

	at (companyName) {
		this.person.companyName = companyName;
		return this;
	}

	asA (position) {
		this.person.position = position;
		return this;
	}

	earning (annualIncome) {
		this.person.annualIncome = annualIncome;
		return this;
	}

}


/* Second sub builder */

class PersonAddressBuilder extends PersonBuilder {
	constructor (person) {
		super(person);
	}

	at (streetAddress) {
		this.person.street = streetAddress;
		return this;
	}

	withPostcode (postcode) {
		this.person.postcode = postcode;
		return this;
	}

	in (city) {
		this.person.city = city;
		return this;
	}
}

let pb = new PersonBuilder();

/* building here, many steps */
/* Because partial builders inherits from PersonBuilders they can also access another partial builder via inherited getter function */
let person = pb
	.lives.at('Village Street').in('London').withPostcode('00-000')  // inherited get works
	.works.at('Bridge inc.').asA('Director').earning('20 000')
	.build();  // return this person

console.log(person.toString());