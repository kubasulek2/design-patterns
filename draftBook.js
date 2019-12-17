let Action = Object.freeze({
	deposit: 0,
	withdraw: 1
});

class Command {
	constructor (action, amount) {
		this.action = action;
		this.amount = amount;
		this.success = false;
	}
}

class Account {
	constructor () {
		this.balance = 0;
	}

	process(cmd) {
		switch (cmd.action) {
			case Action.deposit:
				this.balance += cmd.amount;
				cmd.success = true;
				break;
			case Action.withdraw:
				if (this.balance - cmd.amount < 0) return cmd.success = false;
				this.balance = this.balance -= cmd.amount;
				cmd.success = true;
				break;
			default:
				break;
		}
	}
}