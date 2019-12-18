class Memento {
	constructor (balance) {
		this.balance = balance;
	}
}
class BankAccount {
	constructor (balance) {
		this.balance = balance;
		this.changes = [new Memento(balance)];
		this.current = 0;
	}

	deposit(amount) {
		this.balance += amount;
		let m = new Memento(this.balance);
		this.changes.push(m);
		this.current++;
		return m;
	}
	restore(m) {
		if (m) {
			this.balance = m.balance;
			this.changes.push(m);
			this.current = this.changes.length - 1;
		}
	}

	undo() {
		if (this.current > 0) {
			let m = this.changes[--this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	redo() {
		if (this.current + 1 < this.changes.length) {
			let m = this.changes[++this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	toString() {
		return `Balance: ${ this.balance }`;
	}
}

let ba = new BankAccount(100);
let m1 = ba.deposit(50);
let m2 = ba.deposit(25);

console.log(ba.toString());

ba.undo();
ba.undo();
console.log(ba.toString());
ba.undo(); // doesn't work beyond initial state

console.log(ba.toString());

ba.redo();
console.log(ba.toString());
let m3 = ba.redo();
console.log(ba.toString());
ba.redo();
console.log(ba.toString()); // doesn't go beyond last state

ba.deposit(200);
console.log(ba.toString());

ba.restore(m3);
console.log(ba.toString());

