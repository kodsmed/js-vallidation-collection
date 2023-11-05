/**
 * ValidationCollection, a collection of Validation objects that can be used to validate the parameters of a function.
 * Contains a collection of methods that can be used to for validation.
 *
 * @module ValidationCollection
 * @version 2.0.0
 * @author Jimmy "Kodsmed" Karlsson
 *
 * @property {string} name - Name of the parameter that is being validated.
 * @property {boolean} shouldThrow - If true, the validation will throw an error if it fails.
 */

import { ErroneousData } from './lib/BaseValidationClass.js';
import { ArrayValidationClass } from './lib/ArrayValidationClass.js';
import { StringValidationClass } from './lib/StringValidationClass.js';
import { NumberValidationClass } from './lib/NumberValidationClass.js';
import { ObjectValidationClass } from './lib/ObjectValidationClass.js';
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject, Callable } from './interface/CallableObject.js';

export class ValidationCollection {
  private static throwErrors: boolean = false
  private static stringValidationClass: StringValidationClass = new StringValidationClass()
  private static numberValidationClass: NumberValidationClass = new NumberValidationClass()
  private static objectValidationClass: ObjectValidationClass = new ObjectValidationClass()
  private static arrayValidationClass: ArrayValidationClass = new ArrayValidationClass()

  constructor(unknownData: unknown = undefined) {
    ValidationCollection.stringValidationClass.data = unknownData
    ValidationCollection.numberValidationClass.data = unknownData
    ValidationCollection.objectValidationClass.data = unknownData
    ValidationCollection.arrayValidationClass.data = unknownData
  }

  static createInstance(unknownData: unknown = undefined): ValidationCollection {
    return new ValidationCollection(unknownData)
  }

  static setThrowsErrors(shouldThrow: boolean) {
    ValidationCollection.throwErrors = shouldThrow
    ValidationCollection.stringValidationClass.shouldThrowErrors = shouldThrow
    ValidationCollection.numberValidationClass.shouldThrowErrors = shouldThrow
    ValidationCollection.objectValidationClass.shouldThrowErrors = shouldThrow
    ValidationCollection.arrayValidationClass.shouldThrowErrors = shouldThrow
  }

  static setName(name: string) {
    ValidationCollection.stringValidationClass.dataName = name
    ValidationCollection.numberValidationClass.dataName = name
    ValidationCollection.objectValidationClass.dataName = name
    ValidationCollection.arrayValidationClass.dataName = name
  }


  isString(): CallableStringValidatorObject {
    const self = ValidationCollection
    const callableObject: CallableStringValidatorObject = Object.assign(
      function (): CallableStringValidatorObject {
        self.stringValidationClass.type()
        return callableObject
      },
      {
        withMinimumLength(minimumLength: number): CallableStringValidatorObject {
          self.stringValidationClass.withMinimumLength(minimumLength)
          return callableObject
        }
      },
      {
        withMaximumLength(maximumLength: number): CallableStringValidatorObject {
          self.stringValidationClass.withMaximumLength(maximumLength)
          return callableObject
        }
      },
      {
        withExactLength(exactLength: number): CallableStringValidatorObject {
          self.stringValidationClass.withExactLength(exactLength)
          return callableObject
        }
      },
      {
        thatIncludes(subString: string): CallableStringValidatorObject {
          self.stringValidationClass.thatIncludes(subString)
          return callableObject
        }
      },
      {
        thatDoesNotIncludes(subString: string): CallableStringValidatorObject {
          self.stringValidationClass.thatDoesNotIncludes(subString)
          return callableObject
        }
      },
      {
        thatIsInCapitalLetters(): CallableStringValidatorObject {
          self.stringValidationClass.thatIsInCapitalLetters()
          return callableObject
        }
      },
      {
        thatIsInSmallLetters(): CallableStringValidatorObject {
          self.stringValidationClass.thatIsInSmallLetters()
          return callableObject
        }
      },
      {
        firstLetterIsCapital(): CallableStringValidatorObject {
          self.stringValidationClass.firstLetterIsCapital()
          return callableObject
        }
      },
      {
        thatEndsWith(subString: string): CallableStringValidatorObject {
          self.stringValidationClass.thatEndsWith(subString)
          return callableObject
        }
      },
      {
        thatStartsWith(subString: string): CallableStringValidatorObject {
          self.stringValidationClass.thatStartsWith(subString)
          return callableObject
        }
      },
      {
        thatIsAnEmail(): CallableStringValidatorObject {
          self.stringValidationClass.thatIsAnEmail()
          return callableObject
        }
      },
      {
        thatIsAUrl(): CallableStringValidatorObject {
          self.stringValidationClass.thatIsAUrl()
          return callableObject
        }
      },
      {
        confirm(): boolean {
          const problemsEncountered =
            self.arrayValidationClass.hasProblems
            || self.objectValidationClass.hasProblems
            || self.stringValidationClass.hasProblems
            || self.numberValidationClass.hasProblems
          if (problemsEncountered) {
            if (self.throwsErrors) {
              throw new Error(self.reportAsString())
            }
            return false
          }
          return true
        }
      }
    )
    return callableObject
  }

