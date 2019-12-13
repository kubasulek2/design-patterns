/* We store a lot of data */
class FormattedText {
	constructor (plainText) {
		this.plainText = plainText;
		this.caps = new Array(plainText.length).map(
			function () { return false; }
		);
	}

	capitalize (start, end) {
		for (let i = start; i <= end; ++i)
			this.caps[i] = true;
		return this;
	}

	toString () {
		let buffer = [];
		for (let i in this.plainText) {
			let c = this.plainText[i];
			buffer.push(this.caps[i] ? c.toUpperCase() : c);
		}
		return buffer.join('');
	}
}

/* How to use flyweight */

/* range class */
class TextRange {
	constructor (start, end) {
		this.start = start;
		this.end = end;
		this.capitalize = false;
	}
	// check if given position is in range.
	covers (position) {
		return position >= this.start && position <= this.end;
	}

}

/* formating class using Ranges. */
class BetterFormattedText {
	constructor (plainText) {
		this.plainText = plainText;
		this.formatting = [];
	}

	// add range
	getRange (start, end) {
		let range = new TextRange(start, end);
		this.formatting.push(range);
		return range;
	}

	/* format text using ranges */
	toString () {
		let buffer = [];
		for (let i = 0; i < this.plainText.length; i++) {
			/* letter */
			let c = this.plainText[i];

			for (let range of this.formatting) {
				// letter position in range && range is capitalized
				if (range.covers(i) && range.capitalize) {
					c = c.toUpperCase();
					break;
				}
			}
			// push letter to formatted array
			buffer.push(c);
		}
		// stringify array
		return buffer.join('');
	}

}

const formatedText = new BetterFormattedText(
	'This is a moot topic because there is a million ways you can represent this relationship. I\'ve presented the relationship in a way that illustrates LSP best.'
);

formatedText.getRange(0, 25).capitalize = true;

console.log(formatedText.toString());