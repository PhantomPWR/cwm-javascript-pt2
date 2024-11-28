// Object Literals
const circle = {
	// Object literal syntax
	radius: 1, // Key: value pair
	location: {
		// Nested object
		x: 1,
		y: 1,
	},
	draw: function () {
		// Method
		console.log('draw');
	},
};

circle.draw(); // Method

// If a function is part of an object, it's called a method
// If an object has one or more methods, it has behavior
// Objects can have properties and methods

// Factory Function
function createCircle(radius) {
	return {
		radius,
		draw: function () {
			console.log('draw from factory function');
		},
	};
}

const circle2 = createCircle(1);
circle2.draw();

// Constructor Function
function Circle(radius) {
	this.radius = radius; // 'this' is a reference to the object that is executing this piece of code
	this.draw = function () {
		// This method is added to every object
		// created with this constructor function
		console.log('draw from constructor function');
	};
}
// 'new' operator creates an empty object, sets 'this' to point to that object, and returns the object from the function
// If new is omitted, 'this' will point to the global object (window in the browser, global in Node.js)
// Don't need to return the object from the constructor function

const Circle3 = new Circle(1);
Circle3.draw();

// Constructor Property
// Every object has a constructor property that
// references the function that was used to create that object

// Functions are objects
console.log(Circle.name); // Name of the function
console.log(Circle.length); // Number of arguments
console.log(Circle.constructor); // Function that created the Circle function

Circle.call({}, 1); // Same as const Circle3 = new Circle(1); under the hood
Circle.apply({}, [1, 2, 3]); // Same as const Circle3 = new Circle(1); under the hood

// Value vs Reference Types
// Value (primitive) Types: Number, String, Boolean, Symbol, undefined, null
// Reference Types: Object, Function, Array

let x = 10;
let y = x;
x = 20;
console.log(x); // 20
console.log(y); // 10

let x2 = { value: 10 };
let y2 = x2;
x2.value = 20;
console.log(x2.value); // 20
console.log(y2.value); // 20

// Primitives are copied by their value
// Objects are copied by their reference

let number = 10; // Primitive - out of function scope
function increase(number) {
	number++; // number is independent of the number variable outside the function
}
increase(number);
console.log(number); // 10

let obj = { value: 10 }; // Reference - out of function scope
function increase(obj) {
	obj.value++; // obj is a reference to the object outside the function
}
increase(obj);
console.log(obj.value); // 11

// Adding or removing properties from an object
// doesn't change the object's reference in memory

function Circle4(radius) {
	this.radius = radius;
	this.draw = function () {
		console.log('draw from constructor function');
	};
}

const circle4 = new Circle4(10);
circle4.location = { x: 1 }; // Add a new property - dot notation
circle4['location'] = { x: 1 }; // Add a new property - bracket notation

const propertyName = 'location-name';
circle4[propertyName] = { x: 1 }; // Add a new property - dynamic bracket notation
// Bracket notation is useful when property names are dynamic
// Bracket notation is useful when property names have special characters

delete circle4.location; // Delete a property

// Enumerating Properties of an Object
function Circle5(radius) {
	this.radius = radius;
	this.draw = function () {
		console.log('draw from constructor function');
	};
}
const circle5 = new Circle5(10);
for (let key in circle5) {
	if (typeof circle5[key] !== 'function') {
		console.log(key, circle5[key]);
	}
}
// for...in loop iterates over all properties of an object
const keys = Object.keys(circle5);
console.log(keys);
// Object.keys returns an array of keys of an object
if ('radius' in circle5) {
	console.log('Circle has a radius property');
}
// in operator checks if a property exists in an object

// Abstraction
// Hiding the details and showing the essentials
// Reduce complexity and allow us to work with higher level of abstraction
// Reduce impact of changes
function Circle6(radius) {
	this.radius = radius;
	this.defaultLocation = { x: 0, y: 0 };
	this.computeOptimumLocation = function (factor) {
		// ...
	};
	this.draw = function () {
		this.computeOptimumLocation(0.1);
		console.log('draw from constructor function');
	};
}
const circle6 = new Circle6(10);
circle6.draw();

// Private Properties and Methods
function Circle7(radius) {
	this.radius = radius;
	let defaultLocation = { x: 0, y: 0 }; // Private property
	let computeOptimumLocation = function (factor) {
		// Private method
		// ...
	};
	this.draw = function () {
		// Scope is temporary
		// Closure: A function has access to variables defined in its outer function
		let x, y; // Local variables
		computeOptimumLocation(0.1); // Access private method, but not recommended
		console.log('draw from constructor function');
	};
}
const circle7 = new Circle7(10);
circle7.draw();

// Scope & Closure
function outerFunction(outerVariable) {
	return function innerFunction(innerVariable) {
		console.log('Outer Variable:', outerVariable);
		console.log('Inner Variable:', innerVariable);
	};
}
const newFunction = outerFunction('outside');
newFunction('inside');

// Getters and Setters
function Circle8(radius) {
	this.radius = radius;
	let defaultLocation = { x: 0, y: 0 };
	this.getDefaultLocation = function () {
		return defaultLocation;
	};
	this.draw = function () {
		console.log('draw from constructor function');
	};
	Object.defineProperty(this, 'defaultLocation', {
		get: function () {
			return defaultLocation;
		},
		set: function (value) {
			if (!value.x || !value.y) {
				throw new Error('Invalid location');
			}
			defaultLocation = value;
		},
	});
}
const circle8 = new Circle8(10);
circle8.defaultLocation = { x: 1, y: 1 };
console.log(circle8.defaultLocation);

// Exercise: Stopwatch
function Stopwatch() {
	let startTime,
		endTime,
		running,
		duration = 0;

	this.start = function () {
		if (running) {
			throw new Error('Stopwatch has already started.');
		}
		running = true;
		startTime = new Date();
	};

	this.stop = function () {
		if (!running) {
			throw new Error('Stopwatch is not started.');
		}
		running = false;
		endTime = new Date();
		const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
		duration += seconds;
	};

	this.reset = function () {
		startTime = null;
		endTime = null;
		running = false;
		duration = 0;
	};

	// Read-only property
	Object.defineProperty(this, 'duration', {
		get: function () {
			return duration;
		},
	});
}
