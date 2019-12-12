/* Singleton is used when only one instance of object is required. It makes sure than no more will be created. */

class Singleton {
	constructor (a) {
		const instance = this.constructor.instance;

		// return if there is already instance.
		if (instance) {
			return instance;
		}
		this.a = a;
		this.constructor.instance = this;

	}
	getA () { console.log('This is a: ' + this.a); }
}

const s = new Singleton(2);
const s2 = new Singleton(4);
s.getA();
s2.getA();
console.log(s === s2);

/* Another version of singleton: you can create multiple instances but they will share state. */
/* Need to remember that you recreating(overriding) a singleton though. */
/* It's worse !!!! */



/* You set getters and setters for instances that refers to class only props. */
class ChiefExecutiveOfficer {
	get name () { return ChiefExecutiveOfficer._name; }
	set name (value) { ChiefExecutiveOfficer._name = value; }

	get age () { return ChiefExecutiveOfficer._age; }
	set age (value) { ChiefExecutiveOfficer._age = value; }

	toString () {
		return `CEO's name is ${ this.name } ` +
			`and he is ${ this.age } years old.`;
	}
}
/* class only props*/
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

let ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adam Smith';
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'John Gold';
ceo2.age = 66;

console.log(ceo.toString()); // 'John Gold'
console.log(ceo2.toString()); // 'John Gold
