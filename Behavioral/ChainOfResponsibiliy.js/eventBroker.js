/* class handling all modifiers */
class Event {
	constructor () {
		this.handlers = new Map();
		this.count = 0;
	}
	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count;
	}
	unsubscribe(index) {
		this.handlers.delete(index);
	}
	fire(sender, args) {
		this.handlers.forEach((v) => v(sender, args));
	}
}

/* enum */
let whatToQuery = Object.freeze({
	attack: 1,
	defence: 2
});

class Query {
	constructor (creatureName, whatToQuery, value) {
		this.creatureName = creatureName;
		this.whatToQuery = whatToQuery;
		this.value = value;
	}

}

/* Central object */
class Game {
	constructor () {
		this.queries = new Event();
	}
	performQuery(sender, query) {
		this.queries.fire(sender, query);
	}
}

class Creature {
	constructor (game, name, attack, defence) {
		this.game = game;
		this.name = name;
		this.initial_attack = attack;
		this.initial_defence = defence;
	}

	get attack() {
		let q = new Query(this.name, whatToQuery.attack, this.initial_attack);
		this.game.performQuery(this, q);
		return q.value;
	}

	get defence() {
		let q = new Query(this.name, whatToQuery.defence, this.initial_defence);
		this.game.performQuery(this, q);
		return q.value;
	}

	toString() { return `${ this.name } (${ this.attack }/${ this.defence })`; }
}

class CreatureModifier {
	constructor (game, creature) {
		this.game = game;
		this.creature = creature;
		this.token = game.queries.subscribe(
			this.handle.bind(this)
		);
	}

	handle(sender, query) {
		//in inheritors
	}

	dispose() {
		this.game.queries.unsubscribe(this.token);
	}
}

class DoubleAttackModifier extends CreatureModifier {
	constructor (game, creature) {
		super(game, creature);
	}
	handle(sender, query) {
		if (query.creatureName === this.creature.name &&
			query.whatToQuery === whatToQuery.attack
		) {
			query.value *= 2;
		}
	}
}

class DoubleDefenceModifier extends CreatureModifier {
	constructor (game, creature) {
		super(game, creature);
	}
	handle(sender, query) {
		if (query.creatureName === this.creature.name &&
			query.whatToQuery === whatToQuery.defence
		) {
			query.value *= 2;
		}
	}
}
let game = new Game();
let goblin = new Creature(game, 'Strong Goblin', 2, 2);
console.log(goblin.toString());

let dam = new DoubleAttackModifier(game, goblin); // 4/2
let ddm = new DoubleDefenceModifier(game, goblin); // 4/4
let ddm2 = new DoubleDefenceModifier(game, goblin); // 4/8
console.log(goblin.toString());


// unsubscribe modifier
ddm2.dispose(); //4/4

// reset all;
game.queries.handlers.clear();
game.queries.count = 0;
// clear references to release memory
dam = ddm = ddm2 = null;

console.log(goblin.toString());
