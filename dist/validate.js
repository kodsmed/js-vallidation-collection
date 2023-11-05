import { ValidationCollection } from './ValidationCollection.js';
const validate = (unknownData) => {
    return ValidationCollection.createInstance(unknownData);
};
validate.setName = function (name) {
    ValidationCollection.setName(name);
};
validate.setThrowable = function (shouldThrow) {
    ValidationCollection.setThrowsErrors(shouldThrow);
};
validate.report = function () {
    return ValidationCollection.report();
};
validate.reportAsString = function () {
    return ValidationCollection.reportAsString();
};
export default validate;
//# sourceMappingURL=validate.js.map