import { BaseValidationClass, ArgumentObject, ErroneousData, What } from "./BaseValidationClass";
import { StringValidationClass } from "./StringValidationClass";
import { NumberValidationClass } from "./NumberValidationClass";
import { ObjectValidationClass } from "./ObjectValidationClass";


export class ArrayValidationClass extends BaseValidationClass {
  private stringValidator: StringValidationClass;
  private numberValidator: NumberValidationClass;
  private objectValidator: ObjectValidationClass;
  constructor(argumentObject: ArgumentObject) {
    super(argumentObject);
    this.stringValidator = new StringValidationClass(argumentObject)
    this.numberValidator = new NumberValidationClass(argumentObject)
    this.objectValidator = new ObjectValidationClass(argumentObject)
  }

  type(unknownData: unknown): boolean {
    const result = Array.isArray(unknownData);
    if (!result) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'Array',
        is: typeof unknownData,
        expected: 'Array',
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
    const data = unknownData as Array<any>;
    if (data.length < this.minimumLength) {
      this.problems.push({
        what: What.tooShort,
        in: 'Array',
        is: data.length.toString(),
        expected: this.minimumLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  withMaximumLength(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const data = unknownData as Array<any>;
    if (data.length > this.maximumLength) {
      this.problems.push({
        what: What.tooLong,
        in: 'Array',
        is: data.length.toString(),
        expected: this.maximumLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  withExactLength(unknownData: unknown): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    const data = unknownData as Array<any>;
    if (data.length !== this.exactLength) {
      this.problems.push({
        what: What.faultyLength,
        in: 'Array',
        is: data.length.toString(),
        expected: this.exactLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  ofStrings(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.stringValidator, 'string')
  }

  ofNumbers(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.numberValidator, 'number')
  }

  ofObjects(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.objectValidator, 'object')
  }

  ofArrays(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this, 'Array')
  }

  ofBooleans(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'boolean', 'boolean')
  }

  ofFunctions(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'function', 'function')
  }

  ofSymbols(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'symbol', 'symbol')
  }

  ofDates(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => item instanceof Date, 'Date')
  }

  private isExpectedContent(unknownData: unknown, validatorInstance: StringValidationClass|NumberValidationClass|ObjectValidationClass|ArrayValidationClass, expected: string): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    let endResult = true
    const data = unknownData as Array<any>;
    for (let index = 0; index < data.length; index++) {
      result = validatorInstance.type(data[index]);
      if (!result) {
        this.recordErroneousDataType(typeof data[index], index, expected)
        endResult = false
      }
      endResult = endResult && result
    }
    if (!endResult) {
      this.handleValidationFailure()
    }
    return endResult;
  }

  private isExpectedContentType(unknownData: unknown, typeCheck: (item: any) =>boolean , expected: string): boolean {
    // first check that the unknownData is an array
    if (!this.type(unknownData)) {
      return false;
    }

    const data = unknownData as Array<any>;
    // use the passed in typeCheck arrow-function, check each item in the array
    for (let index = 0; index < data.length; index++) {
      if (!typeCheck(data[index])) {
          this.recordErroneousDataType(typeof data[index], index, expected);
          this.handleValidationFailure()
          return false;
      }
    }
    return true;
  }

  private recordErroneousDataType(isType: string, index: number, expectedType: string) {
    const erroneousData: ErroneousData = {
      what: What.unexpectedValueTypes,
      in: 'Array',
      is: isType,
      at: index,
      expected: expectedType,
      ...(this.name && this.name !== '' ? { name: this.name } : {})
    }
    this.problems.push(erroneousData)
  }
}