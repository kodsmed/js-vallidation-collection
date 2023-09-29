import { BaseValidationClass, ArgumentObject } from './BaseValidationClass.js';

export class NumberValidationClass extends BaseValidationClass {
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
    const result = typeof unknownData === 'number';
    if (!result) {
      this.typeThatFailed = typeof unknownData;
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
      this.typeThatFailed = 'number < 0';
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
      this.typeThatFailed = 'number > 0';
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
      this.typeThatFailed = 'number < ' + this.minimumLength;
      return false;
    }
    result = unknownData as number <= this.maximumLength;
    if (!result) {
      this.typeThatFailed = 'number > ' + this.maximumLength;
    }
    return result;
  }
}