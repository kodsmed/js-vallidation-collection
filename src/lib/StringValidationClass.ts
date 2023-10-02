import { BaseValidationClass, ArgumentObject, What, ErroneousData } from './BaseValidationClass';

export class StringValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
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

  withMinimumLength(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataString = unknownData as string;
    result = dataString.length >= this.minimumLength;
    if (!result) {
      this.problems.push({
        what: What.tooShort,
        in: typeof unknownData,
        is: `length : ${dataString.length}`,
        expected: `to be at least ${this.minimumLength} characters long`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  withMaximumLength(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataString = unknownData as string;
    result = dataString.length <= this.maximumLength;
    if (!result) {
      this.problems.push({
        what: What.tooLong,
        in: typeof unknownData,
        is: `length : ${dataString.length}`,
        expected: `to be at most ${this.maximumLength} characters long`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  withExactLength(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataString = unknownData as string;
    result = dataString.length === this.exactLength;
    if (!result) {
      this.problems.push({
        what: What.faultyLength,
        in: typeof unknownData,
        is: `length : ${dataString.length}`,
        expected: `to be exactly ${this.exactLength} characters long`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIncludes(unknownData: unknown, subString: string): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).includes(subString);
    if (!result) {
    this.problems.push({
      what: What.unexpectedValues,
      in: typeof unknownData as string,
      is: unknownData as string,
      expected: `${subString} to be included`,
      ...(this.name && this.name !== '' ? { name: this.name } : {})
    });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatDoesNotIncludes(unknownData: unknown, subString: string): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = !(unknownData as string).includes(subString);
    const unknownString = unknownData as string;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
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

  thatIsInCapitalLetters(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as string).toUpperCase() === unknownData;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to be in capital letters`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsInSmallLetters(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as string).toLowerCase() === unknownData;
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to be in small letters`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  firstLetterIsCapital(unknownData: unknown) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    const unknownString = unknownData as string;
    unknownString.trim();
    const firstLetter = unknownString[0];
    result = (firstLetter.toUpperCase() === firstLetter)
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
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

  thatEndsWith(unknownData: unknown, subString: string) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as string).endsWith(subString);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to end with ${subString}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatStartsWith(unknownData: unknown, subString: string) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as string).startsWith(subString);
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to start with ${subString}`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsAnEmail(unknownData: unknown) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      this.handleValidationFailure()
      return false;
    }
    result = (unknownData as string).includes('@');
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to include @`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    result && (result = (unknownData as string).includes('.'));
    if (!result) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to include .`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
    }
    if ((unknownData as string).lastIndexOf('.') > (unknownData as string).length - 3) {
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
        expected: `to have at least 2 characters after the .`,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false
    }
    if (unknownData && (unknownData as string).includes('@') && (unknownData as string).includes('.')) {
      const email = unknownData as string
      const atIndex = email.indexOf('@')
      const dotIndex = email.lastIndexOf('.')
      if (atIndex > dotIndex) {
        this.problems.push({
          what: What.unexpectedValues,
          in: typeof unknownData as string,
          is: unknownData as string,
          expected: `to have a . after the @`,
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        });
        result = false
      }
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsAUrl(unknownData: unknown) : boolean {
    if (!this.type(unknownData)) {
      this.handleValidationFailure()
      return false;
    }
    const url = unknownData as string
    let result = false
    try {
      new URL(url)
      result = true
    } catch (error) {
      result = false
      this.problems.push({
        what: What.unexpectedValues,
        in: typeof unknownData as string,
        is: unknownData as string,
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