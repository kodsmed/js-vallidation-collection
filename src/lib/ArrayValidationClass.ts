import { BaseValidationClass, ErroneousData, What } from "./BaseValidationClass";
import { StringValidationClass } from "./StringValidationClass";
import { NumberValidationClass } from "./NumberValidationClass";
import { ObjectValidationClass } from "./ObjectValidationClass";


export class ArrayValidationClass extends BaseValidationClass {
  private stringValidator: StringValidationClass;
  private numberValidator: NumberValidationClass;
  private objectValidator: ObjectValidationClass;
  constructor() {
    super();
    this.stringValidator = new StringValidationClass()
    this.numberValidator = new NumberValidationClass()
    this.objectValidator = new ObjectValidationClass()
  }

  type(): boolean {
    const isInvalid = this.isNullOrUndefined(this.unknownData)
    if (isInvalid) {
      return false;
    }
    const validArray  = Array.isArray(this.unknownData);

    if (!validArray) {
      this.problems.push({
        what: What.unexpectedType,
        in: 'Array',
        is: typeof this.unknownData,
        expected: 'Array',
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
    const validArray  = Array.isArray(unknownData);

    if (!validArray) {
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

  withMinimumLength(minimumLength: number): boolean {
    let result = this.type();
    if (!result) {
      return false;
    }
    const data = this.unknownData as Array<any>;
    if (data.length < minimumLength) {
      this.problems.push({
        what: What.tooShort,
        in: 'Array',
        is: data.length.toString(),
        expected: minimumLength.toString(),
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
    const data = this.unknownData as Array<any>;
    if (data.length > maximumLength) {
      this.problems.push({
        what: What.tooLong,
        in: 'Array',
        is: data.length.toString(),
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
    const data = this.unknownData as Array<any>;
    if (data.length !== exactLength) {
      this.problems.push({
        what: What.faultyLength,
        in: 'Array',
        is: data.length.toString(),
        expected: exactLength.toString(),
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      result = false;
      this.handleValidationFailure()
    }
    return result;
  }

  ofStrings(): boolean {
    return this.isExpectedContent(this.unknownData, this.stringValidator, 'string')
  }

  ofNumbers(): boolean {
    return this.isExpectedContent(this.unknownData, this.numberValidator, 'number')
  }

  ofObjects(): boolean {
    return this.isExpectedContent(this.unknownData, this.objectValidator, 'object')
  }

  ofArrays(): boolean {
    return this.isExpectedContent(this.unknownData, this, 'Array')
  }

  ofBooleans(): boolean {
    return this.isExpectedContentType(this.unknownData, (item: any) => typeof item === 'boolean', 'boolean')
  }

  ofFunctions(): boolean {
    return this.isExpectedContentType(this.unknownData, (item: any) => typeof item === 'function', 'function')
  }

  ofSymbols(): boolean {
    return this.isExpectedContentType(this.unknownData, (item: any) => typeof item === 'symbol', 'symbol')
  }

  ofDates(): boolean {
    return this.isExpectedContentType(this.unknownData, (item: any) => item instanceof Date, 'Date')
  }

  thatMustHaveSanctionedValues(sanctionedValues: Array<any> = []): boolean {
    const isArray = this.type();
    if (!isArray) {
      return false;
    }
    const dataArray = this.unknownData as Array<any>;
    let result = true;
    for (let index = 0; index < dataArray.length; index++) {
      const data = dataArray[index];
      if (!sanctionedValues.includes(data)) {
        this.problems.push({
          what: What.unexpectedValues,
          in: 'Array',
          is: data.toString(),
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

  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>= []): boolean {
    const isArray = this.type();
    if (!isArray) {
      return false;
    }
    const dataArray = this.unknownData as Array<any>;
    let result = true;
    for (let index = 0; index < dataArray.length; index++) {
      const data = dataArray[index];
      if (!sanctionedTypes.includes(typeof data)) {
        // special case, Array is an object, so we need to check for it.
        if (sanctionedTypes.includes('array') && typeof data === 'object' && Array.isArray(data)) {
          continue;
        }

        this.problems.push({
          what: What.unexpectedValueTypes,
          in: 'Array',
          is: typeof data,
          expected: sanctionedTypes.join(', '),
          ...(this.name && this.name !== '' ? { name: this.name } : {})
        });
        result = false;
      }
    }
    if(!result) {
      this.handleValidationFailure()
    }
    return result;
  }

  private isExpectedContent(unknownData: unknown, validatorInstance: StringValidationClass|NumberValidationClass|ObjectValidationClass|ArrayValidationClass, expected: string): boolean {
    const isArray = this.type();
    if (!isArray) {
      return false;
    }
    let endResult = true
    let result
    const data = unknownData as Array<any>;
    for (let index = 0; index < data.length; index++) {
      result = validatorInstance.internalType(data[index]);
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
    if (!this.type()) {
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