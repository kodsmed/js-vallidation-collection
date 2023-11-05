import { BaseValidationClass, ArgumentObject, ErroneousData, What } from './BaseValidationClass.js';


export class NumberValidationClass extends BaseValidationClass {
  constructor() {
    super();
  }

  type(): boolean {
    const invalidType = this.isNullOrUndefined(this.unknownData)
    if (invalidType) {
      this.handleValidationFailure()
      return false;
    }
    const isNumber = typeof this.unknownData === 'number';
    if (!isNumber) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'number',
        is: typeof this.unknownData,
        expected: 'number',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    if(isNaN(this.unknownData as number)) {
      this.problems.push({
        what: What.NaNEncountered,
        in: 'number',
        is: 'NaN',
        expected: 'number',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    return true;
  }

  internalType(unknownData: unknown): boolean {
    const invalidType = this.isNullOrUndefined(unknownData)
    if (invalidType) {
      this.handleValidationFailure()
      return false;
    }
    const isNumber = typeof unknownData === 'number';
    if (!isNumber) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'number',
        is: typeof unknownData,
        expected: 'number',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    if(isNaN(unknownData as number)) {
      this.problems.push({
        what: What.NaNEncountered,
        in: 'number',
        is: 'NaN',
        expected: 'number',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    return true;
  }

  thatIsPositive(): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = this.unknownData as number > 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: '> 0',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNegative(): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = this.unknownData as number < 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: '< 0',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsBetweenMinMax(minimumNumberValue: number, maximumNumberValue: number): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    let result = this.unknownData as number >= minimumNumberValue
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `> ${minimumNumberValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    result = this.unknownData as number <= maximumNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof this.unknownData as string, is: `${this.unknownData}`, expected: `< ${maximumNumberValue}`});
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsOverMinimum(minimumValue: number): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = this.unknownData as number >= minimumValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `> ${minimumValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsUnderMaximum(maximumValue: number): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = this.unknownData as number <= maximumValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `< ${maximumValue}`
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsExactly(exactValue: number): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const unknownNumber = this.unknownData as number;
    const result = unknownNumber === exactValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${unknownNumber}`,
        expected: `=== ${exactValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsEven(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as number) % 2 === 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `to be even`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsOdd(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as number) % 2 === 1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `to be odd`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotZero(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = this.unknownData as number !== 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`, expected: `!== 0`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotOne(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = this.unknownData as number !== 1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `!== 1`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotNegativeOne(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = this.unknownData as number !== -1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `!== -1`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsEvenlyDivisible(): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    // find out if the number is evenly divisible by anything
    const number = this.unknownData as number;
    const isPrime = this.isPrime(number);
    if (isPrime && number % 2 !== 0) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `to be evenly divisible`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(isPrime && number % 2 !== 0) {
      this.handleValidationFailure()
    }
    return (number % 2 === 0) || !isPrime;
  }
  thatIsEvenlyDivisibleBy(divisor: number): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }

    const number = this.unknownData as number;
    const remainder = number % divisor;
    result = remainder === 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${remainder}`,
        expected: `to be evenly divisible by ${divisor}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsAPrimeNumber(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    const number = this.unknownData as number;
    result = this.isPrime(number);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `to be a prime number`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;

  }

  thatIsNotAPrimeNumber(): boolean {
    let isNumber = this.type();
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const number = this.unknownData as number;
    const isPrime = this.isPrime(number);
    if (isPrime) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: `${this.unknownData}`,
        expected: `not to be a prime number`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(isPrime) {
      this.handleValidationFailure()
    }
    return !isPrime;
  }

  private isPrime (number: number): boolean {
    // I did not write this code, source : https://en.wikipedia.org/wiki/Primality_test
    if (number === 2 || number === 3) {
      return true
    }

    if (number % 2 === 0) {
      return false
    }

    for (let i = 3; i * i <= number; i += 2) {
      if (number % i === 0) {
        return false
      }
    }
    return true
    // End of code I did not write.
  }
}