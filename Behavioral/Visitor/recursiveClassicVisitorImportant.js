class Integer {
	constructor (value) {
		this.value = value;
	}

	accept(visitor) {
		visitor.visitValue(this);
	}
}

class BinaryExpression {
	constructor (lhs, rhs) {
		this.lhs = lhs;
		this.rhs = rhs;
	}
}

class AdditionExpression extends BinaryExpression {
	constructor (lhs, rhs) {
		super(lhs, rhs);
	}

	accept(visitor) {
		visitor.visitAddition(this);
	}
}

class MultiplicationExpression extends BinaryExpression {
	constructor (lhs, rhs) {
		super(lhs, rhs);
	}

	accept(visitor) {
		visitor.visitMultiplication(this);
	}
}

class ExpressionPrinter {
	constructor () {
		this._buffer = [];
	}

	visitValue(value) {
		this._buffer.push(value.value);
	}
	// recursion for complex expressions
	visitAddition(ae) {
		this._buffer.push('(');
		ae.lhs.accept(this);
		this._buffer.push('+');
		ae.rhs.accept(this);
		this._buffer.push(')');
	}

	// recursion for complex expressions
	visitMultiplication(me) {
		me.lhs.accept(this);
		this._buffer.push('*');
		me.rhs.accept(this);
	}

	toString() {
		return this._buffer.join('');
	}
}
