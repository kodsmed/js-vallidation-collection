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
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject } from './interface/CallableObject.js';

export default class ValidationCollection {
  private stringValidationClass: StringValidationClass = new StringValidationClass()
  private numberValidationClass: NumberValidationClass = new NumberValidationClass()
  private objectValidationClass: ObjectValidationClass = new ObjectValidationClass()
  private arrayValidationClass: ArrayValidationClass = new ArrayValidationClass()

  constructor(unknownData: unknown) {
    this.stringValidationClass.data = unknownData
    this.numberValidationClass.data = unknownData
    this.objectValidationClass.data = unknownData
    this.arrayValidationClass.data = unknownData
  }

  set throwsErrors(shouldThrow: boolean) {
    this.stringValidationClass.shouldThrowErrors = shouldThrow
    this.numberValidationClass.shouldThrowErrors = shouldThrow
    this.objectValidationClass.shouldThrowErrors = shouldThrow
    this.arrayValidationClass.shouldThrowErrors = shouldThrow
  }

  setName(name: string) {
    this.stringValidationClass.dataName = name
    this.numberValidationClass.dataName = name
    this.objectValidationClass.dataName = name
    this.arrayValidationClass.dataName = name
  }


  get isString(): CallableStringValidatorObject {
    const self = this
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
      }
    )
    return callableObject
  }

  get isNumber(): CallableNumberValidatorObject {
    const self = this
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
      }
    )
    return callableObject
  }

  get isObject(): CallableObjectValidatorObject {
    const self = this
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
      }
    )
    return callableObject
  }

  get isArray(): CallableArrayValidatorObject {
    const self = this
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
      }
    )
    return callableObject
  }

  get report(): Array<ErroneousData> {
    const arrayProblems = this.arrayValidationClass.report
    const objectProblems = this.objectValidationClass.report
    const stringProblems = this.stringValidationClass.report
    const numberProblems = this.numberValidationClass.report
    const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems)
    return problems
  }

  get reportAsString(): string {
    const arrayProblems = this.arrayValidationClass.reportAsString
    const objectProblems = this.objectValidationClass.reportAsString
    const stringProblems = this.stringValidationClass.reportAsString
    const numberProblems = this.numberValidationClass.reportAsString
    const problems = arrayProblems + objectProblems + stringProblems + numberProblems
    return problems
  }

  clearProblems(): void {
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

  get throwsErrors(): boolean {
    return this.arrayValidationClass.shouldThrowErrors
      || this.objectValidationClass.shouldThrowErrors
      || this.stringValidationClass.shouldThrowErrors
      || this.numberValidationClass.shouldThrowErrors
  }

  confirm(): boolean {
    const problemsEncountered =
      this.arrayValidationClass.hasProblems
      || this.objectValidationClass.hasProblems
      || this.stringValidationClass.hasProblems
      || this.numberValidationClass.hasProblems

    if (problemsEncountered) {
      if (this.throwsErrors) {
        throw new Error(this.reportAsString)
      }
      return false
    }
    return true
  }
}
