
class MyDatabase {
	constructor () {
		const instance = this.constructor.instance;
		if (instance) {
			return instance;
		}

		this.constructor.instance = this;


		console.log('Initializing database');
		this.capitals = {}; // get some things from database;

		
	}

	getPopulation (city) {
		// possible error handling here
		return this.capitals[city];
	}
}

// ↑↑↑ low-level module

// ↓↓↓ high-level module

// that breaks Dependency inversion principle 
class SingletonRecordFinder {
	totalPopulation (cities) {
		return cities.map(
			/* High level module depends on implementation details. */
			city => new MyDatabase().getPopulation(city)
		).reduce((x, y) => x + y);
	}
}


/* better solution */
class ConfigurableRecordFinder {
	constructor (database) {
		this.database = database;
	}

	totalPopulation (cities) {
		return cities.map(
			// independent solution
			city => this.database.getPopulation(city)
		).reduce((x, y) => x + y);
	}
}

// for testing you should have some fake database, with first approach this wouldn't be possible. 
class DummyDatabase {
	constructor () {
		this.capitals = {
			'alpha': 1,
			'beta': 2,
			'gamma': 3
		};
	}

	getPopulation (city) {
		// possible error handling here
		return this.capitals[city];
	}
}

describe('singleton database', function () {
	it('is a singleton', function () {
		const db1 = new MyDatabase();
		const db2 = new MyDatabase();
		expect(db1).toBe(db2);
	});

	it('calculates total population', function () {
		let rf = new SingletonRecordFinder();
		let cities = ['Seoul', 'Mexico City'];
		let tp = rf.totalPopulation(cities);
		expect(tp).toEqual(17400000 + 17500000);
	});

	it('calculates total population better', function () {
		let db = new DummyDatabase();
		let rf = new ConfigurableRecordFinder(db);
		expect(rf.totalPopulation(['alpha', 'gamma'])).toEqual(4);
	});
});