/**
 * ValidationCollection, a collection of Validation objects that can be used to validate the parameters of a function.
 * Contains a collection of methods that can be used to for validation.
 *
 * @module ValidationCollection
 * @version 1.0.0
 * @author Jimmy "Kodsmed" Karlsson
 *
 * @typedef {Object} ValidationCollection
 * @property {number} minimumLength - Define the minium required length.
 * @property {number} maximumLength - Define the maximum length allowed.
 * @property {number} exactLength - Define the exact length required.
 * @property {number} minimumNumberValue - Define the minimum number value allowed.
 * @property {number} maximumNumberValue - Define the maximum number value allowed.
 * @property {number} exactNumberValue - Define the exact number value required.
 * @property {Array} validProperties - Example ['width', 'height', 'color'].
 * @property {Array} validValues - Examples [1, 2, 3], ['red', 'green', 'blue']. Values can be of any type.
 * @property {Array} validValueTypes - Examples ['number', 'string', 'boolean']. Strings must be lowercase.
 * // these are the output properties, they are read-only and can only be accessed via getters (see below). They are empty if there are no errors, and does not reset automatically.
 * @ property {Array} problems - An array of ErroneousData objects. Each object describes a problem with the data that was passed to the validator.
 */

import {  ArgumentObject } from './lib/BaseValidationClass.js';
import { ArrayValidationClass } from './lib/ArrayValidationClass.js';
import { StringValidationClass } from './lib/StringValidationClass.js';
import { NumberValidationClass } from './lib/NumberValidationClass.js';
import { ObjectValidationClass } from './lib/ObjectValidationClass.js';
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject } from './interface/CallableObject.js';

export class ValidationCollection {
  private stringValidationClass: StringValidationClass
  private numberValidationClass: NumberValidationClass
  private objectValidationClass: ObjectValidationClass
  private arrayValidationClass: ArrayValidationClass

  constructor(argumentObject: ArgumentObject = {}) {
    this.stringValidationClass = new StringValidationClass(argumentObject)
    this.numberValidationClass = new NumberValidationClass(argumentObject)
    this.objectValidationClass = new ObjectValidationClass(argumentObject)
    this.arrayValidationClass = new ArrayValidationClass(argumentObject)
  }

  get isString(): CallableStringValidatorObject {
    const self = this
    const callableObject : CallableStringValidatorObject = Object.assign(
      function (unknownData: unknown): boolean {
        return self.stringValidationClass.type(unknownData)
      },
      {
        withMinimumLength(unknownData: unknown):boolean {
          return self.stringValidationClass.withMinimumLength(unknownData)
        }
      },
      {
        withMaximumLength(unknownData: unknown):boolean {
          return self.stringValidationClass.withMaximumLength(unknownData)
        }
      },
      {
        withExactLength(unknownData: unknown):boolean {
          return self.stringValidationClass.withExactLength(unknownData)
        }
      },
      {
        thatIncludes(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.thatIncludes(unknownData, subString)
        }
      },
      {
        thatDoesNotIncludes(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.thatDoesNotIncludes(unknownData, subString)
        }
      },
      {
        thatIsInCapitalLetters(unknownData: unknown) : boolean {
          return self.stringValidationClass.thatIsInCapitalLetters(unknownData)
        }
      },
      {
        thatIsInSmallLetters(unknownData: unknown) : boolean {
          return self.stringValidationClass.thatIsInSmallLetters(unknownData)
        }
      },
      {
        firstLetterIsCapital(unknownData: unknown) : boolean {
          return self.stringValidationClass.firstLetterIsCapital(unknownData)
        }
      },
      {
        endsWith(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.endsWith(unknownData, subString)
        }
      },
      {
        startsWith(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.startsWith(unknownData, subString)
        }
      },
      {
        thatIsAnEmail(unknownData: unknown) : boolean {
          return self.stringValidationClass.thatIsAnEmail(unknownData)
        }
      },
      {
        thatIsAUrl(unknownData: unknown) : boolean {
          return self.stringValidationClass.thatIsAUrl(unknownData)
        }
      }
    )
    return callableObject
  }

