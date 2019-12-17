class ExpressionProcessor {
	constructor () {
		this.variables = {};
		this.nextOp = Object.freeze({
			nothing: 0,
			plus: 1,
			minus: 2
		});
	}

	calculate(expression) {
		debugger;
		let current = 0;
		let nextOp = this.nextOp.nothing;

		let parts = expression.split(/(?<=[+-])/);
		console.log(parts);

		for (let part of parts) {
			let noop = part.split("+-");
			let first = noop[0];
			let value = 0, z = 0;

			z = parseInt(first);
			if (!isNaN(z))
				value = z;
			else if (first.length === 1
				&& this.variables[first[0]] !== undefined) {
				value = this.variables[first[0]];
			}
			else return 0;

			switch (nextOp) {
				case this.nextOp.nothing:
					current = value;
					break;
				case this.nextOp.plus:
					current += value;
					break;
				case this.nextOp.minus:
					current -= value;
					break;
			}

			if (part.endsWith('+')) nextOp = this.nextOp.plus;
			else if (part.endsWith('-')) nextOp = this.nextOp.minus;
		}
		return current;
	}
}


let c = new ExpressionProcessor();

console.log(c.calculate('1+2+30'));