import { BaseValidationClass, ArgumentObject } from './BaseValidationClass.js';

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
}