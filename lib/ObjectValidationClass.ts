import { BaseValidationClass, ArgumentObject, ErroneousData, What } from './BaseValidationClass.js';

export class ObjectValidationClass extends BaseValidationClass {
  [key: string]: any;
  [key: symbol]: any;
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
  }

  type(unknownData: unknown): boolean {
    const result = typeof unknownData === 'object';
    if (!result) {
      this.typeThatFailed = typeof unknownData;
      return false;
    }
    return true;
  }

  isAnObjectThatMustHaveProperties (unknownData: unknown) {
    let result = this.type(unknownData)
    if (!result) {
      return false
    }
    const dataObject = unknownData as object
    const missingProperties: Array<ErroneousData> = []

    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject)
    const unexpectedProperties: Array<ErroneousData> = []

    for (const property of this.validProperties) {
      if (!dataObject.hasOwnProperty(property)) {
        missingProperties.push({what: What.missingProperties, in: unknownData as string })
        result = false
      } else {
        const index = allProperties.indexOf(property)
        if (index > -1) {
          allProperties.splice(index, 1)
        }
      }
    }

    if (allProperties.length > 0) {
      result = false
      this.unexpectedProperties = this.buildErroneousDataArray(allProperties, What.unexpectedProperties, unknownData as string)
    }
    if (missingProperties.length > 0) {
      result = false
      this.missingProperties = missingProperties
    }
    return result
  }

  private buildErroneousDataArray (array: Array<string>, what: What, inWhat: string): Array<ErroneousData> {
    const erroneousDataArray: Array<ErroneousData> = []
    for (const item of array) {
      erroneousDataArray.push({what: what, in: inWhat, is: item})
    }
    return erroneousDataArray
  }
}
