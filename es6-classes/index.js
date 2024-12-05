// 'use strict';
// function Circle(radius) {
// 	this.radius = radius;

// 	this.draw = function () {
// 		console.log('draw');
// 	};
// }

// ES6 Version - Syntactic Sugar over constructor functions
class Circle {
	constructor(radius) {
		this.radius = radius;
		this.move = function () {
			console.log('move');
		};
	}

	draw() {
		console.log('draw');
	}
}

const circle = new Circle(1);

// Hoisting
// Function declarations are hoisted, but function expressions are not.
// Function declaration
function sayHello() {}

// Function expression
const sayGoodbye = function () {};

// Class declaration - not hoisted
class Circle2 {
	constructor(radius) {
		this.radius = radius;
	}
	// Class expression - rarely used
	// const Square = class {};

	// Instance Method
	draw() {}

	// Static Methods - Utility functions that are not tied to a specific object
	// Methods that are not available on an instance, but on the class itself

	static parse(str) {
		const radius = JSON.parse(str).radius;
		return new Circle2(radius);
	}
}

const circle2 = Circle2.parse('{"radius": 1}');
console.log(circle2);

// The 'this' keyword
const Circle3 = function () {
	this.draw2 = function () {
		console.log(this);
	};
};

const circle3 = new Circle3();
circle3.draw2(); // Circle3 object

const draw2 = circle3.draw2;

// Function call
draw2(); // Window object - strict mode: undefined

class Circle4 {
	draw() {
		console.log(this);
	}
}

const circle4 = new Circle4();
const draw = circle4.draw;
draw(); // undefined - strict mode applies automatically to prevent modifying the global object

// Private Properties & Methods
// Used for abstraction

// ES6 Primitive Type: Symbol
const _radius = Symbol(); // underscore is a convention to indicate a private property
const _draw = Symbol();
class Circle5 {
	constructor(radius) {
		// this.radius = radius;  // dot notation
		// this['radius'] = radius; // bracket notation
		this[_radius] = radius;
	}
	// Computed property names
	[_draw]() {}
}

const circle5 = new Circle5(1);
circle5.radius; // 1

// Private members using WeakMaps
// WeakMaps are a new feature in ES6
// WeakMaps are a collection of key/value pairs where the keys are objects and the values can be anything
// WeakMaps are not enumerable
// Weakmaps are garbage collected
const _radius2 = new WeakMap();
const _move = new WeakMap();
class Circle6 {
	constructor(radius) {
		_radius2.set(this, radius);
		_move.set(this, () => {
			// Arrow function to bind 'this' to the Circle6 object
			// function() would bind 'this' to the global object
			console.log('move', this);
		});
	}

	draw() {
		_move.get(this)();
		console.log('draw');
	}
}

const circle6 = new Circle6(1);

// Getters and Setters
const _radius3 = new WeakMap();
class Circle7 {
	constructor(radius) {
		_radius3.set(this, radius);
	}

	get radius() {
		return _radius3.get(this);
	}

	set radius(value) {
		if (value <= 0) throw new Error('Invalid radius');
		_radius3.set(this, value);
	}
}

const circle7 = new Circle7(1);

// Inheritance
// Reuse methods and properties of another class

// ES6 Inheritance

class Shape {
	constructor(color) {
		this.color = color;
	}

	move() {
		console.log('move');
	}
}

class Circle8 extends Shape {
	constructor(color, radius) {
		super(color); // Must use super() to call the base constructor
		this.radius = radius;
	}
	draw() {
		console.log('draw');
	}
}

const circle8 = new Circle8();

const circleWithArguments = new Circle8('red', 1);

// Method Overriding
class Shape2 {
	move() {
		console.log('move');
	}
}

class Circle9 extends Shape2 {
	move() {
		super.move(); // Call the base method
		console.log('circle move');
	}
}

const circle9 = new Circle9();

// Exercise: Stack
// Implement a stack class with the following methods:
// push(value) - Add a value to the top of the stack
// pop() - Remove the value at the top of the stack and return it
// peek() - Return the value at the top of the stack without removing it

const _items = new WeakMap();

class Stack {
	constructor() {
		_items.set(this, []);
	}

	push(obj) {
		_items.get(this).push(obj);
	}

	pop() {
		const items = _items.get(this);
		if (items.length === 0) throw new Error('Stack is empty');

		return items.pop();
	}

	peek() {
		const items = _items.get(this);
		if (items.length === 0) throw new Error('Stack is empty');
		return items[items.length - 1];
	}

	get count() {
		return _items.get(this).length;
	}
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

setTimeout(() => {
	console.log(stack);
}, 1000);
setTimeout(() => {
	console.log(stack.pop());
	console.log(stack);
}, 1000);
setTimeout(() => {
	console.log(stack.pop());
	console.log(stack);
}, 1000);
setTimeout(() => {
	console.log(stack.pop());
	console.log(stack);
}, 1000);
setTimeout(() => {
	console.log(stack.pop());
	console.log(stack);
}, 1000);
