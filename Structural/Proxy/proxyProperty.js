/* PropertyProxy is a proxy, behaves like property but do something extra */
class PropertyProxy {
	constructor (value, name = '') {
		this._value = value;
		this.name = name;
	}
	// getters setters
	get value () { return this._value; }
	set value (newValue) {
		if (this._value === newValue)
			return;
		// here do all the extra stuff: here log only.	
		console.log(`Assigning ${ newValue } to ${ this.name }`);
		this._value = newValue;
	}
}

class Creature {
	constructor () {
		this._agility = new PropertyProxy(10, 'agility');
	}
	// getters setters
	get agility () { return this._agility.value; }
	set agility (value) {
		this._agility.value = value;
	}
}

let c = new Creature();
c.agility = 12;
c.agility = 13;