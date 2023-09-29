import { ValidationCollection } from "./ValidationCollection.js";

const validator = new ValidationCollection({ minimumLength: 2, maximumLength: 10 , exactLength: 5 });

const testString = 'test';

const result = validator.isString.type(testString);

console.log (result); // true

const result2 = validator.isString.type(123);

console.log (result2); // false

const result3 = validator.isString.withMinimumLength(testString); // true
const result4 = validator.isString.withMinimumLength('a'); // false

console.log ('long enough string ()=> ', result3);
console.log ('too short string ()=> ', result4);

const obj = { a: 1, b: 2, c: 3 };
const result5 = validator.isObject(obj); // true
const result6 = validator.isObject.withMinimumLength(obj); // true
const result7 = validator.isObject(obj)
validator.isObject

console.log ('is object ()=> ', result5);
console.log ('is object with minimum length ()=> ', result6);
console.log ('is object as function call ' + result7)