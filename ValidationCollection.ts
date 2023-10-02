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
 * @property {string} name - Name of the parameter that is being validated.
 * @property {boolean} shouldThrow - If true, the validation will throw an error if it fails.
 */

import {  ArgumentObject, ErroneousData, divisibleByArgument } from './lib/BaseValidationClass';
import { ArrayValidationClass } from './lib/ArrayValidationClass';
import { StringValidationClass } from './lib/StringValidationClass';
import { NumberValidationClass } from './lib/NumberValidationClass';
import { ObjectValidationClass } from './lib/ObjectValidationClass';
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject } from './interface/CallableObject';

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
          return  self.stringValidationClass.withMinimumLength(unknownData)
        }
      },
      {
        withMaximumLength(unknownData: unknown):boolean {
          return  self.stringValidationClass.withMaximumLength(unknownData)
        }
      },
      {
        withExactLength(unknownData: unknown):boolean {
          return  self.stringValidationClass.withExactLength(unknownData)
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
        thatEndsWith(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.thatEndsWith(unknownData, subString)
        }
      },
      {
        thatStartsWith(unknownData: unknown, subString: string) : boolean {
          return self.stringValidationClass.thatStartsWith(unknownData, subString)
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
        thatIsEvenlyDivisibleBy(argument: divisibleByArgument): boolean {
          return self.numberValidationClass.thatIsEvenlyDivisibleBy(argument)
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
      },
      {
        thatIsInstanceOf (unknownData: unknown, classType: any): boolean {
          return self.objectValidationClass.thatIsInstanceOf(unknownData, classType)
        }
      }
    )
    return callableObject
  }

  get isArray(): CallableArrayValidatorObject {
    const self = this
    const callableObject : CallableArrayValidatorObject = Object.assign(
      function (unknownData: unknown): boolean {
        return self.arrayValidationClass.type(unknownData)
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
      },
      {
        thatMustHaveSanctionedValues(unknownData: unknown):boolean {
          return self.arrayValidationClass.thatMustHaveSanctionedValues(unknownData)
        }
      },
      {
        thatMustHaveSanctionedValueTypes(unknownData: unknown):boolean {
          return self.arrayValidationClass.thatMustHaveSanctionedValueTypes(unknownData)
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

  get reportAsString() {
    const arrayProblems = this.arrayValidationClass.reportAsString
    const objectProblems = this.objectValidationClass.reportAsString
    const stringProblems = this.stringValidationClass.reportAsString
    const numberProblems = this.numberValidationClass.reportAsString
    const problems = arrayProblems + objectProblems + stringProblems + numberProblems
    return problems
  }

  clearProblems() {
    this.arrayValidationClass.clearProblems()
    this.objectValidationClass.clearProblems()
    this.stringValidationClass.clearProblems()
    this.numberValidationClass.clearProblems()
  }

  get hasProblems(): boolean {
    const problems = this.arrayValidationClass.hasProblems
    || this.objectValidationClass.hasProblems
    || this.stringValidationClass.hasProblems
    || this.numberValidationClass.hasProblems
    return problems
  }

  get shouldThrowErrors(): boolean {
    return this.arrayValidationClass.shouldThrowErrors
      || this.objectValidationClass.shouldThrowErrors
      || this.stringValidationClass.shouldThrowErrors
      || this.numberValidationClass.shouldThrowErrors
  }

  get rules() : ArgumentObject {
    return this.stringValidationClass.rules
  }
}