# js-vallidation-collection
A javascript class that contains a wide and growing range of methods for validating javascript variables, arrays and objects and provide useful feedback on points of failure in the validation process. Such as missing properties in an object or missing values in an array, unexpected properties in an object, unexpected value types, etc.

Example replace this code:

```` javascript
const objectThatMustContainXYZ = {x: 1, y: 2, z: 3};

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
const objectThatMustContainXYZ = {x: 1, y: 2, z: 3};

const validator = new Validation({validProperties: ['x', 'y', 'z']});
if(!validator.isObjectThatMustHaveProperties(objectThatMustContainXYZ)) {
  // do error handling
  throw new Error('object must contain properties ' + validator.validProperties.join(', ') + ' but is missing ' + validator.missingProperties.join(', '));
}
````

No more lengthy if statements with endless && or ||,  
No more undefined and null-checks,  
just a simple class that does the work for you.
