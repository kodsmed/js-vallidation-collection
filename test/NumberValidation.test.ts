import { ValidationCollection } from "../src/ValidationCollection";
import { ArgumentObject } from "../src/lib/BaseValidationClass";
function runValidationTests (method: string, testCases: Array<{ input: unknown, expected: boolean }>, argument: ArgumentObject)  {
  describe(`${method} validator`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
        const validationCollection = new ValidationCollection(argument);
        expect((validationCollection.isNumber as any)[method](testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        const argumentObject = { ...argument, shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => (validator.isNumber as any)[method](testCase.input)).not.toThrowError();
        } else {
          expect(() => (validator.isNumber as any)[method](testCase.input)).toThrowError();
        }
      });
    });
  })
}

describe('Number Validation Test Suit', () => {
  describe('isNumber', () => {
    const testCases = [
      { input: 1, expected: true },
      { input: -1, expected: true },
      { input: 0, expected: true },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.NaN, expected: false },
      { input: 1.1, expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: NaN, expected: false },
      { input: Number('1'), expected: true }
    ]
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
        const validationCollection = new ValidationCollection({});
        expect(validationCollection.isNumber(testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        const validator = new ValidationCollection({ shouldThrow: true });
        if (testCase.expected) {
          expect(() => validator.isNumber(testCase.input)).not.toThrowError();
        } else {
          expect(() => validator.isNumber(testCase.input)).toThrowError();
        }
      })
    })
  })
  describe('isNumber.thatIsPositive', () => {
    const testCases = [
      { input: 1, expected: true },
      { input: -1, expected: false },
      { input: 0, expected: false },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: false },
      { input: Number.EPSILON, expected: true },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.NaN, expected: false },
      { input: 1.1, expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: NaN, expected: false },
      { input: Number('1'), expected: true }
    ]
    runValidationTests('thatIsPositive', testCases, {})
  })
  describe('isNumber.thatIsNegative validator', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: -1, expected: true },
      { input: 0, expected: false },
      { input: Number.MAX_VALUE, expected: false },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.NaN, expected: false },
      { input: 1.1, expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: NaN, expected: false },
      { input: Number('1'), expected: false }
    ]
    runValidationTests('thatIsNegative', testCases, {})
  }),
  describe('isNumber.thatIsBetweenMinMax validator',() => {
    const minValue = 5
    const maxValue = 10
    const testCases = [
      { input: 4, expected: false },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 10.00000000000, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.MAX_VALUE, expected: false },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsBetweenMinMax', testCases, { minimumNumberValue: minValue, maximumNumberValue: maxValue })
  }),
  describe('isNumber.thatIsOverMinimum validator', () => {
    const minValue = 5
    const testCases = [
      { input: 4, expected: false },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: true },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 4.99999999999, expected: false },
      { input: 5.00000000000, expected: true },
      { input: 10.00000000000, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsOverMinimum', testCases, { minimumNumberValue: minValue })
  }),
  describe('isNumber.thatIsUnderMaximum validator', () => {
    const maxValue = 10
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.MAX_VALUE, expected: false },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number('1'), expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsUnderMaximum', testCases, { maximumNumberValue: maxValue })
  }),
  describe('isNumber.thatIsExactly validator', () => {
    const exactValue = 10
    const testCases = [
      { input: 4, expected: false },
      { input: 5, expected: false },
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 5.1, expected: false },
      { input: 9.9, expected: false },
      { input: 5.00000000000, expected: false },
      { input: 9.99999999999, expected: false},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.MAX_VALUE, expected: false },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.MAX_SAFE_INTEGER, expected: false },
      { input: Number.MIN_SAFE_INTEGER, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsExactly', testCases, { exactNumberValue: exactValue })
  }),
  describe('isNumber.thatIsEven validator', () => {
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: false },
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 5.1, expected: false },
      { input: 9.9, expected: false },
      { input: 5.00000000000, expected: false },
      { input: 9.99999999999, expected: false},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.MAX_SAFE_INTEGER, expected: false },
      { input: Number.MIN_SAFE_INTEGER, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsEven', testCases, {})
  }),
  describe('isNumber.thatIsOdd validator', () => {
    const testCases = [
      { input: 4, expected: false },
      { input: 5, expected: true },
      { input: 10, expected: false },
      { input: 11, expected: true },
      { input: 5.1, expected: false },
      { input: 9.9, expected: false },
      { input: 5.00000000000, expected: true },
      { input: 9.99999999999, expected: false},
      { input: 10.00000000000, expected: false },
      { input: 10.00000000001, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: false },
      { input: Number.NEGATIVE_INFINITY, expected: false },
      { input: Number.MAX_VALUE, expected: false },
      { input: Number.MIN_VALUE, expected: false },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: false },
      { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false }
    ]
    runValidationTests('thatIsOdd', testCases, {})
  }),
  describe('isNumber.thatIsNotZero validator', () => {
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: true },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 9.99999999999, expected: true},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number('1'), expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: 0, expected: false }
    ]
    runValidationTests('thatIsNotZero', testCases,  {})
  }),
  describe('isNumber.thatIsNotOne validator', () => {
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: true },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 9.99999999999, expected: true},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: 0, expected: true },
      { input: 1, expected: false }
    ]
    runValidationTests('thatIsNotOne', testCases, {})
  }),
  describe('isNumber.thatIsNotZero validator', () => {
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: true },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 9.99999999999, expected: true},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number('1'), expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: 0, expected: false }
    ]
    runValidationTests('thatIsNotZero', testCases,  {})
  }),
  describe('isNumber.thatIsNotNegativeOne validator', () => {
    const testCases = [
      { input: 4, expected: true },
      { input: 5, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: true },
      { input: 5.1, expected: true },
      { input: 9.9, expected: true },
      { input: 5.00000000000, expected: true },
      { input: 9.99999999999, expected: true},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: Number.POSITIVE_INFINITY, expected: true },
      { input: Number.NEGATIVE_INFINITY, expected: true },
      { input: Number.MAX_VALUE, expected: true },
      { input: Number.MIN_VALUE, expected: true },
      { input: Number.MAX_SAFE_INTEGER, expected: true },
      { input: Number.MIN_SAFE_INTEGER, expected: true },
      { input: Number.EPSILON, expected: true },
      { input: Number('1'), expected: true },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: 0, expected: true },
      { input: 1, expected: true },
      { input: -1, expected: false }
    ]
    runValidationTests('thatIsNotNegativeOne', testCases, {})
  }),
  describe('isNumber.thatIsEvenlyDivisible validator', () => {
    const testCases = [
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 5.1, expected: false },
      { input: 9.9, expected: false },
      { input: 5.00000000000, expected: false },
      { input: 9.99999999999, expected: false},
      { input: 10.00000000000, expected: true },
      { input: 10.00000000001, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      // We can't test these because they are too big... waiting for a loop to infinity is not a good idea
      // { input: Number.POSITIVE_INFINITY, expected: false },
      // { input: Number.NEGATIVE_INFINITY, expected: false },
      // { input: Number.MAX_VALUE, expected: false },
      // { input: Number.MIN_VALUE, expected: false },
      // { input: Number.MAX_SAFE_INTEGER, expected: true },
      // { input: Number.MIN_SAFE_INTEGER, expected: false },
      // { input: Number.EPSILON, expected: false },
      { input: Number('1'), expected: false },
      { input: '1', expected: false },
      { input: '1.1', expected: false },
      { input: 'one', expected: false },
      { input: true, expected: false },
      { input: false, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: 2, expected: true },
      { input: 3, expected: false },
      { input: 5, expected: false },
      { input: 7, expected: false },
      { input: 11, expected: false },
      { input: 13, expected: false },
      { input: 17, expected: false }
    ]
    runValidationTests('thatIsEvenlyDivisible', testCases, {})
  }),
  describe('isNumber.thatIsEvenlyDivisibleBy validator', () => {
    const testCases = [
      { input: { value: 10, divisor: 2 }, expected: true },
      { input: { value: 11, divisor: 2 }, expected: false },
      { input: { value: 5.1, divisor: 2 }, expected: false },
      { input: { value: 9.9, divisor: 2 }, expected: false },
      { input: { value: 5.00000000000, divisor: 2 }, expected: false },
      { input: { value: 9.99999999999, divisor: 2 }, expected: false},
      { input: { value: 10.00000000000, divisor: 2 }, expected: true },
      { input: { value: 10.00000000001, divisor: 2 }, expected: false },
      { input: { value: undefined, divisor: 2 }, expected: false },
      { input: { value: null, divisor: 2 }, expected: false },
      { input: { value: NaN, divisor: 2 }, expected: false },
      { input: { value: Number.NaN, divisor: 2 }, expected: false },
      { input: { value: Number.POSITIVE_INFINITY, divisor: 2 }, expected: false },
      { input: { value: Number.NEGATIVE_INFINITY, divisor: 2 }, expected: false },
      { input: { value: Number.MAX_VALUE, divisor: 2 }, expected: true },
      { input: { value: Number.MIN_VALUE, divisor: 2 }, expected: false },
      { input: { value: Number.MAX_SAFE_INTEGER, divisor: 2 }, expected: false },
      { input: { value: Number.MIN_SAFE_INTEGER, divisor: 2 }, expected: false },
      { input: { value: Number.EPSILON, divisor: 2 }, expected: false },
      { input: { value: Number('1'), divisor: 2 }, expected: false },
      { input: { value: '1', divisor: 2 }, expected: false },
      { input: { value: '1.1', divisor: 2 }, expected: false },
      { input: { value: 'one', divisor: 2 }, expected: false },
      { input: { value: true, divisor: 2 }, expected: false }
    ]
    runValidationTests('thatIsEvenlyDivisibleBy', testCases, {})
  }),
  describe('isNumber.thatIsAPrimeNumber validator', () => {
    const testCases = [
      { input: 1, expected: true },
      { input: 2, expected: true },
      { input: 3, expected: true },
      { input: 4, expected: false },
      { input: 5, expected: true },
      { input: 6, expected: false },
      { input: 7, expected: true },
      { input: 8, expected: false },
      { input: 9, expected: false },
      { input: 10, expected: false },
      { input: 11, expected: true },
      { input: 12, expected: false },
      { input: 13, expected: true },
      { input: 14, expected: false },
      { input: 15, expected: false },
      { input: 16, expected: false },
      { input: 17, expected: true },
      { input: 18, expected: false },
      { input: 19, expected: true },
      { input: 20, expected: false },
      { input: 21, expected: false },
      { input: 22, expected: false },
      { input: 23, expected: true },
      { input: 24, expected: false },
      { input: 25, expected: false },
      { input: 26, expected: false },
      { input: 27, expected: false },
      { input: 28, expected: false },
      { input: 29, expected: true },
      { input: 30, expected: false },
      { input: 31, expected: true },
      { input: 32, expected: false },
      { input: 33, expected: false },
      { input: 34, expected: false },
      { input: 35, expected: false },
      { input: 36, expected: false },
      { input: 37, expected: true },
      { input: 38, expected: false },
      { input: 39, expected: false },
      { input: 40, expected: false },
      { input: 41, expected: true },
      { input: 42, expected: false },
      { input: 43, expected: true },
      { input: 44, expected: false },
      { input: 45, expected: false },
      { input: 46, expected: false },
      { input: 47, expected: true },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: [], expected: false },
      { input: {}, expected: false }
    ]
    runValidationTests('thatIsAPrimeNumber', testCases, {})
  }),
  describe('isNumber.thatIsNotAPrimeNumber validator', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: 2, expected: false },
      { input: 3, expected: false },
      { input: 4, expected: true },
      { input: 5, expected: false },
      { input: 6, expected: true },
      { input: 7, expected: false },
      { input: 8, expected: true },
      { input: 9, expected: true },
      { input: 10, expected: true },
      { input: 11, expected: false },
      { input: 12, expected: true },
      { input: 13, expected: false },
      { input: 14, expected: true },
      { input: 15, expected: true },
      { input: 16, expected: true },
      { input: 17, expected: false },
      { input: 18, expected: true },
      { input: 19, expected: false },
      { input: 20, expected: true },
      { input: 21, expected: true },
      { input: 22, expected: true },
      { input: 23, expected: false },
      { input: 24, expected: true },
      { input: 25, expected: true },
      { input: 26, expected: true },
      { input: 27, expected: true },
      { input: 28, expected: true },
      { input: 29, expected: false },
      { input: 30, expected: true },
      { input: 31, expected: false },
      { input: 32, expected: true },
      { input: 33, expected: true },
      { input: 34, expected: true },
      { input: 35, expected: true },
      { input: 36, expected: true },
      { input: 37, expected: false },
      { input: 38, expected: true },
      { input: 39, expected: true },
      { input: 40, expected: true },
      { input: 41, expected: false },
      { input: 42, expected: true },
      { input: 43, expected: false },
      { input: 44, expected: true },
      { input: 45, expected: true },
      { input: 46, expected: true },
      { input: 47, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: NaN, expected: false },
      { input: Number.NaN, expected: false },
      { input: [], expected: false },
      { input: {}, expected: false }
    ]
    runValidationTests('thatIsNotAPrimeNumber', testCases, {})
  })
})
