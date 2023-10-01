import { BaseValidationClass, ArgumentObject, ErroneousData, What } from './BaseValidationClass.js';

export class NumberValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
    const result = typeof unknownData === 'number';
    if (!result) {
      this.problems.push({ what: What.unexpectedType, in: 'number', is: typeof unknownData, expected: 'number' });
      return false;
    }
    return true;
  }

  thatIsPositive(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number > 0;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: '> 0' });
    }
    return result;
  }

  thatIsNegative(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number < 0;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: '< 0' });
    }
    return result;
  }

  thatIsBetweenMinMax(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number >= this.minimumLength
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `> ${this.minimumNumberValue}`});
      return false;
    }
    result = unknownData as number <= this.maximumNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `< ${this.maximumNumberValue}`});
    }
    return result;
  }

  thatIsOverMinimum(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number >= this.minimumNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `> ${this.minimumNumberValue}`});
    }
    return result;
  }

  thatIsUnderMaximum(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number <= this.maximumNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `< ${this.maximumNumberValue}`});
    }
    return result;
  }

  thatIsExactly(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number === this.exactNumberValue;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `=== ${this.exactNumberValue}`});
    }
    return result;
  }

  thatIsEven(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as number) % 2 === 0;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `to be even` });
    }
    return result;
  }

  thatIsOdd(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as number) % 2 === 1;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `to be odd` });
    }
    return result;
  }

  thatIsNotZero(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number !== 0;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `!== 0` });
    }
    return result;
  }

  thatIsNotOne(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number !== 1;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `!== 1` });
    }
    return result;
  }

  thatIsNotNegativeOne(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = unknownData as number !== -1;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `!== -1` });
    }
    return result;
  }

  thatIsEvenlyDivisible(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    // find out if the number is evenly divisible by anything
    const number = unknownData as number;
    result = this.isPrime(number);
    if (result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `to be evenly divisible` });
    }
    return result;
  }

  thatIsEvenlyDivisibleBy(unknownData: unknown, divisor: number): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }

    const number = unknownData as number;
    const remainder = number % divisor;
    result = remainder === 0;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${remainder}`, expected: `to be evenly divisible by ${divisor}` });
    }
    return result;
  }

  thatIsAPrimeNumber(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const number = unknownData as number;
    result = this.isPrime(number);
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `to be a prime number` });
    }
    return result;

  }

  thatIsNotAPrimeNumber(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const number = unknownData as number;
    result = this.isPrime(number);
    if (result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: `${unknownData}`, expected: `not to be a prime number` });
    }
    return result;
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