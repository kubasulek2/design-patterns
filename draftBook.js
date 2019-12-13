class Person {
	constructor (age = 0) {
		this.age = age;
	}

	drink () { return 'drinking'; }
	drive () { return 'driving'; }
	drinkAndDrive () { return 'driving while drunk'; }
}


class ResponsiblePerson {
	constructor (person) {
		this.person = person;
	}
	drink () { 
		return this.person.age < 18 ? 'too young' : 'drinking'; 
	}
	drive () { 
		return this.person.age < 16 ? 'too young' :'driving'; }
	drinkAndDrive () { return 'dead'; }
}


let r = new ResponsiblePerson (new Person(17));

console.log(r.drive());
console.log(r.drink());
console.log(r.drinkAndDrive());