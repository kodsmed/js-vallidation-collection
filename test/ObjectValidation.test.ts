import  ValidationCollection  from '../src/ValidationCollection'
import { ArgumentObject } from '../src/lib/BaseValidationClass'

type TestCase = { input: unknown, expected: boolean }

const describeInput = (input: unknown): string => {
  if (Array.isArray(input)) return 'array';
  if (typeof input === "object") {
      if (input === null) return 'null';
      return 'object';
  }
  if (typeof input === "function") return 'function';
  if (typeof input === "symbol") return 'symbol';
  if (typeof input === "undefined") return 'undefined';
  if (Number.isNaN(input)) return 'NaN';
  return input.toString();
}

function runValidationTests (method: string, testCases: Array<{ input: unknown, expected: boolean }>, argument: ArgumentObject)  {
  describe(`${method} validator`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${describeInput(testCase.input)}`, () => {
        const validationCollection = new ValidationCollection(argument);
        expect((validationCollection.isObject as any)[method](testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        const argumentObject = { ...argument, shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => (validator.isObject as any)[method](testCase.input)).not.toThrowError();
        } else {
          expect(() => (validator.isObject as any)[method](testCase.input)).toThrowError();
        }
      });
    });
  })
}
function runInstanceValidationTests (method: string, testCases: Array<{ input: unknown, expected: boolean }>, instance:any, argument: ArgumentObject)  {
  describe(`${method} validator`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${describeInput(testCase.input)}`, () => {
        const validationCollection = new ValidationCollection(argument);
        expect((validationCollection.isObject as any)[method](testCase.input, instance)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        const argumentObject = { ...argument, shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => (validator.isObject as any)[method](testCase.input, instance)).not.toThrowError();
        } else {
          expect(() => (validator.isObject as any)[method](testCase.input, instance)).toThrowError();
        }
      });
    });
  })
}
const stringsArray=[
  '',
  'a',
  'ab',
  'abc',
  'abcd',
]
const numbersArray=[
  0,
  10,
  200,
  3000,
  40000,
]
const objectsArray=[
  {},
  { a: 1 },
  { a: 1, b: 2 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3, d: 4 },
]
const arraysArray=[
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
]
const booleansArray=[
  true,
  false,
]
const symbolsArray=[
  Symbol(),
  Symbol('a'),
  Symbol('ab'),
  Symbol('abc'),
  Symbol('abcd'),
]
const nonValidValuesArray=[
  null,
  undefined,
  NaN,
  () => {},
]


