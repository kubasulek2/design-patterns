class Node {
	constructor (value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;

		this.parent = null;

		if (left)
			left.parent = this;
		if (right)
			right.parent = this;
	}

	* _traverse(current) {
		yield current;
		if (current.left) {
			for (let left of this._traverse(current.left))
				yield left;
		}
		if (current.right) {
			for (let right of this._traverse(current.right))
				yield right;
		}
	}

	* preorder() {
		// return all the node *values* (not the nodes)
		for (let node of this._traverse(this))
			yield node.value;
	}
}

let root = new Node(1, new Node(2), new Node(3));
//    1
//   / \
//  2   5
// /\   /\
//3  4 6  7
// in-order:  213
// preorder:  123
// postorder: 231

// a generator is both an iterator and iterable
for (let x of root.preorder())
	console.log(x);
