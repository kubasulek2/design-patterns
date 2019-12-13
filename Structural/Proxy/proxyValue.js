class Percentage {
	constructor (percent = 0) {
		this.percent = percent;
	}
	toString () {
		return `${ this.percent }%`;
	}
	// override default valueOf
	valueOf () {
		return this.percent / 100;
	}

}

const fivePercent = new Percentage(5);

/* How to achieve this: */
// 100 * 5% = 5;

console.log(100 * fivePercent);
