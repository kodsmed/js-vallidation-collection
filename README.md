# validation-collection

A javascript class that contains a wide and growing range of methods for validating javascript variables, arrays and objects and provide useful feedback on points of failure in the validation process. Such as missing properties in an object or missing values in an array, unexpected properties in an object, unexpected value types, etc.

No more lengthy if statements with endless && or ||,  
No more undefined and null-checks,  
just a simple class that does the work for you.

## Installation

```` bash
npm install validation-collection
````

## Usage

With the proper combination of method and arguments, you can validate almost anything.  
The class will return true if the validation is successful, and false if it is not.  
You can also set the shouldThrow property to true in the constructor, and the class will throw an error if the validation fails.

### Example, general usage

```` javascript

```` javascript
import validationCollection from 'validation-collection';
const validator = new validationCollection({}); // note that the constructor takes an object as an argument
let result = validator.isString('hello world');
console.log(result); // true
let result = validator.isString(123);
console.log(result); // false
const validator = new validationCollection({ minimumLength: 3 }); // note that the constructor takes an object as an argument
let result = validator.isString('hello world');
console.log(result); // true
let result = validator.isString('hi');
console.log(result); // false
````

### Example, validating a point Object. (x, y, z)

```` javascript
import validationCollection from 'validation-collection';
const validator = new validationCollection({validProperties: ['x', 'y', 'z'], validValueTypes: ['number']}, name: 'Point validator');
let point = {x: 1, y: 2, z: 3};
let resultProperties = validator.isObject.thatMustHaveProperties(point);
console.log(resultProperties); // true
let resultValues = validator.isObject.thatMustHaveSanctionedValueTypes(point);
console.log(resultValues); // true

let point = {x: 1, y: '2', b: 3};
let resultProperties = validator.isObject.thatMustHaveProperties(point);
console.log(resultProperties); // true
let resultValues = validator.isObject.thatMustHaveSanctionedValueTypes(point);
console.log(resultValues); // false
console.log(validator.reportAsString)
// Point validator: missing property failure in object, expected z to be included
// Point validator: unexpected property failure in object, is b, expected x, y, z
// Point validator: unexpected value type failure in object, is string, expected number
````

### Example, validate an array that may contain only numbers and boolean values

```` javascript
import validationCollection from 'validation-collection';
const validator = new validationCollection({validValueTypes: ['number', 'boolean']});
const mySpecialArray = [1,3,5,6,7,true,false,-144]
let result = validator.isArray.thatMustHaveSanctionedValueTypes(mySpecialArray)
console.log(result) // true
mySpecialArray.push('string')
result = validator.isArray.thatMustHaveSanctionedValueTypes(mySpecialArray)
console.log(result) // false
console.log(validator.reportAsString) // unexpected value type failure in array, is string, expected number, boolean
````

### Constructor

The constructor takes an object as an argument.  
ArgumentObject = {  
  &nbsp;&nbsp;minimumLength?: number; // minimum length of whatever is being validated  
  &nbsp;&nbsp;maximumLength?: number; // maximum length of whatever is being validated  
  &nbsp;&nbsp;exactLength?: number; // exact length of whatever is being validated  
  &nbsp;&nbsp;minimumNumberValue?: number; // minimum value of whatever is being validated  
  &nbsp;&nbsp;maximumNumberValue?: number; // maximum value of whatever is being validated  
  &nbsp;&nbsp;exactNumberValue?: number; // required exact value of whatever is being validated  
  &nbsp;&nbsp;validProperties?: string[]; // valid properties of Objects being validated  
  &nbsp;&nbsp;validValues?: any[]; // valid values of Arrays being validated  
  &nbsp;&nbsp;validValueTypes?: string[]; // valid value types of whatever is being validated  
  &nbsp;&nbsp;name?: string; // used for error messages  
  &nbsp;&nbsp;shouldThrow?: boolean; // if true, the class will throw an error if the validation fails  
};  
none of the properties are required, but if you don't provide them, the corresponding methods will not work as expected.

### Methods

Its a long list of methods... but don't worry, they are all very simple to use, and covered by intellisense...

