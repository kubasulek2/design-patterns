class CodeBuilder {
	constructor (className) {
		this.class = className;
		this.fields = [];
	}

	addField (name) {
		this.fields.push(name);
		return this
	}

	toString () {
		let code = [];
		let args = this.fields.map((a, i) => i === this.fields.length - 1 ? a : a + ',').join(' ');

		code.push(`class ${ this.class } {\n`);
		if (this.fields.length) {
			code.push(`  constructor (${ args }) {\n`);
			this.fields.forEach(f => code.push(`    this.${ f } = ${ f };\n`));
			code.push('  }\n');
		}
		code.push('}\n');
		return code.join('');
	}
}


let cb = new CodeBuilder('Person');

const code = cb;

console.log(code.toString());