  get isNumber(): CallableNumberValidatorObject {
    const self = this
    const callableObject : CallableNumberValidatorObject = Object.assign(
      function (unknownData: unknown): boolean {
        return self.numberValidationClass.type(unknownData)
      },
      {
        withMinimumLength(unknownData: unknown):boolean {
          return self.numberValidationClass.withMinimumLength(unknownData)
        }
      },
      {
        withMaximumLength(unknownData: unknown):boolean {
          return self.numberValidationClass.withMaximumLength(unknownData)
        }
      },
      {
        withExactLength(unknownData: unknown):boolean {
          return self.numberValidationClass.withExactLength(unknownData)
        }
      },
      {
        thatIsPositive(unknownData: unknown):boolean {
          return self.numberValidationClass.thatIsPositive(unknownData)
        }
      },
      {
        thatIsNegative(unknownData: unknown):boolean {
          return self.numberValidationClass.thatIsNegative(unknownData)
        }
      },
      {
        thatIsBetweenMinMax(unknownData: unknown):boolean {
          return self.numberValidationClass.thatIsBetweenMinMax(unknownData)
        }
      },
      {
        thatIsOverMinimum(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsOverMinimum(unknownData)
        }
      },
      {
        thatIsUnderMaximum(unknownData: unknown): boolean {
         return self.numberValidationClass.thatIsUnderMaximum(unknownData)
        }
      },
      {
        thatIsExactly(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsExactly(unknownData)
        }
      },
      {
        thatIsEven(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsEven(unknownData)
        }
      },
      {
        thatIsOdd(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsOdd(unknownData)
        }
      },
      {
        thatIsNotZero(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsNotZero(unknownData)
        }
      },
      {
        thatIsNotOne(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsNotOne(unknownData)
        }
      },
      {
        thatIsNotNegativeOne(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsNotNegativeOne(unknownData)
        }
      },
      {
        thatIsEvenlyDivisible(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsEvenlyDivisible(unknownData)
        }
      },
      {
        thatIsEvenlyDivisibleBy(unknownData: unknown, divisor: number): boolean {
          return self.numberValidationClass.thatIsEvenlyDivisibleBy(unknownData, divisor)
        }
      },
      {
        thatIsAPrimeNumber(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsAPrimeNumber(unknownData)
        }
      },
      {
        thatIsNotAPrimeNumber(unknownData: unknown): boolean {
          return self.numberValidationClass.thatIsNotAPrimeNumber(unknownData)
        }
      }
    )
    return callableObject
  }

  get isObject(): CallableObjectValidatorObject {
    const self = this
    const callableObject : CallableObjectValidatorObject = Object.assign(
      function (unknownData: unknown): boolean {
        return self.objectValidationClass.type(unknownData)
      },
      {
        withMinimumLength(unknownData: unknown):boolean {
          return self.objectValidationClass.withMinimumLength(unknownData)
        }
      },
      {
        withMaximumLength(unknownData: unknown):boolean {
          return self.objectValidationClass.withMaximumLength(unknownData)
        }
      },
      {
        withExactLength(unknownData: unknown):boolean {
          return self.objectValidationClass.withExactLength(unknownData)
        }
      },
      {
        thatMayHaveProperties(unknownData: unknown):boolean {
          return self.objectValidationClass.thatMayHaveProperties(unknownData)
        }
      },
      {
        thatMustHaveProperties(unknownData: unknown):boolean {
          return self.objectValidationClass.thatMustHaveProperties(unknownData)
        }
      },
      {
        thatMustHaveSanctionedValues(unknownData: unknown):boolean {
          return self.objectValidationClass.thatMustHaveSanctionedValues(unknownData)
        }
      },
      {
        thatMustHaveSanctionedValueTypes(unknownData: unknown):boolean {
          return self.objectValidationClass.thatMustHaveSanctionedValueTypes(unknownData)
        }
      }
    )
    return callableObject
  }

  get isArray(): CallableArrayValidatorObject {
    const self = this
    const callableObject : CallableArrayValidatorObject = Object.assign(
      function (unknownData: unknown): boolean {
        return self.objectValidationClass.type(unknownData)
      },
      {
        withMinimumLength(unknownData: unknown):boolean {
          return self.arrayValidationClass.withMinimumLength(unknownData)
        }
      },
      {
        withMaximumLength(unknownData: unknown):boolean {
          return self.arrayValidationClass.withMaximumLength(unknownData)
        }
      },
      {
        withExactLength(unknownData: unknown):boolean {
          return self.arrayValidationClass.withExactLength(unknownData)
        }
      },
      {
        ofStrings(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofStrings(unknownData)
        }
      },
      {
        ofNumbers(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofNumbers(unknownData)
        }
      },
      {
        ofObjects(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofObjects(unknownData)
        }
      },
      {
        ofArrays(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofArrays(unknownData)
        }
      },
      {
        ofBooleans(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofBooleans(unknownData)
        }
      },
      {
        ofFunctions(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofFunctions(unknownData)
        }
      },
      {
        ofSymbols(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofSymbols(unknownData)
        }
      },
      {
        ofDates(unknownData: unknown):boolean {
          return self.arrayValidationClass.ofDates(unknownData)
        }
      }
    )
    return callableObject
  }

  get report() {
    const arrayProblems = this.arrayValidationClass.report
    const objectProblems = this.objectValidationClass.report
    const stringProblems = this.stringValidationClass.report
    const numberProblems = this.numberValidationClass.report
    const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems)
    return problems
  }
}