| Method | Argument | Description |
| --- | --- | --- |
| isString() | value | Checks if the value is a string. |
| isString.withMinimumLength() | value | Checks if the value is a string and if it is at least the minimum length. |
| isString.withMaximumLength() | value | Checks if the value is a string and if it is at most the maximum length. |
| isString.withExactLength() | value | Checks if the value is a string and if it is exactly the exact length. |
| isString.thatIncludes() | value, subString | Checks if the value is a string and if it includes the subString. |
| isString.thatStartsWith() | value, subString | Checks if the value is a string and if it starts with the subString. |
| isString.thatEndsWith() | value, subString | Checks if the value is a string and if it ends with the subString. |
| isString.thatDoesNotInclude() | value, subString | Checks if the value is a string and if it does not include the subString. |
| isString.thatIsInCapitalLetters() | value | Checks if the value is a string and if it is all in capital letters. |
| isString.thatIsInSmallLetters() | value | Checks if the value is a string and if it is all in lower case. |
| isString.thatIsAnEmail() | value | Checks if the value is a string and if it is looks an email address. |
| isString.thatIsAUrl() | value | Checks if the value is a string and if it is looks like a url. |
| --- | --- | --- |
| isNumber() | value | Checks if the value is a number. |
| isNumber.thatIsPositive() | value | Checks if the value is a number and if it is positive. |
| isNumber.thatIsNegative() | value | Checks if the value is a number and if it is negative. |
| isNumber.thatIsBetweenMinMax() | value | Checks if the value is a number and if it is between the minimum and maximum values. |
| isNumber.thatIsOverMinimum() | value | Checks if the value is a number and if it is over the minimum value. |
| isNumber.thatIsUnderMaximum() | value | Checks if the value is a number and if it is under the maximum value. |
| isNumber.thatIsExactly() | value | Checks if the value is a number and if it is exactly the exact value. |
| isNumber.thatIsEven() | value | Checks if the value is a number and if it is even. |
| isNumber.thatIsOdd() | value | Checks if the value is a number and if it is odd. |
| isNumber.thatIsNotZero() | value | Checks if the value is a number and if it is not zero. |
| isNumber.thatIsNotOne() | value | Checks if the value is a number and if it is not one. |
| isNumber.thatIsNotNegativeOne() | value | Checks if the value is a number and if it is not negative one. |
| isNumber.thatIsEvenlyDivisible() | value | Checks if the value is a number and if it is evenly divisible by anything. |
| isNumber.thatIsEvenlyDivisibleBy() | { value: unknown, divisor: number } | Checks if the value is a number and if it is evenly divisible by the divisor. |
| isNumber.thatIsAPrimeNumber() | value | Checks if the value is a number and if it is a prime number. |
| isNumber.thatIsNotAPrimeNumber() | value | Checks if the value is a number and if it is not a prime number. |
| --- | --- | --- |
| isObject() | value | Checks if the value is an object. |
| isObject.withMinimumLength() | value | Checks if the value is an object and if it has at least the minimum length amount of properties. |
| isObject.withMaximumLength() | value | Checks if the value is an object and if it has at most the maximum length amount of properties. |
| isObject.withExactLength() | value | Checks if the value is an object and if it has exactly the exact length amount of properties. |
| isObject.thatMayHaveProperties() | value | Checks if the value is an object and that all the properties it have are allowed. |
| isObject.thatMustHaveProperties() | value | Checks if the value is an object and have all the properties required. |
| isObject.thatMustHaveSanctionedValues() | value | Checks if the value is an object and that all the properties have sanctioned values. |
| isObject.thatMustHaveSanctionedValueTypes() | value | Checks if the value is an object and that all the properties have sanctioned value types. |
| isObject.thatIsInstanceOf() |  value: unknown, instance: unknown  | Checks if the value is an object and that it is an instance of the instance. |
| --- | --- | --- |
| isArray() | value | Checks if the value is an array. |
| isArray.withMinimumLength() | value | Checks if the value is an array and if it has at least the minimum length amount of values. |
| isArray.withMaximumLength() | value | Checks if the value is an array and if it has at most the maximum length amount of values. |
| isArray.withExactLength() | value | Checks if the value is an array and if it has exactly the exact length amount of values. |
| isArray.ofStrings() | value | Checks if the value is an array and if all the values are strings. |
| isArray.ofNumbers() | value | Checks if the value is an array and if all the values are numbers. |
| isArray.ofObjects() | value | Checks if the value is an array and if all the values are objects. |
| isArray.ofArrays() | value | Checks if the value is an array and if all the values are arrays. |
| isArray.ofBooleans() | value | Checks if the value is an array and if all the values are booleans. |
| isArray.ofFunctions() | value | Checks if the value is an array and if all the values are functions. |
| isArray.ofSymbols() | value | Checks if the value is an array and if all the values are symbols. |
| isArray.ofDates() | value | Checks if the value is an array and if all the values are dates. |
| isArray.thatMustHaveSanctionedValues() | value | Checks if the value is an array and that all the values have sanctioned values. |
| isArray.thatMustHaveSanctionedValueTypes() | value | Checks if the value is an array and that all the values have sanctioned value types. |

## State of the project

Project is stable and ready for use.  
(but don't trust your bank to my 30hours of coding.)

I will continue to add more methods to the class as I find the need for them, or they are requested.  
This will likely be the only validation ts/js class that I will need for the foreseeable future,  
so as long as I have the time, I will continue to develop it.

## Support

The package comes packed with 6 automated test-suits with a whooping 4203 tests... However,  
I develop this package in my spare time, so it is fully possible that I have missed something.  
Also, I can't guarantee that I will be able to help you with any issues you might encounter.  
However, I will welcome your feedback, I will do my best to help you out if you have any questions, suggestions or issues.  
Please create an issue on the [github repository](https://github.com/kodsmed/js-vallidation-collection/issues).  
I will try to respond as soon as possible.

## License

Copyright 2023 Jimmy Karlsson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
