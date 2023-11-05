import { BaseValidationClass, What } from './BaseValidationClass.js';
export class StringValidationClass extends BaseValidationClass {
    constructor() {
        super();
    }
    type() {
        const invalid = this.isNullOrUndefined(this.unknownData);
        if (invalid) {
            this.handleValidationFailure();
            return false;
        }
        const result = typeof this.unknownData === 'string';
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'string', is: typeof this.unknownData, expected: 'string' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    internalType(unknownData) {
        const invalid = this.isNullOrUndefined(unknownData);
        if (invalid) {
            this.handleValidationFailure();
            return false;
        }
        const result = typeof unknownData === 'string';
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'string', is: typeof unknownData, expected: 'string' }, (this.name && this.name !== '' ? { name: this.name } : {})));
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
        const dataString = this.unknownData;
        result = dataString.length >= minimumLength;
        if (!result) {
            this.problems.push(Object.assign({ what: What.tooShort, in: typeof this.unknownData, is: `length : ${dataString.length}`, expected: `to be at least ${minimumLength} characters long` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    withMaximumLength(maximumLength) {
        let result = this.type();
        if (!result) {
            return false;
        }
        const dataString = this.unknownData;
        result = dataString.length <= maximumLength;
        if (!result) {
            this.problems.push(Object.assign({ what: What.tooLong, in: typeof this.unknownData, is: `length : ${dataString.length}`, expected: `to be at most ${maximumLength} characters long` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    withExactLength(exactLength) {
        let result = this.type();
        if (!result) {
            return false;
        }
        const dataString = this.unknownData;
        result = dataString.length === exactLength;
        if (!result) {
            this.problems.push(Object.assign({ what: What.faultyLength, in: typeof this.unknownData, is: `length : ${dataString.length}`, expected: `to be exactly ${exactLength} characters long` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIncludes(subString) {
        let result = this.type();
        if (!result) {
            return false;
        }
        result = this.unknownData.includes(subString);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `${subString} to be included` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatDoesNotIncludes(subString) {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = !this.unknownData.includes(subString);
        const unknownString = this.unknownData;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: unknownString, at: unknownString.indexOf(subString), expected: `${subString} to not be included` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsInCapitalLetters() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.toUpperCase() === this.unknownData;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to be in capital letters` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsInSmallLetters() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.toLowerCase() === this.unknownData;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to be in small letters` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    firstLetterIsCapital() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        const unknownString = this.unknownData;
        unknownString.trim();
        const firstLetter = unknownString[0];
        result = (firstLetter.toUpperCase() === firstLetter);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: firstLetter, expected: `to be a capital letter` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatEndsWith(subString) {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.endsWith(subString);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to end with ${subString}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatStartsWith(subString) {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.startsWith(subString);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to start with ${subString}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsAnEmail() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.includes('@');
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to include @` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        result && (result = this.unknownData.includes('.'));
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to include .` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (this.unknownData.lastIndexOf('.') > this.unknownData.length - 3) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to have at least 2 characters after the .` }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
        }
        if (this.unknownData && this.unknownData.includes('@') && this.unknownData.includes('.')) {
            const email = this.unknownData;
            const atIndex = email.indexOf('@');
            const dotIndex = email.lastIndexOf('.');
            if (atIndex > dotIndex) {
                this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to have a . after the @` }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsAUrl() {
        if (!this.type()) {
            this.handleValidationFailure();
            return false;
        }
        const url = this.unknownData;
        let result = false;
        try {
            new URL(url);
            result = true;
        }
        catch (error) {
            result = false;
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: this.unknownData, expected: `to be a valid URL` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
}
//# sourceMappingURL=StringValidationClass.js.map