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

  isInstanceOf (unknownData: unknown, classType: any): boolean {
    let result = this.isAnObject(unknownData)
    if (!(unknownData instanceof classType)) {
      result = false
      this.typeThatFailed = typeof unknownData
    }
    return result
  }

  thatMayHaveProperties(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataObject = unknownData as object;
    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject);

    for (const property of this.validProperties) {
      if (!dataObject.hasOwnProperty(property)) {
        this.unexpectedProperties.push({ what: What.unexpectedProperties, in: typeof unknownData as string, is: property });
      }
      const index = allProperties.indexOf(property);
      if (index > -1) {
        allProperties.splice(index, 1);
      }
    }
   return result
  }

  thatMustHaveProperties (unknownData: unknown): boolean {
    let result = this.type(unknownData)
    if (!result) {
      return false
    }
    const dataObject = unknownData as object
    const missingProperties: Array<ErroneousData> = []

    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject)

    for (const property of this.validProperties) {
      if (!dataObject.hasOwnProperty(property)) {
        missingProperties.push({ what: What.missingProperties, in: typeof unknownData as string })
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
      this.unexpectedProperties = this.buildErroneousDataArray(allProperties, What.unexpectedProperties, typeof unknownData as string)
    }
    if (missingProperties.length > 0) {
      result = false
      this.missingProperties = missingProperties
    }
    return result
  }

  thatMustHaveSanctionedValues(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataObject = unknownData as Record<string, unknown>;
    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject);

    for (const property of allProperties) {
      // loop through all the properties of the object, check if any of them have a value that is not in the array of sanctioned values. Type can be anything. As long as it's in the array of sanctioned values, it's ok.
      if (this.validValues.indexOf(dataObject[property]) === -1) {
        this.unexpectedValues.push({ what: What.unexpectedValues, in: typeof unknownData as string, is: property });
        result = false;
      }
    }
    return result;
  }

  thatMustHaveSanctionedValueTypes(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const dataObject = unknownData as Record<string, unknown>;
    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject);

    // All the properties of the object must have a value that is of a sanctioned type. The type can be anything, as long as it's in the array of sanctioned types.
    for (const property of allProperties) {
      const valueType: string = typeof dataObject[property];
      if (this.validValueTypes.indexOf(valueType) === -1) {
        this.unexpectedValueTypes.push({ what: What.unexpectedValueTypes, in: typeof unknownData as string, is: property });
        result = false;
      }
    }
    return result;
  }

  private buildErroneousDataArray (array: Array<string>, what: What, inWhat: string): Array<ErroneousData> {
    const erroneousDataArray: Array<ErroneousData> = []
    for (const item of array) {
      erroneousDataArray.push({what: what, in: inWhat, is: item})
    }
    return erroneousDataArray
  }
}
