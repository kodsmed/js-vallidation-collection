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
      this.typeThatFailed = typeof unknownData;
      return false;
    }
    return true;
  }

  ofStrings(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.stringValidator)
  }

  ofNumbers(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.numberValidator)
  }

  ofObjects(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this.objectValidator)
  }

  ofArrays(unknownData: unknown): boolean {
    return this.isExpectedContent(unknownData, this)
  }

  ofBooleans(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'boolean')
  }

  ofFunctions(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'function')
  }

  ofSymbols(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => typeof item === 'symbol')
  }

  ofDates(unknownData: unknown): boolean {
    return this.isExpectedContentType(unknownData, (item: any) => item instanceof Date)
  }

  private isExpectedContent(unknownData: unknown, validatorInstance: StringValidationClass|NumberValidationClass|ObjectValidationClass|ArrayValidationClass): boolean {
    let result = this.type(unknownData);
    if (!result) {
      return false;
    }
    let endResult = true
    const data = unknownData as Array<any>;
    for (let index = 0; index < data.length; index++) {
      result = validatorInstance.type(data[index]);
      if (!result) {
        this.recordErroneousDataType(typeof data[index], index)
        endResult = false
      }
      endResult = endResult && result
    }
    return true;
  }

  private isExpectedContentType(unknownData: unknown, typeCheck: (item: any) =>boolean): boolean {
    // first check that the unknownData is an array
    if (!this.type(unknownData)) {
      return false;
    }

    const data = unknownData as Array<any>;
    // use the passed in typeCheck arrow-function, check each item in the array
    for (let index = 0; index < data.length; index++) {
      if (!typeCheck(data[index])) {
          this.recordErroneousDataType(typeof data[index], index);
          return false;
      }
    }
    return true;
  }

  private recordErroneousDataType(isType: string, index: number) {
    const erroneousData: ErroneousData = {
      what: What.unexpectedValues,
      in: 'Array',
      is: isType,
      at: index }
    this.unexpectedValueTypes.push(erroneousData)
  }
}