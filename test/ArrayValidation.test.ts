import  validate from '../src/validate'


type TestCase = { input: unknown, expected: boolean }

afterEach(() => {
  validate.clearReports();
  validate.setThrowable(false);
});

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

function runValidationTests (description: string, validatorFunction: (input: any) => any, testCases: TestCase[])  {
  describe(`isArray.${description}`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${describeInput(testCase.input)}`, () => {
        expect(validatorFunction(testCase.input).confirm()).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validatorFunction(testCase.input)).not.toThrowError();
        } else {
          expect(() => validatorFunction(testCase.input)).toThrowError();
        }
        validate.clearReports();
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
        expect(validate(testCase.input).isArray().confirm()).toBe(testCase.expected);
        validate.clearReports();
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${describeInput(testCase.input)} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validate(testCase.input).isArray()).not.toThrowError();
        } else {
          expect(() => validate(testCase.input).isArray()).toThrowError();
        }
        validate.clearReports();
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

    const validatorFunction = (input: any) => validate(input).isArray().withMinimumLength(minimumLengthValue);
    runValidationTests('withMinimumLength', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().withMaximumLength(maximumLengthValue);
    runValidationTests('withMaximumLength', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().withExactLength(exactLengthValue);
    runValidationTests('withExactLength', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofStrings();
    runValidationTests('ofStrings', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofNumbers();
    runValidationTests('ofNumbers', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofObjects();
    runValidationTests('ofObjects', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofArrays();
    runValidationTests('ofArrays', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofBooleans();
    runValidationTests('ofBooleans', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofFunctions();
    runValidationTests('ofFunctions', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofSymbols();
    runValidationTests('ofSymbols', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().ofDates();
    runValidationTests('ofDates', validatorFunction, testCases)
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

    const validatorFunction = (input: any) => validate(input).isArray().thatMustHaveSanctionedValues(whiteListedValues);
    runValidationTests('thatMustHaveSanctionedValues', validatorFunction, testCases)
    const validatorFunction2 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValues(whiteListedValued2);
    runValidationTests('thatMustHaveSanctionedValues', validatorFunction2, testCases2)
    const validatorFunction3 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValues(whiteListedValues3);
  })
  describe('isArray.thatMustHaveSanctionedValueTypes()', () => {
    const whiteListedValueTypes = ['number', 'string']
    const testCasesNumbers: TestCase[] = [
    ]
    numberArrays.forEach(array => testCasesNumbers.push({ input: array, expected: true }))
    stringArrays.forEach(array => testCasesNumbers.push({ input: array, expected: true }))
    booleanArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCasesNumbers.push({ input: array, expected: false }))
    testCasesNumbers.push({ input: NaN, expected: false })
    testCasesNumbers.push({ input: ['a',1,'b',2], expected: true })

    const whiteListedValueTypes2 = ['boolean']
    const testCasesBooleans: TestCase[] = [
    ]
    numberArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCasesBooleans.push({ input: array, expected: true }))
    objectArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCasesBooleans.push({ input: array, expected: false }))
    testCasesBooleans.push({ input: NaN, expected: false })
    testCasesBooleans.push({ input: ['a',1,'b',2], expected: false })

    const whiteListedValueTypes3 = ['object']
    const testCasesObjects: TestCase[] = [
    ]

    numberArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCasesObjects.push({ input: array, expected: true }))
    arrayArrays.forEach(array => testCasesObjects.push({ input: array, expected: true })) // arrays are objects
    functionArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCasesObjects.push({ input: array, expected: true })) // dates are objects
    symbolArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCasesObjects.push({ input: array, expected: false }))
    testCasesObjects.push({ input: NaN, expected: false })
    testCasesObjects.push({ input: ['a',1,'b',2], expected: false })

    const whiteListedValueTypes4 = ['array']
    const testCasesArrays: TestCase[] = [
    ]
    numberArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCasesArrays.push({ input: array, expected: true }))
    functionArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    dateArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCasesArrays.push({ input: array, expected: false }))
    testCasesArrays.push({ input: NaN, expected: false })
    testCasesArrays.push({ input: ['a',1,'b',2], expected: false })

    const whiteListedValueTypes5 = ['function']
    const testCasesFunctions: TestCase[] = [
    ]
    numberArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    stringArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    booleanArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    objectArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    arrayArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    functionArrays.forEach(array => testCasesFunctions.push({ input: array, expected: true }))
    dateArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    symbolArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    nonArrays.forEach(array => testCasesFunctions.push({ input: array, expected: false }))
    testCasesFunctions.push({ input: NaN, expected: false })
    testCasesFunctions.push({ input: ['a',1,'b',2], expected: false })

    const validateFunction = (input: any) => validate(input).isArray().thatMustHaveSanctionedValueTypes(whiteListedValueTypes);
    runValidationTests('thatMustHaveSanctionedValueTypes', validateFunction, testCasesNumbers)

    const validateFunction2 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValueTypes(whiteListedValueTypes2);
    runValidationTests('thatMustHaveSanctionedValueTypes', validateFunction2, testCasesBooleans)

    const validateFunction3 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValueTypes(whiteListedValueTypes3);
    runValidationTests('thatMustHaveSanctionedValueTypes', validateFunction3, testCasesObjects)

    const validateFunction4 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValueTypes(whiteListedValueTypes4);
    runValidationTests('thatMustHaveSanctionedValueTypes', validateFunction4, testCasesArrays)

    const validateFunction5 = (input: any) => validate(input).isArray().thatMustHaveSanctionedValueTypes(whiteListedValueTypes5);
    runValidationTests('thatMustHaveSanctionedValueTypes', validateFunction5, testCasesFunctions)
  })
})
