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
 * @property {Array} validProperties - Example ['width', 'height', 'color'].
 * @property {Array} validValues - Examples [1, 2, 3], ['red', 'green', 'blue']. Values can be of any type.
 * @property {Array} validValueTypes - Examples ['number', 'string', 'boolean']. Strings must be lowercase.
 * // these are the output properties, they are read-only and can only be accessed via getters (see below). They are empty if there are no errors, and does not reset automatically.
 * @property {Array} unexpectedProperties - An array of any properties of the object not included in validProperty[].
 * @property {Array} missingProperties -  Properties included in validProperty[] that are not present in the object.
 * @property {Array} unexpectedValues - An array of any values of the object not included in validValues[].
 * @property {Array} unexpectedValueTypes - An array of any value types of the object not included in validValueTypes[].
 * @property {Array} missingValues - An array of any values of the object that are not present in the object.
 * @property {string} typeThatFailed - Example: it expects a string but gets a number, then typeThatFailed = 'number'.
 * @property {number} faultyLength - Example: it expects an array with 3 elements but gets an array with 2, then faultyLength = 2.
 * @property {boolean} nullEncountered - true if null is encountered, otherwise false.
 * @property {boolean} undefinedEncountered - true if undefined is encountered, otherwise false.
 * @property {boolean} NaNEncountered - true if NaN is encountered, otherwise false.
 */

import {  ArgumentObject } from './lib/BaseValidationClass.js';
import { StringValidationClass } from './lib/StringValidationClass.js';
import { NumberValidationClass } from './lib/NumberValidationClass.js';
import { ObjectValidationClass } from './lib/ObjectValidationClass.js';
import { CallableValidatorObject } from './interface/CallableObject.js';

export class ValidationCollection {
  private stringValidationClass: StringValidationClass
  private numberValidationClass: NumberValidationClass
  private objectValidationClass: any

  constructor(argumentObject: ArgumentObject = {}) {
    this.stringValidationClass = new StringValidationClass(argumentObject)
    this.numberValidationClass = new NumberValidationClass(argumentObject)
    this.objectValidationClass = new ObjectValidationClass(argumentObject);
  }

  get isString(): CallableValidatorObject {
    const self = this
    const callableObject : CallableValidatorObject = Object.assign(
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
      }
    )
    return callableObject
  }

  get isNumber(): CallableValidatorObject {
    const self = this
    const callableObject : CallableValidatorObject = Object.assign(
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
      }
    )
    return callableObject
  }

  get isObject(): CallableValidatorObject {
    const self = this
    const callableObject : CallableValidatorObject = Object.assign(
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

  get isArray(): CallableValidatorObject {
    const self = this
    const callableObject : CallableValidatorObject = Object.assign(
      {}
    )
    return callableObject
  }

  get report() {
    throw new Error('TODO: implement report')
  }

/*

  isArray (unknownData) {
    let result = true
    if (unknownData === undefined || unknownData === null || !Array.isArray(unknownData)) {
      result = false
      this.typeThatFailed = typeof unknownData
    }
    return result
  }

  isArrayThatMustHaveMinLength (unknownData) {
    let result = this.isArray(unknownData)
    if (result && unknownData.length < this.minimumLength) {
      result = false
      this.faultyLength = unknownData.length
    }
    return result
  }

  isArrayThatMustHaveMaxLength (unknownData) {
    let result = this.isArray(unknownData)
    if (result && unknownData.length > this.maximumLength) {
      result = false
      this.faultyLength = unknownData.length
    }
    return result
  }

  isArrayThatMustHaveExactLength (unknownData) {
    let result = this.isArray(unknownData)
    if (result && unknownData.length !== this.exactLength) {
      result = false
      this.faultyLength = unknownData.length
    }
    return result
  }

  isArrayThatMustHaveMinAndMaxLength (unknownData) {
    let result = this.isArray(unknownData)
    if (result && (unknownData.length < this.minimumLength || unknownData.length > this.maximumLength)) {
      result = false
      this.faultyLength = unknownData.length
    }
    return result
  }

  isObjectThatMustHaveSanctionedValues (unknownData) {
    let result = this.isAnObject(unknownData)
    if (result) {
      const values = Object.values(unknownData)
      const unexpectedValues = []
      for (const value of values) {
        if (!this.validValues.includes(value)) {
          unexpectedValues.push(value)
          result = false
        }
      }
      if (unexpectedValues.length > 0) {
        this.unexpectedValues = unexpectedValues
      }
    }
    return result
  }

  isAnObjectThatMustHaveValueType(unknownData) {
    let result = this.isAnObject(unknownData)
    if (result) {
      const values = Object.values(unknownData)
      const unexpectedValueTypes = []
      for (const value of values) {
        if (!this.validValueTypes.includes(typeof value)) {
          unexpectedValueTypes.push(value)
          result = false
        }
      }
      if (unexpectedValueTypes.length > 0) {
        this.unexpectedValues = unexpectedValueTypes
      }
    }
    return result
  }


  isArrayOfNumbers (unknownData) {
    let result = this.isArray(unknownData)
    if (result) {
      for (const value of unknownData) {
        if (typeof value !== 'number' || isNaN(value)) {
          result = false
          this.typeThatFailed = typeof value
        }
      }
    }
    return result
  }

  isArrayOfObjects (unknownData) {
    let result = this.isArray(unknownData)
    if (result) {
      for (const element of unknownData) {
        if (typeof element !== 'object' || Array.isArray(element)) {
          result = false
          this.typeThatFailed = typeof element
        }
      }
    }
    return result
  }

  isOfValidValueType (unknownData) {
    let result = true
    if (!this.validValueTypes.includes(typeof unknownData)) {
      result = false
      this.typeThatFailed = typeof unknownData
    }
    return result
  }

  isInstanceOf (unknownData, classType) {
    let result = this.isAnObject(unknownData)
    if (!(unknownData instanceof classType)) {
      result = false
      this.typeThatFailed = typeof unknownData
    }
    return result
  }
}
  */
}