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
import { ArrayValidationClass } from './lib/ArrayValidationClass';
import { StringValidationClass } from './lib/StringValidationClass';
import { NumberValidationClass } from './lib/NumberValidationClass';
import { ObjectValidationClass } from './lib/ObjectValidationClass';
export class ValidationCollection {
    constructor(unknownData = undefined) {
        ValidationCollection.stringValidationClass.data = unknownData;
        ValidationCollection.numberValidationClass.data = unknownData;
        ValidationCollection.objectValidationClass.data = unknownData;
        ValidationCollection.arrayValidationClass.data = unknownData;
        ValidationCollection.setName(ValidationCollection.validatorName);
        ValidationCollection.setThrowsErrors(ValidationCollection.throwErrors);
    }
    static createInstance(unknownData = undefined) {
        return new ValidationCollection(unknownData);
    }
    static setThrowsErrors(shouldThrow) {
        ValidationCollection.throwErrors = shouldThrow;
        ValidationCollection.stringValidationClass.shouldThrowErrors = shouldThrow;
        ValidationCollection.numberValidationClass.shouldThrowErrors = shouldThrow;
        ValidationCollection.objectValidationClass.shouldThrowErrors = shouldThrow;
        ValidationCollection.arrayValidationClass.shouldThrowErrors = shouldThrow;
    }
    static setName(name) {
        ValidationCollection.validatorName = name;
        ValidationCollection.stringValidationClass.validatorName = name;
        ValidationCollection.numberValidationClass.validatorName = name;
        ValidationCollection.objectValidationClass.validatorName = name;
        ValidationCollection.arrayValidationClass.validatorName = name;
    }
    static confirm() {
        const problemsEncountered = ValidationCollection.arrayValidationClass.hasProblems
            || ValidationCollection.objectValidationClass.hasProblems
            || ValidationCollection.stringValidationClass.hasProblems
            || ValidationCollection.numberValidationClass.hasProblems;
        if (problemsEncountered) {
            if (ValidationCollection.throwsErrors) {
                throw new Error(ValidationCollection.reportAsString());
            }
            return false;
        }
        else {
            return true;
        }
    }
    isString() {
        const self = ValidationCollection;
        self.stringValidationClass.type();
        const callableObject = Object.assign(function () {
            console.log('self.stringValidationClass', self.stringValidationClass);
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
        }, {
            confirm() {
                return !self.stringValidationClass.hasProblems;
            }
        });
        return callableObject;
    }
    isNumber() {
        const self = ValidationCollection;
        self.numberValidationClass.type();
        const callableObject = Object.assign(function () {
            console.log('self.numberValidationClass', self.numberValidationClass);
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
        }, {
            confirm() {
                return !self.numberValidationClass.hasProblems;
            }
        });
        return callableObject;
    }
    isObject() {
        const self = ValidationCollection;
        self.objectValidationClass.type();
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
        }, {
            confirm() {
                return !self.objectValidationClass.hasProblems;
            }
        });
        return callableObject;
    }
    isArray() {
        const self = ValidationCollection;
        self.arrayValidationClass.type();
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
        }, {
            confirm() {
                return !self.arrayValidationClass.hasProblems;
            }
        });
        return callableObject;
    }
    static report() {
        const arrayProblems = this.arrayValidationClass.report;
        const objectProblems = this.objectValidationClass.report;
        const stringProblems = this.stringValidationClass.report;
        const numberProblems = this.numberValidationClass.report;
        const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems);
        return problems;
    }
    static reportAsString() {
        const arrayProblems = this.arrayValidationClass.reportAsString;
        const objectProblems = this.objectValidationClass.reportAsString;
        const stringProblems = this.stringValidationClass.reportAsString;
        const numberProblems = this.numberValidationClass.reportAsString;
        const problems = arrayProblems + objectProblems + stringProblems + numberProblems;
        return problems;
    }
    static clearProblems() {
        this.arrayValidationClass.clearProblems();
        this.objectValidationClass.clearProblems();
        this.stringValidationClass.clearProblems();
        this.numberValidationClass.clearProblems();
    }
    hasProblems() {
        const problems = ValidationCollection.arrayValidationClass.hasProblems
            || ValidationCollection.objectValidationClass.hasProblems
            || ValidationCollection.stringValidationClass.hasProblems
            || ValidationCollection.numberValidationClass.hasProblems;
        return problems;
    }
    static get throwsErrors() {
        return ValidationCollection.throwErrors;
    }
}
ValidationCollection.throwErrors = false;
ValidationCollection.validatorName = '';
ValidationCollection.stringValidationClass = new StringValidationClass();
ValidationCollection.numberValidationClass = new NumberValidationClass();
ValidationCollection.objectValidationClass = new ObjectValidationClass();
ValidationCollection.arrayValidationClass = new ArrayValidationClass();
//# sourceMappingURL=ValidationCollection.js.map