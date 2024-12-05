function Stopwatch() {
	let startTime,
		endTime,
		running,
		duration = 0;

	Object.defineProperty(this, 'duration', {
		get: function () {
			return duration;
		},
		set: function (value) {
			duration = value;
		},
	});

	Object.defineProperty(this, 'startTime', {
		get: function () {
			return startTime;
		},
		set: function (value) {
			startTime = value;
		},
	});

	Object.defineProperty(this, 'endTime', {
		get: function () {
			return endTime;
		},
		set: function (value) {
			endTime = value;
		},
	});

	Object.defineProperty(this, 'running', {
		get: function () {
			return running;
		},
		set: function (value) {
			running = value;
		},
	});
}

Stopwatch.prototype.start = function () {
	if (this.running) {
		throw new Error('Stopwatch has already started.');
	}
	this.running = true;
	this.startTime = new Date();
};

Stopwatch.prototype.stop = function () {
	if (!this.running) {
		throw new Error('Stopwatch is not started.');
	}
	this.running = false;
	this.endTime = new Date();
	const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
	this.duration += seconds;
};

Stopwatch.prototype.reset = function () {
	this.startTime = null;
	this.endTime = null;
	this.running = false;
	this.duration = 0;
};

const sw = new Stopwatch();
sw.duration = 10;
// We shouldn't be able to set duration manually,
// because it's a read-only property.
// This is an example of premature optimization.

// Prototypical Inheritance
// Every object (except the root object) has a prototype (parent).
// To get the prototype of an object:
// Object.getPrototypeOf(obj)
// In modern browsers, you can use obj.__proto__

function Shape() {}
Shape.prototype.duplicate = function () {
	console.log('duplicate');
};

function Circle(radius) {
	this.radius = radius;
}
// Before
//Circle.prototype = Object.create(Object.prototype);  // objectBase

// After
// Circle.prototype = Object.create(Shape.prototype);

// Reset the constructor - otherwise, it will point to the Shape function
// Circle.prototype.constructor = Circle;

// Lines 92 - 96 refactored into a reusable function
function extend(Child, Parent) {
	// Parameters are capitalized to indicate they are functions
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

Circle.prototype.draw = function () {
	console.log('draw');
};

const shape = new Shape();
const circle = new Circle(1);

// Calling the Super Constructor
function Shape2(color) {
	this.color = color;
}

function Circle2(radius, color) {
	// Shape2(color); // this will not work -
	// color will be assigned to the global(window) object
	Shape2.call(this, color); // reset 'this' to the Circle2 object
	this.radius = radius;
}

extend(Circle2, Shape2); // Extend Circle2 from Shape2

const circle2 = new Circle2(1, 'red');

// Intermediate Function Inheritance
function Square(size) {
	this.size = size;
}

// Before extending Square from Shape:
// Square.prototype = Object.create(Shape.prototype);
// Square.prototype.constructor = Square;

// After extending Square from Shape:
extend(Square, Shape);

const square = new Square(10);

// Method Overriding
// We can override a method that we inherited from a prototype
// by simply redefining it in the object

function extend2(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

function shape3() {
	console.log('shape3');
}

Shape.prototype.duplicate = function () {
	console.log('duplicate');
};

function Circle3() {}

extend2(Circle3, Shape);

// Overriding the duplicate method
// Important to define the method after the extend function
Circle3.prototype.duplicate = function () {
	// Shape.prototype.duplicate(); // Call the duplicate method from the parent
	Shape.prototype.duplicate.call(this); // Set the value of 'this' to
	// the context of the Circle3 object
	console.log('duplicate circle3');
};

const circle3 = new Circle3();

// Polymorphism
// Many forms
// A single interface, many implementations
// We can have different objects with different shapes, but the same interface
// We can call the same method on different objects and get different results

function Square() {
	this.duplicate = function () {
		console.log('duplicate square');
	};
}

extend2(Square, Shape);

Square.prototype.duplicate = function () {
	console.log('duplicate square');
};

const shapes = [new Circle3(), new Square()];

// non-OOP version
// for (let shape of shapes) {
// 	if (shape.type === 'circle') drawCircle();
// 	else if (shape.type === 'square') drawSquare();
// 	else drawTriangle();
// };

// OOP version
for (let shape of shapes) shape.duplicate();

// When to use Inheritance
// Favor composition over inheritance
// Use inheritance only when you have a "is a" relationship
// Use composition when you have a "has a" relationship

// Mixins
function mixin(target, ...sources) {
	Object.assign(target, ...sources);
}

const canEat = {
	eat: function () {
		this.hunger--;
		console.log('eating');
	},
};

const canWalk = {
	walk: function () {
		console.log('walking');
	},
};

const canSwim = {
	swim: function () {
		console.log('swimming');
	},
};

function Person() {}

// Object.assign(Person.prototype, canEat, canWalk); // { eat: f, walk: f }
mixin(Person.prototype, canEat, canWalk); // { eat: f, walk: f }
const person = new Person();
console.log(person);

function Goldfish() {}
// Object.assign(Goldfish.prototype, canEat, canSwim); // { eat: f, swim: f }
mixin(Goldfish.prototype, canEat, canSwim); // { eat: f, swim: f }

const goldfish = new Goldfish();
console.log(goldfish);

// Exercise 1: Prototypical Inheritance

function HtmlElement() {
	this.click = function () {
		console.log('clicked');
	};
}

HtmlElement.prototype.focus = function () {
	console.log('focused');
};

function HtmlSelectElement(items = []) {
	this.items = items;

	this.addItem = function (item) {
		this.items.push(item);
	};

	this.removeItem = function (item) {
		this.items.splice(this.items.indexOf(item), 1);
	};

	this.render = function () {
		return `
<select>${this.items
			.map(
				(item) => `
	<option>${item}</option>`
			)
			.join('')}
</select>`;
	};
}

// Object.create(HtmlElement.prototype); - won't work, because the click method is not copied to the new object
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const element = new HtmlElement();
const selectEelement = new HtmlSelectElement();

// Exercise 2: Polymorphism

function HtmlImageElement(src) {
	this.src = src;

	this.render = function () {
		return `<img src="${this.src}" />`;
	};
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const img = new HtmlImageElement('http://...');
console.log(img.render());

// Exercise 3: Composition vs Inheritance

// Composition
const canEat2 = {
	eat: function () {
		this.hunger--;
		console.log('eating');
	},
};

const canWalk2 = {
	walk: function () {
		console.log('walking');
	},
};

function Person2() {
	return Object.assign({}, canEat2, canWalk2);
}

const person2 = Person2();
console.log(person2);

// Inheritance
function Person3() {}

Object.assign(Person3.prototype, canEat2, canWalk2);

const person3 = new Person3();
console.log(person3);
