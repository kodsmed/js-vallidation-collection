import { BaseValidationClass, What } from './BaseValidationClass.js';
export class NumberValidationClass extends BaseValidationClass {
    constructor() {
        super();
    }
    type() {
        const invalidType = this.isNullOrUndefined(this.unknownData);
        if (invalidType) {
            this.handleValidationFailure();
            return false;
        }
        const isNumber = typeof this.unknownData === 'number';
        if (!isNumber) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'number', is: typeof this.unknownData, expected: 'number' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        if (isNaN(this.unknownData)) {
            this.problems.push(Object.assign({ what: What.NaNEncountered, in: 'number', is: 'NaN', expected: 'number' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    internalType(unknownData) {
        const invalidType = this.isNullOrUndefined(unknownData);
        if (invalidType) {
            this.handleValidationFailure();
            return false;
        }
        const isNumber = typeof unknownData === 'number';
        if (!isNumber) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'number', is: typeof unknownData, expected: 'number' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        if (isNaN(unknownData)) {
            this.problems.push(Object.assign({ what: What.NaNEncountered, in: 'number', is: 'NaN', expected: 'number' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    thatIsPositive() {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const result = this.unknownData > 0;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: '> 0' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsNegative() {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const result = this.unknownData < 0;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: '< 0' }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsBetweenMinMax(minimumNumberValue, maximumNumberValue) {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        let result = this.unknownData >= minimumNumberValue;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `> ${minimumNumberValue}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData <= maximumNumberValue;
        if (!result) {
            this.problems.push({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `< ${maximumNumberValue}` });
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsOverMinimum(minimumValue) {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const result = this.unknownData >= minimumValue;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `> ${minimumValue}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsUnderMaximum(maximumValue) {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const result = this.unknownData <= maximumValue;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `< ${maximumValue}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsExactly(exactValue) {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const unknownNumber = this.unknownData;
        const result = unknownNumber === exactValue;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${unknownNumber}`, expected: `=== ${exactValue}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsEven() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData % 2 === 0;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `to be even` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsOdd() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData % 2 === 1;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `to be odd` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsNotZero() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData !== 0;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `!== 0` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsNotOne() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData !== 1;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `!== 1` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsNotNegativeOne() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        result = this.unknownData !== -1;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `!== -1` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsEvenlyDivisible() {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        // find out if the number is evenly divisible by anything
        const number = this.unknownData;
        const isPrime = this.isPrime(number);
        if (isPrime && number % 2 !== 0) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `to be evenly divisible` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (isPrime && number % 2 !== 0) {
            this.handleValidationFailure();
        }
        return (number % 2 === 0) || !isPrime;
    }
    thatIsEvenlyDivisibleBy(divisor) {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        const number = this.unknownData;
        const remainder = number % divisor;
        result = remainder === 0;
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${remainder}`, expected: `to be evenly divisible by ${divisor}` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsAPrimeNumber() {
        let result = this.type();
        if (!result) {
            this.handleValidationFailure();
            return false;
        }
        const number = this.unknownData;
        result = this.isPrime(number);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `to be a prime number` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatIsNotAPrimeNumber() {
        let isNumber = this.type();
        if (!isNumber) {
            this.handleValidationFailure();
            return false;
        }
        const number = this.unknownData;
        const isPrime = this.isPrime(number);
        if (isPrime) {
            this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: `${this.unknownData}`, expected: `not to be a prime number` }, (this.name && this.name !== '' ? { name: this.name } : {})));
        }
        if (isPrime) {
            this.handleValidationFailure();
        }
        return !isPrime;
    }
    isPrime(number) {
        // I did not write this code, source : https://en.wikipedia.org/wiki/Primality_test
        if (number === 2 || number === 3) {
            return true;
        }
        if (number % 2 === 0) {
            return false;
        }
        for (let i = 3; i * i <= number; i += 2) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
        // End of code I did not write.
    }
}
//# sourceMappingURL=NumberValidationClass.js.map