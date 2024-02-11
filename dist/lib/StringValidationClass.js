import { BaseValidationClass, What } from './BaseValidationClass.js';
export class StringValidationClass extends BaseValidationClass {
    constructor() {
        super();
    }
    // exposed to interface
    type() {
        return this.internalType(this.unknownData);
    }
    // not exposed to interface
    internalType(unknownData) {
        const invalid = this.isNullOrUndefined(unknownData);
        if (invalid) {
            this.handleValidationFailure();
            return false;
        }
        const result = typeof unknownData === 'string';
        if (!result) {
            this.problems.push({
                what: What.unexpectedType,
                in: 'string',
                is: typeof unknownData,
                expected: 'string',
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    // this is a type check that does not report errors, it is used in other methods just to make sure we can check the length without errors
    // if we use the type() method, it will report errors, and we don't want that in this case
    typeNoReport() {
        const isInvalid = this.isNullOrUndefined(this.unknownData);
        if (isInvalid) {
            return false;
        }
        return typeof this.unknownData === 'string';
    }
    withMinimumLength(minimumLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataString = this.unknownData;
        result = dataString.length >= minimumLength;
        if (!result) {
            this.problems.push({
                what: What.tooShort,
                in: typeof this.unknownData,
                is: `length : ${dataString.length}`,
                expected: `to be at least ${minimumLength} characters long`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    withMaximumLength(maximumLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataString = this.unknownData;
        result = dataString.length <= maximumLength;
        if (!result) {
            this.problems.push({
                what: What.tooLong,
                in: typeof this.unknownData,
                is: `length : ${dataString.length}`,
                expected: `to be at most ${maximumLength} characters long`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    withExactLength(exactLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataString = this.unknownData;
        result = dataString.length === exactLength;
        if (!result) {
            this.problems.push({
                what: What.faultyLength,
                in: typeof this.unknownData,
                is: `length : ${dataString.length}`,
                expected: `to be exactly ${exactLength} characters long`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIncludes(subString) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        result = this.unknownData.includes(subString);
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `${subString} to be included`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatDoesNotIncludes(subString) {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = !this.unknownData.includes(subString);
        const unknownString = this.unknownData;
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: unknownString,
                at: unknownString.indexOf(subString),
                expected: `${subString} to not be included`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsInCapitalLetters() {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.toUpperCase() === this.unknownData;
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `to be in capital letters`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsInSmallLetters() {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.toLowerCase() === this.unknownData;
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `to be in small letters`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    firstLetterIsCapital() {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        const unknownString = this.unknownData;
        unknownString.trim();
        const firstLetter = unknownString[0];
        result = (firstLetter.toUpperCase() === firstLetter);
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: firstLetter,
                expected: `to be a capital letter`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatEndsWith(subString) {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.endsWith(subString);
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `to end with ${subString}`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatStartsWith(subString) {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData.startsWith(subString);
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `to start with ${subString}`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsAnEmail() {
        let result = this.typeNoReport();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        const email = this.unknownData; // the power of casting compels you
        result = typeof email === 'string' && email.includes('@') && email.includes('.');
        if (!result) {
            // Handle failure due to missing @ or .
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `an email address, this string does not contain @ or .`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
            this.handleValidationFailure();
            return false;
        }
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        // Check if there are at least 2 characters before @
        if (atIndex < 2) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `an email address, there are less than 2 characters before @`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
            this.handleValidationFailure();
            return false;
        }
        // Check if . comes after @ and not immediately
        if (dotIndex <= atIndex + 1 || dotIndex >= email.length - 2) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `an email address, . comes before @ or is immediately after @`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
            this.handleValidationFailure();
            return false;
        }
        // Preform a final regex check
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        result = emailRegex.test(email);
        if (!result) {
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `an email address, this string does not match the email regex`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
            this.handleValidationFailure();
            return false;
        }
        return true;
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
            this.problems.push({
                what: What.unexpectedValues,
                in: typeof this.unknownData,
                is: this.unknownData,
                expected: `to be a valid URL`,
                ...(this.name && this.name !== '' ? { name: this.name } : {})
            });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
}
//# sourceMappingURL=StringValidationClass.js.map