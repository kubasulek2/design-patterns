/* Normal storage */
class User {
	constructor (fullName) {
		this.fullName = fullName;
	}
}

/* Flyweight storage */
class User2 {
	constructor (fullName) {
		let getOrAdd = function (s) {
			// is string in array of unique strings
			let idx = User2.strings.indexOf(s);
			// if is return index
			if (idx !== -1) return idx;
			else {
				// else add string, and return index
				User2.strings.push(s);
				return User2.strings.length - 1;
			}
		};
		// split full name and  return indexes for each part ==> [12,84]
		this.names = fullName.split(' ').map(getOrAdd);
	}
}
/* stores all unique strings */
User2.strings = [];

/* this part is for testing */

// random number
function getRandomInt (max) {
	return Math.floor(Math.random() * Math.floor(max));
}

/* random strings using random number fn */
let randomString = function () {
	let result = [];
	for (let x = 0; x < 10; ++x)
		result.push(String.fromCharCode(65 + getRandomInt(26)));
	return result.join('');
};

let users = [];
let users2 = [];
let firstNames = [];
let lastNames = [];

/* generate 100 random first names and 100 random lastnames */
for (let i = 0; i < 100; ++i) {
	firstNames.push(randomString());
	lastNames.push(randomString());
}

// make 10k users
for (let first of firstNames)
	for (let last of lastNames) {
		users.push(new User(`${ first } ${ last }`));
		users2.push(new User2(`${ first } ${ last }`));
	}

// this is a ballpark comparison (very unscientific)
// actual memory gains are huge!
console.log('10k users take up approx ' +
	`${ JSON.stringify(users).length } chars`); // 370k

let users2length =
	[users2, User2.strings].map(x => JSON.stringify(x).length)
		.reduce((x, y) => x + y);
console.log('10k flyweight users take up approx ' +
	`${ users2length } chars`); // 190k

