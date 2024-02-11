import { ValidationCollection } from './ValidationCollection';
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
validate.clearReports = function () {
    ValidationCollection.clearProblems();
};
validate.confirm = function () {
    return ValidationCollection.confirm();
};
export default validate;
//# sourceMappingURL=validate.js.map