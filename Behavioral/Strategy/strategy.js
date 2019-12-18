const OutputFormat = Object.freeze({
	markdown: 0,
	html: 1
});

class ListStrategy {
	constructor () {
		if (this.constructor.name === 'ListStrategy') throw new Error('This class is abstract');
	}
	start(buffer) { }
	end(buffer) { }
	addListItem(buffer, item) { }
}

class MarkDownListStrategy extends ListStrategy {
	addListItem(buffer, item) {
		buffer.push(` * ${ item }`);
	}

}

class HtmlListStrategy extends ListStrategy {
	start(buffer) {
		buffer.push('<ul>')
	}

	end(buffer) {
		buffer.push('</ul>');
	}

	addListItem(buffer, item) {
		buffer.push(`  <li>${ item }</li>`);
	}

}

class TextProcessor {
	constructor (outputFormat) {
		this.buffer = [];
		// can alter it later
		this.setOutputFormat(outputFormat);
	}

	setOutputFormat(format) {
		switch (format) {
			case OutputFormat.markdown:
				this.listStrategy = new MarkDownListStrategy();
				break;
			case OutputFormat.html:
				this.listStrategy = new HtmlListStrategy();
				break;
			default:
				return;
		}
	}
	appendList(items) {
		this.listStrategy.start(this.buffer);
		for (let i of items) {
			this.listStrategy.addListItem(this.buffer, i);
		}
		this.listStrategy.end(this.buffer);
	}

	clear() {
		this.buffer = [];
	}

	toString() {
		return this.buffer.join('\n');
	}
}

const tp = new TextProcessor(OutputFormat.html);

tp.appendList(['one', 'two', 'three']);

console.log(tp.toString());

tp.setOutputFormat(OutputFormat.markdown);
tp.appendList(['one', 'two', 'three']);

console.log(tp.toString());