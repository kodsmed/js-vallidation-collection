import { ValidationCollection } from '../src/ValidationCollection'
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
        expect((validationCollection.isArray as any)[method](testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        const argumentObject = { ...argument, shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => (validator.isArray as any)[method](testCase.input)).not.toThrowError();
        } else {
          expect(() => (validator.isArray as any)[method](testCase.input)).toThrowError();
        }
      });
    });
  })
}
const numberArrays = [
  [1],
  [1, 2],
  [1, 2, 3],
  [1 ,2, 3, 4]
]
const stringArrays = [
  ['a'],
  ['a', 'b'],
  ['a', 'b', 'c'],
  ['a', 'b', 'c', 'd']
]
const booleanArrays = [
  [true],
  [true, false],
  [true, true, true],
  [true, false, true, false]
]
const objectArrays = [
  [{}],
  [{}, {}],
  [{}, {}, {}],
  [{}, {}, {}, {}]
]
const arrayArrays = [
  [[]],
  [[], []],
  [[], [], []],
  [[], [], [], []]
]
const functionArrays = [
  [() => {}],
  [() => {}, () => {}],
  [() => {}, () => {}, () => {}],
  [() => {}, () => {}, () => {}, () => {}]
]
const dateArrays = [
  [new Date()],
  [new Date(), new Date()],
  [new Date(), new Date(), new Date()],
  [new Date(), new Date(), new Date(), new Date()]
]
const symbolArrays = [
  [Symbol('a')],
  [Symbol('a'), Symbol('b')],
  [Symbol('a'), Symbol('b'), Symbol('c')],
  [Symbol('a'), Symbol('b'), Symbol('c'), Symbol('d')]
]
const nonArrays = [
  {},
  {a:{},b:{}},
  {a:{},b:{},c:{}},
  {a:{},b:{},c:{},d:{}},
  'a',
  1,
  true,
  undefined,
  null,
  NaN,
  () => {}
]


describe('isArray Validators', () => {
  describe('isArray()', () => {
    const testCases: TestCase[] = [
    ];
    numberArrays.forEach(array => testCases.push({ input: array, expected: true }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: true }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: true }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: true }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: true }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: true }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: true }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: true }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))

    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${describeInput(testCase.input)}`, () => {
        const validationCollection = new ValidationCollection({});
        expect(validationCollection.isArray(testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        const argumentObject = { shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => validator.isArray(testCase.input)).not.toThrowError();
        } else {
          expect(() => validator.isArray(testCase.input)).toThrowError();
        }
      });
    });
  })
  describe('isArray.withMinimumLength()', () => {
    const minimumLengthValue = 3
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: array.length >= minimumLengthValue }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('withMinimumLength', testCases, { minimumLength: minimumLengthValue })
  })
  describe('isArray.withMaximumLength()', () => {
    const maximumLengthValue = 2
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: array.length <= maximumLengthValue }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('withMaximumLength', testCases, { maximumLength: maximumLengthValue })
  })
  describe('isArray.withExactLength()', () => {
    const exactLengthValue = 2
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: array.length === exactLengthValue }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('withExactLength', testCases, { exactLength: exactLengthValue })
  })
  describe('isArray.ofStrings()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: true }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofStrings', testCases, {})
  })
  describe('isArray.ofNumbers()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: true }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofNumbers', testCases, {})
  })
  describe('isArray.ofObjects()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: true }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: true })) // dates are objects
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofObjects', testCases, {})
  })
  describe('isArray.ofArrays()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: true }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofArrays', testCases, {})
  })
  describe('isArray.ofBooleans()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: true }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofBooleans', testCases, {})
  })
  describe('isArray.ofFunctions()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: true }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofFunctions', testCases, {})
  })
  describe('isArray.ofSymbols()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: true }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofSymbols', testCases, {})
  })
  describe('isArray.ofDates()', () => {
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: true }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('ofDates', testCases, {})
  })
  describe('isArray.thatMustHaveSanctionedValues()', () => {
    const whiteListedValues = [1, 2, 3]
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: array.every(item => whiteListedValues.includes(item)) }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    runValidationTests('thatMustHaveSanctionedValues', testCases, { validValues: whiteListedValues })

    const whiteListedValued2 = ['a', 'b', 'c']
    const testCases2: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases2.push({ input: array, expected: array.every(item => whiteListedValued2.includes(item)) }))
    booleanArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases2.push({ input: array, expected: false }))
    runValidationTests('thatMustHaveSanctionedValues', testCases2, { validValues: whiteListedValued2 })

    const whiteListedValues3 = [true]
    const testCases3: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCases3.push({ input: array, expected: array.every(item => whiteListedValues3.includes(item)) }))
    objectArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases3.push({ input: array, expected: false }))
    runValidationTests('thatMustHaveSanctionedValues', testCases3, { validValues: whiteListedValues3 })
  })
  describe('isArray.thatMustHaveSanctionedValueTypes()', () => {
    const whiteListedValueTypes = ['number', 'string']
    const testCases: TestCase[] = [
    ]
    numberArrays.forEach(array => testCases.push({ input: array, expected: true }))
    stringArrays.forEach(array => testCases.push({ input: array, expected: true }))
    booleanArrays.forEach(array => testCases.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCases.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCases.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCases.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCases.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCases.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCases.push({ input: array, expected: false }))
    testCases.push({ input: NaN, expected: false })
    testCases.push({ input: ['a',1,'b',2], expected: true })
    runValidationTests('thatMustHaveSanctionedValueTypes', testCases, { validValueTypes: whiteListedValueTypes })
  })
})
