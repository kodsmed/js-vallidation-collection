import { BaseValidationClass, ErroneousData, What } from './BaseValidationClass.js';

export class ObjectValidationClass extends BaseValidationClass {
  [key: string]: any;
  [key: symbol]: any;
  constructor() {
    super();
  }

  type(): boolean {
    const isInvalid = this.isNullOrUndefined(this.unknownData)
    if (isInvalid) {
      return false;
    }
    const result = typeof this.unknownData === 'object' && !Array.isArray(this.unknownData);
    if (!result) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'object',
        is: typeof this.unknownData,
        expected: 'object',
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return false;
    }
    return true;
  }

  internalType(unknownData: unknown): boolean {
    const isInvalid = this.isNullOrUndefined(unknownData)
    if (isInvalid) {
      return false;
    }
    const result = typeof unknownData === 'object' && !Array.isArray(unknownData);
    if (!result) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'object',
        is: typeof unknownData,
        expected: 'object',
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
    const dataObject = this.unknownData as object;
    const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
    if (dataObjectProperties.length < minimumLength) {
      this.problems.push({
        what: What.tooShort,
        in: 'object',
        is: dataObjectProperties.length.toString(),
        expected: this.minimumLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  withMaximumLength(maximumLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataObject = this.unknownData as object;
    const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
    if (dataObjectProperties.length > maximumLength) {
      this.problems.push({
        what: What.tooLong,
        in: 'object',
        is: dataObjectProperties.length.toString(),
        expected: maximumLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  withExactLength(exactLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataObject = this.unknownData as object;
    const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
    if (dataObjectProperties.length !== exactLength) {
      this.problems.push({
        what: What.faultyLength,
        in: 'object',
        is: dataObjectProperties.length.toString(),
        expected: this.exactLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  thatIsInstanceOf (classType: any): boolean {
    let isObject = this.type()
    if (!isObject) {
      return false
    }
    let result = true
    if (!(this.unknownData instanceof classType)) {
      result = false
      this.problems.push({
        what: What.unexpectedType,
        in: typeof this.unknownData as string,
        is: typeof this.unknownData as string,
        expected: classType.name,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      })
      this.handleValidationFailure()
    }
    return result
  }

  thatMayHaveProperties(propertyNames: Array<string>): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataObject = this.unknownData as object;
    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject);

    for (const property of allProperties) {
      if (!propertyNames.includes(property)) {
        this.problems.push({
          what: What.unexpectedProperties,
          in: typeof this.unknownData as string,
          is: property,
          expected: this.validProperties.join(', '),
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        });
        result = false;
        this.handleValidationFailure()
      }
    }
   return result
  }

  thatMustHaveProperties (propertyNames: Array<string>): boolean {
    let result = this.type()
    if (!result) {
      return false
    }
    const dataObject = this.unknownData as object
    const missingProperties: Array<ErroneousData> = []

    const allProperties: Array<string> = Object.getOwnPropertyNames(dataObject)

    // All the valid properties must be in the object.
    for (const property of propertyNames) {
      if (!dataObject.hasOwnProperty(property)) {
        this.problems.push({
          what: What.missingProperties,
          in: typeof this.unknownData as string,
          expected: `${property} to be included`,
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        })
        result = false
      }
    }
    // All the properties of the object must be in the array of valid properties.
    for (const property of allProperties) {
      if (!propertyNames.includes(property)) {
        this.problems.push({
          what: What.unexpectedProperties,
          in: typeof this.unknownData as string,
          is: property,
          expected: this.validProperties.join(', '),
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        })
        result = false
      }
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result
  }

  thatMustHaveSanctionedValues(sanctionedValues: Array<any>): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataObject = this.unknownData as Record<string, any>;
    const allValues: Array<string> = Object.values(dataObject);

    for (const value of allValues) {
      // loop through all the properties of the object, check if any of them have a value that is not in the array of sanctioned values. Type can be anything. As long as it's in the array of sanctioned values, it's ok.
      if (!sanctionedValues.includes(value)) {
        const valueAsString = this.valueToString(value)
        this.problems.push({
          what: What.unexpectedValues,
          in: typeof this.unknownData as string,
          is: valueAsString,
          expected: sanctionedValues.join(', '),
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        });
        result = false;
      }
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const dataObject = this.unknownData as Record<string, any>;
    const allValues: Array<string> = Object.values(dataObject);

    // All the properties of the object must have a value that is of a sanctioned type. The type can be anything, as long as it's in the array of sanctioned types.
    for (const value of allValues) {
      const valueType = typeof value
      if (sanctionedTypes.indexOf(valueType) === -1) {
        const valueAsString = this.valueToString(value)
        this.problems.push({
          what: What.unexpectedValueTypes,
          in: typeof this.unknownData as string,
          is: typeof value,
          expected: sanctionedTypes.join(', '),
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        });
        result = false;
      }
    }
    if (!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  private valueToString (value: any): string {
    let valueAsString: string = 'unknown'
    switch (typeof value) {
      case 'string':
        valueAsString = value;
        break;
      case 'number':
        if (Number.isNaN(value)) {
          valueAsString = 'NaN';
        } else {
          valueAsString = Number(value).toString();
        }
        break;
      case 'boolean':
        valueAsString = Boolean(value).toString();
        break;
      case 'object':
        if (value === null) {
          valueAsString = 'null';
        } else {
          valueAsString = JSON.stringify(value);
        }
        break;
      case 'function':
      case 'symbol':
      case 'undefined':
      case 'bigint':
        valueAsString = typeof value;
        break;
    }
    return valueAsString
  }
}
