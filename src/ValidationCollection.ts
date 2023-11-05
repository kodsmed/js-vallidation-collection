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

export default function ValidationCollection () {
  const stringValidationClass: StringValidationClass = new StringValidationClass()
  const numberValidationClass: NumberValidationClass = new NumberValidationClass()
  const objectValidationClass: ObjectValidationClass = new ObjectValidationClass()
  const arrayValidationClass: ArrayValidationClass = new ArrayValidationClass()

  const callableFunction = function (unknownData: unknown): boolean {
    if (unknownData === undefined || unknownData === null) {
      return false
    }
    stringValidationClass.data = unknownData
    numberValidationClass.data = unknownData
    objectValidationClass.data = unknownData
    arrayValidationClass.data = unknownData
    return true
  }

  callableFunction.setThrowsErrors = function (shouldThrow: boolean) {
    stringValidationClass.shouldThrowErrors = shouldThrow
    numberValidationClass.shouldThrowErrors = shouldThrow
    objectValidationClass.shouldThrowErrors = shouldThrow
    arrayValidationClass.shouldThrowErrors = shouldThrow
  }

  callableFunction.name = function (name: string) {
    stringValidationClass.dataName = name
    numberValidationClass.dataName = name
    objectValidationClass.dataName = name
    arrayValidationClass.dataName = name
  }


  callableFunction.isString = function (): CallableStringValidatorObject {
    const callableObject : CallableStringValidatorObject = Object.assign(
      function (): boolean {
        return stringValidationClass.type()
      },
      {
        withMinimumLength(minimumLength: number):boolean {
          return  stringValidationClass.withMinimumLength(minimumLength)
        }
      },
      {
        withMaximumLength(maximumLength: number):boolean {
          return  stringValidationClass.withMaximumLength(maximumLength)
        }
      },
      {
        withExactLength(exactLength: number):boolean {
          return  stringValidationClass.withExactLength(exactLength)
        }
      },
      {
        thatIncludes(subString: string) : boolean {
          return stringValidationClass.thatIncludes(subString)
        }
      },
      {
        thatDoesNotIncludes(subString: string) : boolean {
          return stringValidationClass.thatDoesNotIncludes(subString)
        }
      },
      {
        thatIsInCapitalLetters() : boolean {
          return stringValidationClass.thatIsInCapitalLetters()
        }
      },
      {
        thatIsInSmallLetters() : boolean {
          return stringValidationClass.thatIsInSmallLetters()
        }
      },
      {
        firstLetterIsCapital() : boolean {
          return stringValidationClass.firstLetterIsCapital()
        }
      },
      {
        thatEndsWith(subString: string) : boolean {
          return stringValidationClass.thatEndsWith(subString)
        }
      },
      {
        thatStartsWith(subString: string) : boolean {
          return stringValidationClass.thatStartsWith(subString)
        }
      },
      {
        thatIsAnEmail() : boolean {
          return stringValidationClass.thatIsAnEmail()
        }
      },
      {
        thatIsAUrl() : boolean {
          return stringValidationClass.thatIsAUrl()
        }
      }
    )
    return callableObject
  }

  callableFunction.isNumber = function(): CallableNumberValidatorObject {
    const callableObject : CallableNumberValidatorObject = Object.assign(
      function (): boolean {
        const result = numberValidationClass.type()
        return result
      },
      {
        thatIsPositive(): CallableNumberValidatorObject | boolean {
          const result = numberValidationClass.thatIsPositive()
          return result ? callableObject : false
        }
      },
      {
        thatIsNegative(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsNegative()
        }
      },
      {
        thatIsBetweenMinMax(min: number, max: number): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsBetweenMinMax(min, max)
        }
      },
      {
        thatIsOverMinimum(minimumValue: number): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsOverMinimum(minimumValue)
        }
      },
      {
        thatIsUnderMaximum(maximumValue: number): CallableNumberValidatorObject | boolean {
         return numberValidationClass.thatIsUnderMaximum(maximumValue)
        }
      },
      {
        thatIsExactly(exactValue: number): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsExactly(exactValue)
        }
      },
      {
        thatIsEven(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsEven()
        }
      },
      {
        thatIsOdd(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsOdd()
        }
      },
      {
        thatIsNotZero(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsNotZero()
        }
      },
      {
        thatIsNotOne(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsNotOne()
        }
      },
      {
        thatIsNotNegativeOne(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsNotNegativeOne()
        }
      },
      {
        thatIsEvenlyDivisible(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsEvenlyDivisible()
        }
      },
      {
        thatIsEvenlyDivisibleBy(number: number): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsEvenlyDivisibleBy(number)
        }
      },
      {
        thatIsAPrimeNumber(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsAPrimeNumber()
        }
      },
      {
        thatIsNotAPrimeNumber(): CallableNumberValidatorObject | boolean {
          return numberValidationClass.thatIsNotAPrimeNumber()
        }
      }
    )
    return callableObject
  }

  callableFunction.isObject = function (): CallableObjectValidatorObject {
    const callableObject : CallableObjectValidatorObject = Object.assign(
      function (): boolean {
        return objectValidationClass.type()
      },
      {
        withMinimumLength(minimumLength: number): CallableObjectValidatorObject | boolean {
          return objectValidationClass.withMinimumLength(minimumLength)
        }
      },
      {
        withMaximumLength(maximumLength: number): CallableObjectValidatorObject | boolean {
          return objectValidationClass.withMaximumLength(maximumLength)
        }
      },
      {
        withExactLength(exactLength: number): CallableObjectValidatorObject | boolean {
          return objectValidationClass.withExactLength(exactLength)
        }
      },
      {
        thatMayHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject | boolean {
          return objectValidationClass.thatMayHaveProperties(propertyNames)
        }
      },
      {
        thatMustHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject | boolean {
          return objectValidationClass.thatMustHaveProperties(propertyNames)
        }
      },
      {
        thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableObjectValidatorObject | boolean {
          return objectValidationClass.thatMustHaveSanctionedValues(sanctionedValues)
        }
      },
      {
        thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableObjectValidatorObject | boolean {
          return objectValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes)
        }
      },
      {
        thatIsInstanceOf (classType: any): CallableObjectValidatorObject | boolean {
          return objectValidationClass.thatIsInstanceOf(classType)
        }
      }
    )
    return callableObject
  }

  callableFunction.isArray = function(): CallableArrayValidatorObject {
    const callableObject : CallableArrayValidatorObject = Object.assign(
      function (): boolean {
        return arrayValidationClass.type()
      },
      {
        withMinimumLength(minimumLength: number): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.withMinimumLength(minimumLength)
        }
      },
      {
        withMaximumLength(maximumLength: number): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.withMaximumLength(maximumLength)
        }
      },
      {
        withExactLength(exactLength: number): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.withExactLength(exactLength)
        }
      },
      {
        ofStrings(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofStrings()
        }
      },
      {
        ofNumbers(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofNumbers()
        }
      },
      {
        ofObjects(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofObjects()
        }
      },
      {
        ofArrays(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofArrays()
        }
      },
      {
        ofBooleans(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofBooleans()
        }
      },
      {
        ofFunctions(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofFunctions()
        }
      },
      {
        ofSymbols(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofSymbols()
        }
      },
      {
        ofDates(): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.ofDates()
        }
      },
      {
        thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.thatMustHaveSanctionedValues(sanctionedValues)
        }
      },
      {
        thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableArrayValidatorObject | boolean {
          return arrayValidationClass.thatMustHaveSanctionedValueTypes(sanctionedTypes)
        }
      }
    )
    return callableObject
  }

  callableFunction.report = function (): Array<ErroneousData> {
    const arrayProblems = arrayValidationClass.report
    const objectProblems = objectValidationClass.report
    const stringProblems = stringValidationClass.report
    const numberProblems = numberValidationClass.report
    const problems = arrayProblems.concat(objectProblems, stringProblems, numberProblems)
    return problems
  }

  callableFunction.reportAsString = function (): string {
    const arrayProblems = arrayValidationClass.reportAsString
    const objectProblems = objectValidationClass.reportAsString
    const stringProblems = stringValidationClass.reportAsString
    const numberProblems = numberValidationClass.reportAsString
    const problems = arrayProblems + objectProblems + stringProblems + numberProblems
    return problems
  }

  callableFunction.clearProblems = function():void {
    arrayValidationClass.clearProblems()
    objectValidationClass.clearProblems()
    stringValidationClass.clearProblems()
    numberValidationClass.clearProblems()
  }

  callableFunction.hasProblems = function(): boolean {
    const problems = arrayValidationClass.hasProblems
    || objectValidationClass.hasProblems
    || stringValidationClass.hasProblems
    || numberValidationClass.hasProblems
    return problems
  }

  callableFunction.throwsErrors = function(): boolean {
    return arrayValidationClass.shouldThrowErrors
      || objectValidationClass.shouldThrowErrors
      || stringValidationClass.shouldThrowErrors
      || numberValidationClass.shouldThrowErrors
  }

  callableFunction._handleValidationFailure = function(): void {
    if (callableFunction.throwsErrors()) {
      throw new Error(callableFunction.reportAsString())
    }
  }
}