describe('isObject Validators', () => {
  describe('isObject()', () => {
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    objectsArray.forEach(object => testCases.push({ input: object, expected: true }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))

    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${describeInput(testCase.input)}`, () => {
        const validationCollection = new ValidationCollection({});
        expect(validationCollection.isObject(testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        const argumentObject = { shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => validator.isObject(testCase.input)).not.toThrowError();
        } else {
          expect(() => validator.isObject(testCase.input)).toThrowError();
        }
      });
    });
  })
  describe('isObject.withMinimumLength()', () => {
    const minimumLengthValue = 2
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: false })
    testCases.push({ input: { a: 1 }, expected: false })
    testCases.push({ input: { a: 1, b: 2 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: true })

    runValidationTests('withMinimumLength', testCases, { minimumLength: minimumLengthValue })
  })
  describe('isObject.withMaximumLength()', () => {
    const maximumLengthValue = 2
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: true })
    testCases.push({ input: { a: 1 }, expected: true })
    testCases.push({ input: { a: 1, b: 2 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: false })

    runValidationTests('withMaximumLength', testCases, { maximumLength: maximumLengthValue })
  })
  describe('isObject.withExactLength()', () => {
    const exactLengthValue = 2
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: false })
    testCases.push({ input: { a: 1 }, expected: false })
    testCases.push({ input: { a: 1, b: 2 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: false })

    runValidationTests('withExactLength', testCases, { exactLength: exactLengthValue })
  })
  describe('isObject.thatMayHaveProperties()', () => {
    const validPropertiesValue = ['a', 'b']
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: true })
    testCases.push({ input: { a: 1 }, expected: true })
    testCases.push({ input: { a: 1, b: 2 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: false })

    runValidationTests('thatMayHaveProperties', testCases, { validProperties: validPropertiesValue })
  })
  describe('isObject.thatMustHaveProperties()', () => {
    const validPropertiesValue = ['a', 'b']
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: false })
    testCases.push({ input: { a: 1 }, expected: false })
    testCases.push({ input: { a: 1, b: 2 }, expected: true })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: false })

    runValidationTests('thatMustHaveProperties', testCases, { validProperties: validPropertiesValue })
  })
  describe('isObject.thatMustHaveSanctionedValues()', () => {
    const validValuesValue = ['a', 'b', 3]
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    testCases.push({ input: {}, expected: true })
    testCases.push({ input: { a: 1 }, expected: false })
    testCases.push({ input: { a: 1, b: 2 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3 }, expected: false })
    testCases.push({ input: { a: 1, b: 2, c: 3, d: 4 }, expected: false })
    testCases.push({ input: { a: 'a', b: 'b' }, expected: true })
    testCases.push({ input: { a: 'a', b: 'b', c: 'c' }, expected: false })
    testCases.push({ input: { a: 'a' }, expected: true })
    testCases.push({ input: { a: 'b' }, expected: true })
    testCases.push({ input: { a: 'c' }, expected: false })
    testCases.push({ input: { b: 'a' }, expected: true })
    testCases.push({ input: { b: 'b' }, expected: true })
    testCases.push({ input: { b: 'c' }, expected: false })
    testCases.push({ input: { c: 'c' }, expected: false })
    testCases.push({ input: { c: 'a' }, expected: true })
    testCases.push({ input: { c: 'b', d: 'a' }, expected: true })
    testCases.push({ input: { a: 'a', b: 'a' }, expected: true })
    testCases.push({ input: { a: 'b', b: 'b' }, expected: true })
    testCases.push({ input: { a: 'c', b: 'c' }, expected: false })
    testCases.push({ input: { a: 'a', b: 'b', c: 3 }, expected: true })

    runValidationTests('thatMustHaveSanctionedValues', testCases, { validValues: validValuesValue })
  })
describe('isObject.thatMustHaveSanctionedValueTypes()', () => {
  const validValueTypes = ['string', 'array']
  const possibleValues = ['a', 'b', [], 1, 2, 3, {}, { a: 1 }, { a: 1, b: 2 }, null, undefined, NaN, true, false, Symbol(), Symbol('a'), Symbol('ab'), Symbol('abc'), Symbol('abcd')]
  const testCases: Array<TestCase> = []
  stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
  numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
  arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
  booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
  symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
  nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
  for (let i = 0; i < possibleValues.length; i++) {
    for (let j = 0; j < possibleValues.length; j++) {
      const input = { a: possibleValues[i], b: possibleValues[j] }
      const expected = validValueTypes.includes(typeof possibleValues[i]) && validValueTypes.includes(typeof possibleValues[j])
      testCases.push({ input, expected })
    }
  }
  runValidationTests('thatMustHaveSanctionedValueTypes', testCases, { validValueTypes })
  })
  describe('isObject.thatIsInstanceOf()', () => {
    const testCases: Array<TestCase> = []
    stringsArray.forEach(string => testCases.push({ input: string, expected: false }))
    numbersArray.forEach(number => testCases.push({ input: number, expected: false }))
    arraysArray.forEach(array => testCases.push({ input: array, expected: false }))
    booleansArray.forEach(boolean => testCases.push({ input: boolean, expected: false }))
    symbolsArray.forEach(symbol => testCases.push({ input: symbol, expected: false }))
    nonValidValuesArray.forEach(nonValid => testCases.push({ input: nonValid, expected: false }))
    objectsArray.forEach(object => testCases.push({ input: object, expected: true }))
    testCases.push({ input: {}, expected: true })
    runInstanceValidationTests('thatIsInstanceOf', testCases, Object, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Error(), expected: true}], Error, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Error(), expected: true}], Object, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Array(), expected: false}], Object, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Array(), expected: false}], Array, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Date(), expected: true}], Date,  {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Date(), expected: true}], Object, {})
    runInstanceValidationTests('thatIsInstanceOf', [{input: new Date(), expected: false}], Array, {})

  })
})
