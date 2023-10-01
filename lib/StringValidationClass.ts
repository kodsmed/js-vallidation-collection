import { BaseValidationClass, ArgumentObject, What, ErroneousData } from './BaseValidationClass.js';

export class StringValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
    const result = typeof unknownData === 'string';
    if (!result) {
      this.problems.push({ what: What.unexpectedType, in: 'string', is: typeof unknownData, expected: 'string' });
      return false;
    }
    return true;
  }

  thatIncludes(unknownData: unknown, subString: string): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).includes(subString);
    if (!result) {
    this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `${subString} to be included` });
    }
    return result;
  }

  thatDoesNotIncludes(unknownData: unknown, subString: string): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = !(unknownData as string).includes(subString);
    const unknownString = unknownData as string;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownString, at: unknownString.indexOf(subString) , expected: `${subString} to not be included` });
    }
    return result;
  }

  thatIsInCapitalLetters(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).toUpperCase() === unknownData;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to be in capital letters` });
    }
    return result;
  }

  thatIsInSmallLetters(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).toLowerCase() === unknownData;
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to be in small letters` });
    }
    return result;
  }

  firstLetterIsCapital(unknownData: unknown) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const unknownString = unknownData as string;
    unknownString.trim();
    const firstLetter = unknownString[0];
    result = (firstLetter.toUpperCase() === firstLetter)
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: firstLetter, expected: `to be a capital letter` });
    }
    return result;
  }

  endsWith(unknownData: unknown, subString: string) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).endsWith(subString);
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to end with ${subString}` });
    }
    return result;
  }

  startsWith(unknownData: unknown, subString: string) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).startsWith(subString);
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to start with ${subString}` });
    }
    return result;
  }

  thatIsAnEmail(unknownData: unknown) : boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    result = (unknownData as string).includes('@');
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to include @` });
    }
    result && (result = (unknownData as string).includes('.'));
    if (!result) {
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to include .` });
    }
    if (unknownData && (unknownData as string).includes('@') && (unknownData as string).includes('.')) {
      const email = unknownData as string
      const atIndex = email.indexOf('@')
      const dotIndex = email.lastIndexOf('.')
      if (atIndex > dotIndex) {
        this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to have a . after the @` });
        result = false
      }
    }
    return result;
  }

  thatIsAUrl(unknownData: unknown) : boolean {
    if (!this.type(unknownData)) {
      return false;
    }
    const url = unknownData as string
    let result = false
    try {
      new URL(url)
      result = true
    } catch (error) {
      result = false
      this.problems.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: unknownData as string, expected: `to be a valid URL` });
    }

    return result;
  }
}