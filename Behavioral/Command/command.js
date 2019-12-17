class BankAccount {
	constructor (balance = 0) {
		this.balance = balance;
	}
	deposit(amount) {
		this.balance += amount;
		console.log(
			`Deposited ${ amount }, balance is now ${ this.balance }`
		);
	}

	withdraw(amount) {
		if (this.balance - amount >= BankAccount.overdraftLimit) {
			this.balance -= amount;
			console.log(
				`Withdrew ${ amount }, balance is now ${ this.balance }`
			);
			return true;
		}
		return false;
	}

	toString() {
		return `Balance: ${ this.balance }`;
	}
}
BankAccount.overdraftLimit = -500;

let Action = Object.freeze({
	deposit: 1,
	withdraw: 2
});

class BankAccountCommand {
	constructor (account, action, amount) {
		this.account = account;
		this.action = action;
		this.amount = amount;
		this.success = false;
	}
	call() {
		switch (this.action) {
			case Action.deposit:
				this.account.deposit(this.amount);
				this.success = true;
				break;
			case Action.withdraw:
				this.success = this.account.withdraw(this.amount);
				break;
			default:
				break;
		}
	}
	undo() {
		// return when command wasn't successful.		
		if (!this.success) return;
		switch (this.action) {
			case Action.deposit:
				this.account.withdraw(this.amount);
				break;
			case Action.withdraw:
				this.account.deposit(this.amount);
				break;
			default:
				break;

		}
		// extra protection - cant deposit and then undo two times
		this.success = false;

	}
}

let ba = new BankAccount(100);

let cmd = new BankAccountCommand(ba, Action.deposit, 200);
cmd.call();

cmd = new BankAccountCommand(ba, Action.withdraw, 900); // Failure over limit.
cmd.call();
cmd.undo(); // it's protected, doesn't return what have not succeeded to withdraw
console.log(ba.balance);