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
export default class ValidationCollection {
    constructor(unknownData) {
        this.stringValidationClass = new StringValidationClass();
        this.numberValidationClass = new NumberValidationClass();
        this.objectValidationClass = new ObjectValidationClass();
        this.arrayValidationClass = new ArrayValidationClass();
        this.stringValidationClass.data = unknownData;
        this.numberValidationClass.data = unknownData;
        this.objectValidationClass.data = unknownData;
        this.arrayValidationClass.data = unknownData;
    }
    set throwsErrors(shouldThrow) {
        this.stringValidationClass.shouldThrowErrors = shouldThrow;
        this.numberValidationClass.shouldThrowErrors = shouldThrow;
        this.objectValidationClass.shouldThrowErrors = shouldThrow;
        this.arrayValidationClass.shouldThrowErrors = shouldThrow;
    }
    setName(name) {
        this.stringValidationClass.dataName = name;
        this.numberValidationClass.dataName = name;
        this.objectValidationClass.dataName = name;
        this.arrayValidationClass.dataName = name;
    }
    get isString() {
        const self = this;
        const callableObject = Object.assign(function () {
            self.stringValidationClass.type();
            return callableObject;
        }, {
            withMinimumLength(minimumLength) {
                self.stringValidationClass.withMinimumLength(minimumLength);
                return callableObject;
            }
        }, {
            withMaximumLength(maximumLength) {
                self.stringValidationClass.withMaximumLength(maximumLength);
                return callableObject;
            }
        }, {
            withExactLength(exactLength) {
                self.stringValidationClass.withExactLength(exactLength);
                return callableObject;
            }
        }, {
            thatIncludes(subString) {
                self.stringValidationClass.thatIncludes(subString);
                return callableObject;
            }
        }, {
            thatDoesNotIncludes(subString) {
                self.stringValidationClass.thatDoesNotIncludes(subString);
                return callableObject;
            }
        }, {
            thatIsInCapitalLetters() {
                self.stringValidationClass.thatIsInCapitalLetters();
                return callableObject;
            }
        }, {
            thatIsInSmallLetters() {
                self.stringValidationClass.thatIsInSmallLetters();
                return callableObject;
            }
        }, {
            firstLetterIsCapital() {
                self.stringValidationClass.firstLetterIsCapital();
                return callableObject;
            }
        }, {
            thatEndsWith(subString) {
                self.stringValidationClass.thatEndsWith(subString);
                return callableObject;
            }
        }, {
            thatStartsWith(subString) {
                self.stringValidationClass.thatStartsWith(subString);
                return callableObject;
            }
        }, {
            thatIsAnEmail() {
                self.stringValidationClass.thatIsAnEmail();
                return callableObject;
            }
        }, {
            thatIsAUrl() {
                self.stringValidationClass.thatIsAUrl();
                return callableObject;
            }
        });
        return callableObject;
    }
    get isNumber() {
        const self = this;
        const callableObject = Object.assign(function () {
            self.numberValidationClass.type();
            return callableObject;
        }, {
            thatIsPositive() {
                self.numberValidationClass.thatIsPositive();
                return callableObject;
            }
        }, {
            thatIsNegative() {
                self.numberValidationClass.thatIsNegative();
                return callableObject;
            }
        }, {
            thatIsBetweenMinMax(min, max) {
                self.numberValidationClass.thatIsBetweenMinMax(min, max);
                return callableObject;
            }
        }, {
            thatIsOverMinimum(minimumValue) {
                self.numberValidationClass.thatIsOverMinimum(minimumValue);
                return callableObject;
            }
        }, {
            thatIsUnderMaximum(maximumValue) {
                self.numberValidationClass.thatIsUnderMaximum(maximumValue);
                return callableObject;
            }
        }, {
            thatIsExactly(exactValue) {
                self.numberValidationClass.thatIsExactly(exactValue);
                return callableObject;
            }
        }, {
            thatIsEven() {
                self.numberValidationClass.thatIsEven();
                return callableObject;
            }
        }, {
            thatIsOdd() {
                self.numberValidationClass.thatIsOdd();
                return callableObject;
            }
        }, {
            thatIsNotZero() {
                self.numberValidationClass.thatIsNotZero();
                return callableObject;
            }
        }, {
            thatIsNotOne() {
                self.numberValidationClass.thatIsNotOne();
                return callableObject;
            }
        }, {
            thatIsNotNegativeOne() {
                self.numberValidationClass.thatIsNotNegativeOne();
                return callableObject;
            }
        }, {
            thatIsEvenlyDivisible() {
                self.numberValidationClass.thatIsEvenlyDivisible();
                return callableObject;
            }
        }, {
            thatIsEvenlyDivisibleBy(number) {
                self.numberValidationClass.thatIsEvenlyDivisibleBy(number);
                return callableObject;
            }
        }, {
            thatIsAPrimeNumber() {
                self.numberValidationClass.thatIsAPrimeNumber();
                return callableObject;
            }
        }, {
            thatIsNotAPrimeNumber() {
                self.numberValidationClass.thatIsNotAPrimeNumber();
                return callableObject;
            }
        });
        return callableObject;
    }
    get isObject() {
        const self = this;
        const callableObject = Object.assign(function () {
            self.objectValidationClass.type();
            return callableObject;
        }, {
            withMinimumLength(minimumLength) {
                self.objectValidationClass.withMinimumLength(minimumLength);
                return callableObject;
            }
        }, {
            withMaximumLength(maximumLength) {
                self.objectValidationClass.withMaximumLength(maximumLength);
                return callableObject;
            }
        }, {
            withExactLength(exactLength) {
                self.objectValidationClass.withExactLength(exactLength);
                return callableObject;
            }
        }, {
            thatMayHaveProperties(propertyNames) {
                self.objectValidationClass.thatMayHaveProperties(propertyNames);
                return callableObject;
            }
        }, {
            thatMustHaveProperties(propertyNames) {
                self.objectValidationClass.thatMustHaveProperties(propertyNames);
                return callableObject;
            }
        }, {
            thatMustHaveSanctionedValues(sanctionedValues) {
                self.objectValidationClass.thatMustHaveSanctionedValues(sanctionedValues);
                return callableObject;
            }
        }, {
            thatMustHaveSanctionedValueTypes(sanctionedTypes) {
                self.objectValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes);
                return callableObject;
            }
        }, {
            thatIsInstanceOf(classType) {
                self.objectValidationClass.thatIsInstanceOf(classType);
                return callableObject;
            }
        });
        return callableObject;
    }
    get isArray() {
        const self = this;
        const callableObject = Object.assign(function () {
            self.arrayValidationClass.type();
            return callableObject;
        }, {
            withMinimumLength(minimumLength) {
                self.arrayValidationClass.withMinimumLength(minimumLength);
                return callableObject;
            }
        }, {
            withMaximumLength(maximumLength) {
                self.arrayValidationClass.withMaximumLength(maximumLength);
                return callableObject;
            }
        }, {
            withExactLength(exactLength) {
                self.arrayValidationClass.withExactLength(exactLength);
                return callableObject;
            }
        }, {
            ofStrings() {
                self.arrayValidationClass.ofStrings();
                return callableObject;
            }
        }, {
            ofNumbers() {
                self.arrayValidationClass.ofNumbers();
                return callableObject;
            }
        }, {
            ofObjects() {
                self.arrayValidationClass.ofObjects();
                return callableObject;
            }
        }, {
            ofArrays() {
                self.arrayValidationClass.ofArrays();
                return callableObject;
            }
        }, {
            ofBooleans() {
                self.arrayValidationClass.ofBooleans();
                return callableObject;
            }
        }, {
            ofFunctions() {
                self.arrayValidationClass.ofFunctions();
                return callableObject;
            }
        }, {
            ofSymbols() {
                self.arrayValidationClass.ofSymbols();
                return callableObject;
            }
        }, {
            ofDates() {
                self.arrayValidationClass.ofDates();
                return callableObject;
            }
        }, {
            thatMustHaveSanctionedValues(sanctionedValues) {
                self.arrayValidationClass.thatMustHaveSanctionedValues(sanctionedValues);
                return callableObject;
            }
        }, {
            thatMustHaveSanctionedValueTypes(sanctionedTypes) {
                self.arrayValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes);
                return callableObject;
            }
        });
        return callableObject;
    }
    get report() {
        const arrayProblems = this.arrayValidationClass.report;
        const objectProblems = this.objectValidationClass.report;
        const stringProblems = this.stringValidationClass.report;
        const numberProblems = this.numberValidationClass.report;
        const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems);
        return problems;
    }
    get reportAsString() {
        const arrayProblems = this.arrayValidationClass.reportAsString;
        const objectProblems = this.objectValidationClass.reportAsString;
        const stringProblems = this.stringValidationClass.reportAsString;
        const numberProblems = this.numberValidationClass.reportAsString;
        const problems = arrayProblems + objectProblems + stringProblems + numberProblems;
        return problems;
    }
    clearProblems() {
        this.arrayValidationClass.clearProblems();
        this.objectValidationClass.clearProblems();
        this.stringValidationClass.clearProblems();
        this.numberValidationClass.clearProblems();
    }
    get hasProblems() {
        const problems = this.arrayValidationClass.hasProblems
            || this.objectValidationClass.hasProblems
            || this.stringValidationClass.hasProblems
            || this.numberValidationClass.hasProblems;
        return problems;
    }
    get throwsErrors() {
        return this.arrayValidationClass.shouldThrowErrors
            || this.objectValidationClass.shouldThrowErrors
            || this.stringValidationClass.shouldThrowErrors
            || this.numberValidationClass.shouldThrowErrors;
    }
    confirm() {
        const problemsEncountered = this.arrayValidationClass.hasProblems
            || this.objectValidationClass.hasProblems
            || this.stringValidationClass.hasProblems
            || this.numberValidationClass.hasProblems;
        if (problemsEncountered) {
            if (this.throwsErrors) {
                throw new Error(this.reportAsString);
            }
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=ValidationCollection.js.map