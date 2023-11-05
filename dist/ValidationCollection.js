/**
 * ValidationCollection, a collection of Validation objects that can be used to validate the parameters of a function.
 * Contains a collection of methods that can be used to for validation.
 *
 * @module ValidationCollection
 * @version 2.0.0
 * @author Jimmy "Kodsmed" Karlsson
 *
 * @property {string} name - Name of the parameter that is being validated.
 * @property {boolean} shouldThrow - If true, the validation will throw an error if it fails.
 */
import { ArrayValidationClass } from './lib/ArrayValidationClass.js';
import { StringValidationClass } from './lib/StringValidationClass.js';
import { NumberValidationClass } from './lib/NumberValidationClass.js';
import { ObjectValidationClass } from './lib/ObjectValidationClass.js';
export default function ValidationCollection() {
    const stringValidationClass = new StringValidationClass();
    const numberValidationClass = new NumberValidationClass();
    const objectValidationClass = new ObjectValidationClass();
    const arrayValidationClass = new ArrayValidationClass();
    const callableFunction = function (unknownData) {
        if (unknownData === undefined || unknownData === null) {
            return false;
        }
        stringValidationClass.data = unknownData;
        numberValidationClass.data = unknownData;
        objectValidationClass.data = unknownData;
        arrayValidationClass.data = unknownData;
        return true;
    };
    callableFunction.setThrowsErrors = function (shouldThrow) {
        stringValidationClass.shouldThrowErrors = shouldThrow;
        numberValidationClass.shouldThrowErrors = shouldThrow;
        objectValidationClass.shouldThrowErrors = shouldThrow;
        arrayValidationClass.shouldThrowErrors = shouldThrow;
    };
    callableFunction.setName = function (name) {
        stringValidationClass.dataName = name;
        numberValidationClass.dataName = name;
        objectValidationClass.dataName = name;
        arrayValidationClass.dataName = name;
    };
    callableFunction.isString = function () {
        const callableObject = Object.assign(function () {
            return stringValidationClass.type();
        }, {
            withMinimumLength(minimumLength) {
                return stringValidationClass.withMinimumLength(minimumLength);
            }
        }, {
            withMaximumLength(maximumLength) {
                return stringValidationClass.withMaximumLength(maximumLength);
            }
        }, {
            withExactLength(exactLength) {
                return stringValidationClass.withExactLength(exactLength);
            }
        }, {
            thatIncludes(subString) {
                return stringValidationClass.thatIncludes(subString);
            }
        }, {
            thatDoesNotIncludes(subString) {
                return stringValidationClass.thatDoesNotIncludes(subString);
            }
        }, {
            thatIsInCapitalLetters() {
                return stringValidationClass.thatIsInCapitalLetters();
            }
        }, {
            thatIsInSmallLetters() {
                return stringValidationClass.thatIsInSmallLetters();
            }
        }, {
            firstLetterIsCapital() {
                return stringValidationClass.firstLetterIsCapital();
            }
        }, {
            thatEndsWith(subString) {
                return stringValidationClass.thatEndsWith(subString);
            }
        }, {
            thatStartsWith(subString) {
                return stringValidationClass.thatStartsWith(subString);
            }
        }, {
            thatIsAnEmail() {
                return stringValidationClass.thatIsAnEmail();
            }
        }, {
            thatIsAUrl() {
                return stringValidationClass.thatIsAUrl();
            }
        });
        return callableObject;
    };
    callableFunction.isNumber = function () {
        const callableObject = Object.assign(function () {
            const result = numberValidationClass.type();
            return result;
        }, {
            thatIsPositive() {
                const result = numberValidationClass.thatIsPositive();
                return result ? callableObject : false;
            }
        }, {
            thatIsNegative() {
                return numberValidationClass.thatIsNegative();
            }
        }, {
            thatIsBetweenMinMax(min, max) {
                return numberValidationClass.thatIsBetweenMinMax(min, max);
            }
        }, {
            thatIsOverMinimum(minimumValue) {
                return numberValidationClass.thatIsOverMinimum(minimumValue);
            }
        }, {
            thatIsUnderMaximum(maximumValue) {
                return numberValidationClass.thatIsUnderMaximum(maximumValue);
            }
        }, {
            thatIsExactly(exactValue) {
                return numberValidationClass.thatIsExactly(exactValue);
            }
        }, {
            thatIsEven() {
                return numberValidationClass.thatIsEven();
            }
        }, {
            thatIsOdd() {
                return numberValidationClass.thatIsOdd();
            }
        }, {
            thatIsNotZero() {
                return numberValidationClass.thatIsNotZero();
            }
        }, {
            thatIsNotOne() {
                return numberValidationClass.thatIsNotOne();
            }
        }, {
            thatIsNotNegativeOne() {
                return numberValidationClass.thatIsNotNegativeOne();
            }
        }, {
            thatIsEvenlyDivisible() {
                return numberValidationClass.thatIsEvenlyDivisible();
            }
        }, {
            thatIsEvenlyDivisibleBy(number) {
                return numberValidationClass.thatIsEvenlyDivisibleBy(number);
            }
        }, {
            thatIsAPrimeNumber() {
                return numberValidationClass.thatIsAPrimeNumber();
            }
        }, {
            thatIsNotAPrimeNumber() {
                return numberValidationClass.thatIsNotAPrimeNumber();
            }
        });
        return callableObject;
    };
    callableFunction.isObject = function () {
        const callableObject = Object.assign(function () {
            return objectValidationClass.type();
        }, {
            withMinimumLength(minimumLength) {
                return objectValidationClass.withMinimumLength(minimumLength);
            }
        }, {
            withMaximumLength(maximumLength) {
                return objectValidationClass.withMaximumLength(maximumLength);
            }
        }, {
            withExactLength(exactLength) {
                return objectValidationClass.withExactLength(exactLength);
            }
        }, {
            thatMayHaveProperties(propertyNames) {
                return objectValidationClass.thatMayHaveProperties(propertyNames);
            }
        }, {
            thatMustHaveProperties(propertyNames) {
                return objectValidationClass.thatMustHaveProperties(propertyNames);
            }
        }, {
            thatMustHaveSanctionedValues(sanctionedValues) {
                return objectValidationClass.thatMustHaveSanctionedValues(sanctionedValues);
            }
        }, {
            thatMustHaveSanctionedValueTypes(sanctionedTypes) {
                return objectValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes);
            }
        }, {
            thatIsInstanceOf(classType) {
                return objectValidationClass.thatIsInstanceOf(classType);
            }
        });
        return callableObject;
    };
    callableFunction.isArray = function () {
        const callableObject = Object.assign(function () {
            return arrayValidationClass.type();
        }, {
            withMinimumLength(minimumLength) {
                return arrayValidationClass.withMinimumLength(minimumLength);
            }
        }, {
            withMaximumLength(maximumLength) {
                return arrayValidationClass.withMaximumLength(maximumLength);
            }
        }, {
            withExactLength(exactLength) {
                return arrayValidationClass.withExactLength(exactLength);
            }
        }, {
            ofStrings() {
                return arrayValidationClass.ofStrings();
            }
        }, {
            ofNumbers() {
                return arrayValidationClass.ofNumbers();
            }
        }, {
            ofObjects() {
                return arrayValidationClass.ofObjects();
            }
        }, {
            ofArrays() {
                return arrayValidationClass.ofArrays();
            }
        }, {
            ofBooleans() {
                return arrayValidationClass.ofBooleans();
            }
        }, {
            ofFunctions() {
                return arrayValidationClass.ofFunctions();
            }
        }, {
            ofSymbols() {
                return arrayValidationClass.ofSymbols();
            }
        }, {
            ofDates() {
                return arrayValidationClass.ofDates();
            }
        }, {
            thatMustHaveSanctionedValues(sanctionedValues) {
                return arrayValidationClass.thatMustHaveSanctionedValues(sanctionedValues);
            }
        }, {
            thatMustHaveSanctionedValueTypes(sanctionedTypes) {
                return arrayValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes);
            }
        });
        return callableObject;
    };
    callableFunction.report = function () {
        const arrayProblems = arrayValidationClass.report;
        const objectProblems = objectValidationClass.report;
        const stringProblems = stringValidationClass.report;
        const numberProblems = numberValidationClass.report;
        const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems);
        return problems;
    };
    callableFunction.reportAsString = function () {
        const arrayProblems = arrayValidationClass.reportAsString;
        const objectProblems = objectValidationClass.reportAsString;
        const stringProblems = stringValidationClass.reportAsString;
        const numberProblems = numberValidationClass.reportAsString;
        const problems = arrayProblems + objectProblems + stringProblems + numberProblems;
        return problems;
    };
    callableFunction.clearProblems = function () {
        arrayValidationClass.clearProblems();
        objectValidationClass.clearProblems();
        stringValidationClass.clearProblems();
        numberValidationClass.clearProblems();
    };
    callableFunction.hasProblems = function () {
        const problems = arrayValidationClass.hasProblems
            || objectValidationClass.hasProblems
            || stringValidationClass.hasProblems
            || numberValidationClass.hasProblems;
        return problems;
    };
    callableFunction.throwsErrors = function () {
        return arrayValidationClass.shouldThrowErrors
            || objectValidationClass.shouldThrowErrors
            || stringValidationClass.shouldThrowErrors
            || numberValidationClass.shouldThrowErrors;
    };
    callableFunction._handleValidationFailure = function () {
        if (callableFunction.throwsErrors()) {
            throw new Error(callableFunction.reportAsString());
        }
    };
    return callableFunction;
}
//# sourceMappingURL=ValidationCollection.js.map