let _age;
class Person {
	constructor (age) {
		_age = age;
		console.log(new.target.name);
	}
	
}
let me = new Person(22);
let me2 = new Person(24);

console.log(me.age, me2.age);