  isNumber(): CallableNumberValidatorObject {
    const self = ValidationCollection
    const callableObject: CallableNumberValidatorObject = Object.assign(
      function (): CallableNumberValidatorObject {
        self.numberValidationClass.type()
        return callableObject
      },
      {
        thatIsPositive(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsPositive()
          return callableObject
        }
      },
      {
        thatIsNegative(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsNegative()
          return callableObject
        }
      },
      {
        thatIsBetweenMinMax(min: number, max: number): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsBetweenMinMax(min, max)
          return callableObject
        }
      },
      {
        thatIsOverMinimum(minimumValue: number): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsOverMinimum(minimumValue)
          return callableObject
        }
      },
      {
        thatIsUnderMaximum(maximumValue: number): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsUnderMaximum(maximumValue)
          return callableObject
        }
      },
      {
        thatIsExactly(exactValue: number): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsExactly(exactValue)
          return callableObject
        }
      },
      {
        thatIsEven(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsEven()
          return callableObject
        }
      },
      {
        thatIsOdd(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsOdd()
          return callableObject
        }
      },
      {
        thatIsNotZero(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsNotZero()
          return callableObject
        }
      },
      {
        thatIsNotOne(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsNotOne()
          return callableObject
        }
      },
      {
        thatIsNotNegativeOne(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsNotNegativeOne()
          return callableObject
        }
      },
      {
        thatIsEvenlyDivisible(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsEvenlyDivisible()
          return callableObject
        }
      },
      {
        thatIsEvenlyDivisibleBy(number: number): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsEvenlyDivisibleBy(number)
          return callableObject
        }
      },
      {
        thatIsAPrimeNumber(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsAPrimeNumber()
          return callableObject
        }
      },
      {
        thatIsNotAPrimeNumber(): CallableNumberValidatorObject {
          self.numberValidationClass.thatIsNotAPrimeNumber()
          return callableObject
        }
      },
      {
        confirm(): boolean {
          const problemsEncountered =
            self.arrayValidationClass.hasProblems
            || self.objectValidationClass.hasProblems
            || self.stringValidationClass.hasProblems
            || self.numberValidationClass.hasProblems
          if (problemsEncountered) {
            if (self.throwsErrors) {
              throw new Error(self.reportAsString())
            }
            return false
          }
          return true
        }
      }
    )
    return callableObject
  }

  isObject(): CallableObjectValidatorObject {
    const self = ValidationCollection
    const callableObject: CallableObjectValidatorObject = Object.assign(
      function (): CallableObjectValidatorObject {
        self.objectValidationClass.type()
        return callableObject
      },
      {
        withMinimumLength(minimumLength: number): CallableObjectValidatorObject {
          self.objectValidationClass.withMinimumLength(minimumLength)
          return callableObject
        }
      },
      {
        withMaximumLength(maximumLength: number): CallableObjectValidatorObject {
          self.objectValidationClass.withMaximumLength(maximumLength)
          return callableObject
        }
      },
      {
        withExactLength(exactLength: number): CallableObjectValidatorObject {
          self.objectValidationClass.withExactLength(exactLength)
          return callableObject
        }
      },
      {
        thatMayHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject {
          self.objectValidationClass.thatMayHaveProperties(propertyNames)
          return callableObject
        }
      },
      {
        thatMustHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject {
          self.objectValidationClass.thatMustHaveProperties(propertyNames)
          return callableObject
        }
      },
      {
        thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableObjectValidatorObject {
          self.objectValidationClass.thatMustHaveSanctionedValues(sanctionedValues)
          return callableObject
        }
      },
      {
        thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableObjectValidatorObject {
          self.objectValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes)
          return callableObject
        }
      },
      {
        thatIsInstanceOf(classType: any): CallableObjectValidatorObject {
          self.objectValidationClass.thatIsInstanceOf(classType)
          return callableObject
        }
      },
      {
        confirm(): boolean {
          const problemsEncountered =
            self.arrayValidationClass.hasProblems
            || self.objectValidationClass.hasProblems
            || self.stringValidationClass.hasProblems
            || self.numberValidationClass.hasProblems
          if (problemsEncountered) {
            if (self.throwsErrors) {
              throw new Error(self.reportAsString())
            }
            return false
          }
          return true
        }
      }
    )
    return callableObject
  }

  isArray(): CallableArrayValidatorObject {
    const self = ValidationCollection
    const callableObject: CallableArrayValidatorObject = Object.assign(
      function (): CallableArrayValidatorObject {
        self.arrayValidationClass.type()
        return callableObject
      },
      {
        withMinimumLength(minimumLength: number): CallableArrayValidatorObject {
          self.arrayValidationClass.withMinimumLength(minimumLength)
          return callableObject
        }
      },
      {
        withMaximumLength(maximumLength: number): CallableArrayValidatorObject {
          self.arrayValidationClass.withMaximumLength(maximumLength)
          return callableObject
        }
      },
      {
        withExactLength(exactLength: number): CallableArrayValidatorObject {
          self.arrayValidationClass.withExactLength(exactLength)
          return callableObject
        }
      },
      {
        ofStrings(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofStrings()
          return callableObject
        }
      },
      {
        ofNumbers(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofNumbers()
          return callableObject
        }
      },
      {
        ofObjects(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofObjects()
          return callableObject
        }
      },
      {
        ofArrays(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofArrays()
          return callableObject
        }
      },
      {
        ofBooleans(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofBooleans()
          return callableObject
        }
      },
      {
        ofFunctions(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofFunctions()
          return callableObject
        }
      },
      {
        ofSymbols(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofSymbols()
          return callableObject
        }
      },
      {
        ofDates(): CallableArrayValidatorObject {
          self.arrayValidationClass.ofDates()
          return callableObject
        }
      },
      {
        thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableArrayValidatorObject {
          self.arrayValidationClass.thatMustHaveSanctionedValues(sanctionedValues)
          return callableObject
        }
      },
      {
        thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableArrayValidatorObject {
          self.arrayValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes)
          return callableObject
        }
      },
      {
        confirm(): boolean {
          const problemsEncountered =
            self.arrayValidationClass.hasProblems
            || self.objectValidationClass.hasProblems
            || self.stringValidationClass.hasProblems
            || self.numberValidationClass.hasProblems
          if (problemsEncountered) {
            if (self.throwsErrors) {
              throw new Error(self.reportAsString())
            }
            return false
          }
          return true
        }
      }
    )
    return callableObject
  }

  static report(): Array<ErroneousData> {
    const arrayProblems = this.arrayValidationClass.report
    const objectProblems = this.objectValidationClass.report
    const stringProblems = this.stringValidationClass.report
    const numberProblems = this.numberValidationClass.report
    const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems)
    return problems
  }

  static reportAsString(): string {
    const arrayProblems = this.arrayValidationClass.reportAsString
    const objectProblems = this.objectValidationClass.reportAsString
    const stringProblems = this.stringValidationClass.reportAsString
    const numberProblems = this.numberValidationClass.reportAsString
    const problems = arrayProblems + objectProblems + stringProblems + numberProblems
    return problems
  }

  static clearProblems(): void {
    this.arrayValidationClass.clearProblems()
    this.objectValidationClass.clearProblems()
    this.stringValidationClass.clearProblems()
    this.numberValidationClass.clearProblems()
  }

  hasProblems(): boolean {
    const problems = ValidationCollection.arrayValidationClass.hasProblems
      || ValidationCollection.objectValidationClass.hasProblems
      || ValidationCollection.stringValidationClass.hasProblems
      || ValidationCollection.numberValidationClass.hasProblems
    return problems
  }

  static get throwsErrors(): boolean {
    return ValidationCollection.throwErrors
  }
}

