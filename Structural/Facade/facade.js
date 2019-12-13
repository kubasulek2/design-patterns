/* Low-level module. */
class Buffer extends Array {
	constructor (width = 30, height = 30) {
		super();
		this.width = width;
		this.height = height;
		this.alloc(width * height);
	}

	write (text, position = 0) {
		//
	}
}

/* Low-level module. */
class ViewPort {
	constructor (buffer = new Buffer()) {
		this.buffer = buffer;
		this.offset = 0;
	}

	append (text, pos) {
		this.buffer.write(text, pos + this.offset);
	}

	getChatAt (index) {
		return this.buffer[this.offset + index];
	}
}

/* Facade */
class Console {
	constructor () {
		this.buffer = new Buffer();
		this.currentViewport = new ViewPort(
			this.buffer
		);
		this.buffers = [this.buffer];
		this.viewports = [this.viewport];
	}

	write (text) {
		this.currentViewport.buffer.write(text);
	}

	getCharAt (index) {
		return this.currentViewport.getChatAt(index);
	}
}

const c = new Console();
c.write('text');
c.getCharAt(12);