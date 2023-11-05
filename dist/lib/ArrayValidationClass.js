import { BaseValidationClass, What } from "./BaseValidationClass.js";
import { StringValidationClass } from "./StringValidationClass.js";
import { NumberValidationClass } from "./NumberValidationClass.js";
import { ObjectValidationClass } from "./ObjectValidationClass.js";
export class ArrayValidationClass extends BaseValidationClass {
    constructor() {
        super();
        this.stringValidator = new StringValidationClass();
        this.numberValidator = new NumberValidationClass();
        this.objectValidator = new ObjectValidationClass();
    }
    type() {
        const isInvalid = this.isNullOrUndefined(this.unknownData);
        if (isInvalid) {
            return false;
        }
        const validArray = Array.isArray(this.unknownData);
        if (!validArray) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'Array', is: typeof this.unknownData, expected: 'Array' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    internalType(unknownData) {
        const isInvalid = this.isNullOrUndefined(unknownData);
        if (isInvalid) {
            return false;
        }
        const validArray = Array.isArray(unknownData);
        if (!validArray) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'Array', is: typeof unknownData, expected: 'Array' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    withMinimumLength(minimumLength) {
        let result = this.type();
        if (!result) {
            return false;
        }
        const data = this.unknownData;
        if (data.length < minimumLength) {
            this.problems.push(Object.assign({ what: What.tooShort, in: 'Array', is: data.length.toString(), expected: minimumLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    withMaximumLength(maximumLength) {
        let result = this.type();
        if (!result) {
            return false;
        }
        const data = this.unknownData;
        if (data.length > maximumLength) {
            this.problems.push(Object.assign({ what: What.tooLong, in: 'Array', is: data.length.toString(), expected: maximumLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    withExactLength(exactLength) {
        let result = this.type();
        if (!result) {
            return false;
        }
        const data = this.unknownData;
        if (data.length !== exactLength) {
            this.problems.push(Object.assign({ what: What.faultyLength, in: 'Array', is: data.length.toString(), expected: exactLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    ofStrings() {
        return this.isExpectedContent(this.unknownData, this.stringValidator, 'string');
    }
    ofNumbers() {
        return this.isExpectedContent(this.unknownData, this.numberValidator, 'number');
    }
    ofObjects() {
        return this.isExpectedContent(this.unknownData, this.objectValidator, 'object');
    }
    ofArrays() {
        return this.isExpectedContent(this.unknownData, this, 'Array');
    }
    ofBooleans() {
        return this.isExpectedContentType(this.unknownData, (item) => typeof item === 'boolean', 'boolean');
    }
    ofFunctions() {
        return this.isExpectedContentType(this.unknownData, (item) => typeof item === 'function', 'function');
    }
    ofSymbols() {
        return this.isExpectedContentType(this.unknownData, (item) => typeof item === 'symbol', 'symbol');
    }
    ofDates() {
        return this.isExpectedContentType(this.unknownData, (item) => item instanceof Date, 'Date');
    }
    thatMustHaveSanctionedValues(sanctionedValues = []) {
        const isArray = this.type();
        if (!isArray) {
            return false;
        }
        const dataArray = this.unknownData;
        let result = true;
        for (let index = 0; index < dataArray.length; index++) {
            const data = dataArray[index];
            if (!sanctionedValues.includes(data)) {
                this.problems.push(Object.assign({ what: What.unexpectedValues, in: 'Array', is: data.toString(), expected: sanctionedValues.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatMustHaveSanctionedValueTypes(sanctionedTypes = []) {
        const isArray = this.type();
        if (!isArray) {
            return false;
        }
        const dataArray = this.unknownData;
        let result = true;
        for (let index = 0; index < dataArray.length; index++) {
            const data = dataArray[index];
            if (!sanctionedTypes.includes(typeof data)) {
                this.problems.push(Object.assign({ what: What.unexpectedValueTypes, in: 'Array', is: typeof data, expected: sanctionedTypes.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    isExpectedContent(unknownData, validatorInstance, expected) {
        const isArray = this.type();
        if (!isArray) {
            return false;
        }
        let endResult = true;
        let result;
        const data = unknownData;
        for (let index = 0; index < data.length; index++) {
            result = validatorInstance.internalType(data[index]);
            if (!result) {
                this.recordErroneousDataType(typeof data[index], index, expected);
                endResult = false;
            }
            endResult = endResult && result;
        }
        if (!endResult) {
            this.handleValidationFailure();
        }
        return endResult;
    }
    isExpectedContentType(unknownData, typeCheck, expected) {
        // first check that the unknownData is an array
        if (!this.type()) {
            return false;
        }
        const data = unknownData;
        // use the passed in typeCheck arrow-function, check each item in the array
        for (let index = 0; index < data.length; index++) {
            if (!typeCheck(data[index])) {
                this.recordErroneousDataType(typeof data[index], index, expected);
                this.handleValidationFailure();
                return false;
            }
        }
        return true;
    }
    recordErroneousDataType(isType, index, expectedType) {
        const erroneousData = Object.assign({ what: What.unexpectedValueTypes, in: 'Array', is: isType, at: index, expected: expectedType }, (this.name && this.name !== '' ? { name: this.name } : {}));
        this.problems.push(erroneousData);
    }
}
//# sourceMappingURL=ArrayValidationClass.js.map