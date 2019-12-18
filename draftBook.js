class Token {
	constructor (value = 0) {
		this.value = value;
	}
}

class Memento {
	constructor () {
		this.tokens = [];
	}
}

class TokenMachine {
	constructor () {
		this.tokens = [];
	}

	addTokenValue(value) {
		return this.addToken(new Token(value));
	}

	addToken(token) {
		this.tokens.push(token);
		let m = new Memento();
		let copiedTokens = this.tokens.map(t => new Token(t.value));
		m.tokens = copiedTokens;
		return m;
	}

	revert(m) {
		this.tokens = m.tokens;
	}
}

let tm = new TokenMachine();

let token = new Token(111);
tm.addToken(token);
let m = tm.addTokenValue(222);

token.value = 333;
console.log(m.tokens);
console.log();
tm.revert(m);