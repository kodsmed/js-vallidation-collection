# js-validation-collection
A javascript class that contains a wide and growing range of methods for validating javascript variables, arrays and objects and provide useful feedback on points of failure in the validation process. Such as missing properties in an object or missing values in an array, unexpected properties in an object, unexpected value types, etc.

Example replace this code:

```` javascript
const objectThatMustContainXYZ = {x: 1, y: 2, z: 3, a: 9};

if(!objectThatMustContainXYZ.hasOwnProperty('x') || objectThatMustContainXYZ.x === undefined || objectThatMustContainXYZ.x === null) {
  // do error handling
  throw new Error('object does not contain property x');
}

if(!objectThatMustContainXYZ.hasOwnProperty('y') || objectThatMustContainXYZ.y === undefined || objectThatMustContainXYZ.y === null) {
  // do error handling
  throw new Error('object does not contain property y');
}

if(!objectThatMustContainXYZ.hasOwnProperty('z') || objectThatMustContainXYZ.z === undefined || objectThatMustContainXYZ.z === null) {
  // do error handling
  throw new Error('object does not contain property z');
}
````

with this code:

```` javascript
const objectThatMustContainXYZ = {x: 1, y: 2, z: 3, a: 9};

const validator = new Validation({validProperties: ['x', 'y', 'z'], validValues: [9, 1], maximumLength: 3});
if(!validator.isObjectThatMustHaveProperties(objectThatMustContainXYZ)) {
  // do error handling
  const reports = validator.report();
  for (const report in reports) {
    const message = `${report.what} failure in ${report.in}${report.at ? ` at ${report.at}, is ${report.is},` : ''}${report.expected ? ` expected ${report.expected}` : ''}\n`;
  }
  throw new Error(message);
  // Unexpected property failure in object at 3, is a expected x, y, z
  // Unexpected value failure in object at 1, is 2, expected 9, 1
  // Unexpected value failure in object at 2, is 3, expected 9, 1
  // Too Long failure in object at 3, expected 2
}
````

No more lengthy if statements with endless && or ||,  
No more undefined and null-checks,  
just a simple class that does the work for you.

## Installation

I intent to publish this package to npm in the near future.

## Usage

### Importing the class

```` javascript
import Validation from 'validation';
````


## Support

I develop this package in my spare time, and mainly for my own use, so I can't guarantee that I will be able to help you with any issues you might encounter. But I will do my best to help you out. If you have any questions, suggestions or issues, please create an issue on the [github repository](https://github.com/kodsmed/js-vallidation-collection/issues). I will try to respond as soon as possible.

## License

MIT License

## Author

Jimmy "Kodesmed" Karlsson

## Forking and contributing

Feel free to fork this repository and contribute to it. I will review all pull requests and merge them if they are in line with the purpose of this package. If you have any questions, suggestions or issues, please create an issue on the [github repository](https://github.com/kodsmed/js-vallidation-collection/issues). I will try to respond as soon as possible.