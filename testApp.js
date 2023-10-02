import { ValidationCollection } from './ValidationCollection.ts'

const validationCollection = new ValidationCollection()

const result = validationCollection.isNumber('problem')

console.log (result) // false

console.log (validationCollection.reportAsString) // problem is not a number

console.log( validationCollection.hasProblems ) // true

console.log(validationCollection.clearProblems) // true

console.log( validationCollection.hasProblems ) // false