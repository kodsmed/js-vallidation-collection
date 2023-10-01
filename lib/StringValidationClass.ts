import { BaseValidationClass, ArgumentObject, What } from './BaseValidationClass.js';

export class StringValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
    const result = typeof unknownData === 'string';
    if (!result) {
      this.typeThatFailed = typeof unknownData;
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
      this.typeThatFailed = `string does not include ${subString}`;
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
      this.unexpectedValues.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: subString, at: unknownString.indexOf(subString) });
      this.typeThatFailed = `string includes ${subString}`;
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
      this.typeThatFailed = `string is not in capital letters`;
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
      this.typeThatFailed = `string is not in small letters`;
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
    result = (unknownString)[0].toUpperCase() === (unknownString)[0];
    if (!result) {
      this.typeThatFailed = `first letter is not capital`;
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
      this.typeThatFailed = `string does not end with ${subString}`;
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
      this.typeThatFailed = `string does not start with ${subString}`;
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
      this.typeThatFailed = `string does not include @`;
    }
    result && (result = (unknownData as string).includes('.'));
    if (!result) {
      this.typeThatFailed = `string does not include .`;
    }
    if (unknownData && (unknownData as string).includes('@') && (unknownData as string).includes('.')) {
      const email = unknownData as string
      const atIndex = email.indexOf('@')
      const dotIndex = email.indexOf('.')
      if (atIndex > dotIndex) {
        this.typeThatFailed = `@ is after .`;
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
      this.typeThatFailed = `string is not a valid url`;
    }

    return result;
  }
}