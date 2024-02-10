import { BaseValidationClass, What, ErroneousData } from './BaseValidationClass';

export class StringValidationClass extends BaseValidationClass {
  constructor() {
    super();
  }

  type(): boolean {
    return this.internalType(this.unknownData);
  }

  internalType(unknownData: unknown): boolean {
    const invalid = this.isNullOrUndefined(unknownData);
    if(invalid) {
      this.handleValidationFailure()
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
      this.handleValidationFailure()
      return false;
    }
    return true;
  }

  withMinimumLength(minimumLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataString = this.unknownData as string;
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
      this.handleValidationFailure()
    }
    return result;
  }

  withMaximumLength(maximumLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataString = this.unknownData as string;
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
      this.handleValidationFailure()
    }
    return result;
  }

  withExactLength(exactLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataString = this.unknownData as string;
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
      this.handleValidationFailure()
    }
    return result;
  }

  thatIncludes(subString: string): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    result = (this.unknownData as string).includes(subString);
    if (!result) {
    this.problems.push({
      what: What.unexpectedValues,
      in: typeof this.unknownData as string,
      is: this.unknownData as string,
      expected: `${subString} to be included`,
      ...(this.name && this.name !== '' ? { name: this.name } : {})
    });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatDoesNotIncludes(subString: string): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = !(this.unknownData as string).includes(subString);
    const unknownString = this.unknownData as string;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: unknownString,
        at: unknownString.indexOf(subString) ,
        expected: `${subString} to not be included`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsInCapitalLetters(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as string).toUpperCase() === this.unknownData;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `to be in capital letters`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsInSmallLetters(): boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as string).toLowerCase() === this.unknownData;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `to be in small letters`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  firstLetterIsCapital() : boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    const unknownString = this.unknownData as string;
    unknownString.trim();
    const firstLetter = unknownString[0];
    result = (firstLetter.toUpperCase() === firstLetter)
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: firstLetter,
        expected: `to be a capital letter`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatEndsWith(subString: string) : boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as string).endsWith(subString);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `to end with ${subString}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatStartsWith(subString: string) : boolean {
    let result = this.type();
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (this.unknownData as string).startsWith(subString);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `to start with ${subString}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsAnEmail(): boolean {
    const email = this.unknownData as string;
    let result = typeof email === 'string' && email.includes('@') && email.includes('.');

    if (!result) {
      // Handle failure due to missing @ or .
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
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
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
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
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `an email address, . comes before @ or is immediately after @`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure();
      return false;
    }

    // Additional checks can be added here

    return true;
}

  thatIsAUrl() : boolean {
    if (!this.type()) {
      this.handleValidationFailure()
      return false;
    }
    const url = this.unknownData as string
    let result = false
    try {
      new URL(url)
      result = true
    } catch (error) {
      result = false
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof this.unknownData as string,
        is: this.unknownData as string,
        expected: `to be a valid URL`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }
}