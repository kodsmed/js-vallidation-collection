import { BaseValidationClass, ArgumentObject, ErroneousData, What } from './BaseValidationClass';

export type divisibleByArgument = { value: unknown, divisor: number }
export class NumberValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
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

  thatIsPositive(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = unknownData as number > 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: '> 0',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNegative(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = unknownData as number < 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: '< 0',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsBetweenMinMax(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    let result = unknownData as number >= this.minimumNumberValue
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `> ${this.minimumNumberValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    result = unknownData as number <= this.maximumNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `< ${this.maximumNumberValue}`});
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsOverMinimum(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = unknownData as number >= this.minimumNumberValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `> ${this.minimumNumberValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsUnderMaximum(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const result = unknownData as number <= this.maximumNumberValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `< ${this.maximumNumberValue}`
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsExactly(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const unknownNumber = unknownData as number;
    const result = unknownNumber === this.exactNumberValue;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownNumber}`,
        expected: `=== ${this.exactNumberValue}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsEven(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as number) % 2 === 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `to be even`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsOdd(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as number) % 2 === 1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `to be odd`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotZero(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = unknownData as number !== 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`, expected: `!== 0`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotOne(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = unknownData as number !== 1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `!== 1`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsNotNegativeOne(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = unknownData as number !== -1;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `!== -1`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsEvenlyDivisible(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    // find out if the number is evenly divisible by anything
    const number = unknownData as number;
    const isPrime = this.isPrime(number);
    if (isPrime && number % 2 !== 0) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `to be evenly divisible`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(isPrime && number % 2 !== 0) {
      this.handleValidationFailure()
    }
    return (number % 2 === 0) || !isPrime;
  }
  thatIsEvenlyDivisibleBy(argument: divisibleByArgument): boolean {
    let result = this.type(argument.value);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }

    const number = argument.value as number;
    const remainder = number % argument.divisor;
    result = remainder === 0;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof argument.value as string,
        is: `${remainder}`,
        expected: `to be evenly divisible by ${argument.divisor}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsAPrimeNumber(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    const number = unknownData as number;
    result = this.isPrime(number);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
        expected: `to be a prime number`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;

  }

  thatIsNotAPrimeNumber(unknownData: unknown): boolean {
    let isNumber = this.type(unknownData);
    if (!isNumber) {
      this.handleValidationFailure()
      return false;
    }
    const number = unknownData as number;
    const isPrime = this.isPrime(number);
    if (isPrime) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: `${unknownData}`,
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