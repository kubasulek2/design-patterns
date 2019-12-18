class Event {
	constructor () {
		// handlers is a map of functions that will be called when event fires.
		this.handlers = new Map();
		// count generates map keys and will be token for unsubscribing
		this.count = 0;
	}

	// add a object to handlers: {key: count, value: function}
	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		// return count as token/index
		return this.count;
	}

	// use token/index for deleting handler from map.
	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	// 1) who fired the event?
	// 2) additional data (event args)
	// all handlers passed must be build like that
	fire(sender, args) {
		this.handlers.forEach(
			// for each value(handler) call handler with those params
			(v, k) => v(sender, args)
		);
	}
}

// special class for handling argument (makes sure they are uniformed)
class FallsIllArgs {
	constructor (address) {
		this.address = address;
	}
}
class Person {
	constructor (address) {
		this.address = address;
		// here we store the event object 
		this.fallsIll = new Event();
	}
	catchCold() {
		// fire event for all handlers stored
		this.fallsIll.fire(
			this,
			new FallsIllArgs(this.address)
		);
	}
}

let person = new Person('123 London');
// sub is return token
// subscribe a person, providing a handler
let sub = person.fallsIll.subscribe((s, a) => {
	// handler: change state of sender log; 
	s.ill = true;  // change the sender
	console.log(`A doctor has been called to ${ a.address }`);
});

person.catchCold(); // state changed, get notification;
person.fallsIll.unsubscribe(sub); // unsubscribe with sub token
person.catchCold(); // nothing happens