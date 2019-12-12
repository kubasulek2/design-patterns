/* Singelton is used when only one instance of object is required. It makes sure than no more will be created. */

class Singelton {
	constructor (a) {
		const instance = this.constructor.instance;

		// return if there is already instance.
		if(instance){
			return instance;
		}
		this.a = a;
		this.constructor.instance = this;

	}
	getA () { console.log('This is a: ' + this.a);}
}

const s = new Singelton(2);
const s2 = new Singelton(4);

console.log(s === s2);

/* Another version of singelton: you can create multiple instances but they will share state. */