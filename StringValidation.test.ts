import { ValidationCollection } from './ValidationCollection'
import { ArgumentObject } from './lib/BaseValidationClass'

type TestCase = { input: unknown, expected: boolean }

function runValidationTests (method: string, testCases: Array<{ input: unknown, expected: boolean }>, argument: ArgumentObject)  {
  describe(`${method} validator`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
        const validationCollection = new ValidationCollection(argument);
        expect((validationCollection.isString as any)[method](testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        const argumentObject = { ...argument, shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => (validator.isString as any)[method](testCase.input)).not.toThrowError();
        } else {
          expect(() => (validator.isString as any)[method](testCase.input)).toThrowError();
        }
      });
    });
  })
}
describe('isString() validator', () => {
  const strings = ['hello', 'world', 'hello world', '123', , '', ' ', '!@#$%^&*()_+'];
  const notStrings = [123, 123.123, true, false, {}, [], null, undefined, NaN, Infinity, -Infinity, new Date(), new RegExp(''), new Error(''), new Function(''), () => { }];

  const testCases : Array<TestCase> = []
  strings.forEach(string => {
    testCases.push({ input: string, expected: true });
  })
  notStrings.forEach(notString => {
    testCases.push({ input: notString, expected: false });
  })

  describe(`isString validator`, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
        const validationCollection = new ValidationCollection({});
        expect(validationCollection.isString(testCase.input)).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        const argumentObject = { shouldThrow: true, name: 'test' }
        const validator = new ValidationCollection(argumentObject);
        if (testCase.expected) {
          expect(() => validator.isString(testCase.input)).not.toThrowError();
        } else {
          expect(() => validator.isString(testCase.input)).toThrowError();
        }
      });
    });
  })
}),

  describe('isString.withMinimumLength() validator', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: 'hello!', expected: true },
      { input: 'hello', expected: true },
      { input: 'hel', expected: false },
      { input: 'he', expected: false }
    ]

    runValidationTests('withMinimumLength', testCases, {  minimumLength: 5 })

  }),
  describe('isString.withMaximumLength() validator', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: 'hello!', expected: false },
      { input: 'hello', expected: true },
      { input: 'hel', expected: true },
      { input: 'he', expected: true }
    ]
    runValidationTests('withMaximumLength', testCases, { name: 'test', maximumLength: 5 })
  })
  describe('isString.withExactLength() validator', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
      { input: 'hello!', expected: false },
      { input: 'hell', expected: false },
      { input: 'hel', expected: true },
      { input: 'he', expected: false }
    ]
    runValidationTests('withExactLength', testCases, { name: 'test', exactLength: 3 })

  }),

  describe('isString.thatIncludes() validator', () => {
    const testCases = [
      { string: 1, subString: 'h', expected: false },
      { string: undefined, subString: 'h', expected: false },
      { string: null, subString: 'h', expected: false },
      { string: 'hello', subString: 'h', expected: true },
      { string: 'hello', subString: 'e', expected: true },
      { string: 'hello', subString: 'l', expected: true },
      { string: 'hello', subString: 'o', expected: true },
      { string: 'hello', subString: 'hello', expected: true },
      { string: 'hello', subString: 'world', expected: false },
      { string: 'hello', subString: '123', expected: false },
      { string: 'hello', subString: '<script>alert("hello world")</script>', expected: false },
      { string: 'hello', subString: '', expected: true },
      { string: 'hello', subString: ' ', expected: false },
      { string: 'hello', subString: '!', expected: false },
      { string: 'hello', subString: '@', expected: false },
      { string: 'hello', subString: '#', expected: false },
      { string: 'hello', subString: '$', expected: false },
      { string: 'hello', subString: '%', expected: false },
      { string: 'hello', subString: '^', expected: false },
      { string: 'hello', subString: '&', expected: false },
      { string: 'hello', subString: '*', expected: false },
      { string: 'hello', subString: '(', expected: false },
      { string: 'hello', subString: ')', expected: false },
      { string: 'hello', subString: '_', expected: false },
      { string: 'hello', subString: '+', expected: false }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${testCase.expected} for ${testCase.string} that includes ${testCase.subString}`, () => {
        const validator = new ValidationCollection({name: 'test'});
        expect(validator.isString.thatIncludes(testCase.string, testCase.subString)).toBe(testCase.expected);
      })
      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that includes ${testCase.subString} if shouldThrow is set`, () => {
        const validator = new ValidationCollection({ shouldThrow: true });
        if (testCase.expected) {
          expect(() => validator.isString.thatIncludes(testCase.string, testCase.subString)).not.toThrow(Error);
        } else {
          expect(() => validator.isString.thatIncludes(testCase.string, testCase.subString)).toThrow(Error);
        }
      })
    })
  }),

  describe('isString.thatDoesNotIncludes() validator', () => {
    const testCases = [
      { string: 1, subString: 'h', expected: false },
      { string: undefined, subString: 'h', expected: false },
      { string: null, subString: 'h', expected: false },
      { string: 'hello', subString: 'h', expected: false },
      { string: 'hello', subString: 'e', expected: false },
      { string: 'hello', subString: 'l', expected: false },
      { string: 'hello', subString: 'o', expected: false },
      { string: 'hello', subString: 'hello', expected: false },
      { string: 'hello', subString: 'world', expected: true },
      { string: 'hello', subString: '123', expected: true },
      { string: 'hello', subString: '<script>alert("hello world")</script>', expected: true },
      { string: 'hello', subString: '', expected: false },
      { string: 'hello', subString: ' ', expected: true },
      { string: 'hello', subString: '!', expected: true },
      { string: 'hello', subString: '@', expected: true },
      { string: 'hello', subString: '#', expected: true },
      { string: 'hello', subString: '$', expected: true },
      { string: 'hello', subString: '%', expected: true },
      { string: 'hello', subString: '^', expected: true },
      { string: 'hello', subString: '&', expected: true },
      { string: 'hello', subString: '*', expected: true },
      { string: 'hello', subString: '(', expected: true },
      { string: 'hello', subString: ')', expected: true },
      { string: 'hello', subString: '_', expected: true },
      { string: 'hello', subString: '+', expected: true }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${testCase.expected} for ${testCase.string} that does not include ${testCase.subString}`, () => {
        const validator = new ValidationCollection({name: 'test'});
        expect(validator.isString.thatDoesNotIncludes(testCase.string, testCase.subString)).toBe(testCase.expected);
      })
      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that does not include ${testCase.subString} if shouldThrow is set`, () => {
        const validator = new ValidationCollection({ shouldThrow: true });
        if (testCase.expected) {
          expect(() => validator.isString.thatDoesNotIncludes(testCase.string, testCase.subString)).not.toThrow(Error);
        } else {
          expect(() => validator.isString.thatDoesNotIncludes(testCase.string, testCase.subString)).toThrow(Error);
        }
      })
    }),

      describe('isString.thatIsInCapitalLetters() validator', () => {
        const testCases = [
          { string: 1, expected: false },
          { string: undefined, expected: false },
          { string: null, expected: false },
          { string: 'HELLO', expected: true },
          { string: 'hello', expected: false },
          { string: 'Hello', expected: false },
          { string: 'hELLO', expected: false },
          { string: '123', expected: true },
          { string: '123.123', expected: true },
          { string: '123,123', expected: true },
          { string: '123,123.123', expected: true },
          { string: '123.123,123', expected: true },
          { string: '123,123,123', expected: true },
          { string: '123.123.123', expected: true },
          { string: '123,123,123.123', expected: true },
          { string: '123.123.123,123', expected: true },
          { string: '123,123,123,123', expected: true },
          { string: 'HELLO WORLD', expected: true },
          { string: 'H3LL0 W0RLD', expected: true }
        ]

        testCases.forEach((testCase) => {
          it(`should return ${testCase.expected} for ${testCase.string} that is in capital letters`, () => {
            const validator = new ValidationCollection({name: 'test'});
            expect(validator.isString.thatIsInCapitalLetters(testCase.string)).toBe(testCase.expected);
          })
          it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that is in capital letters if shouldThrow is set`, () => {
            const validator = new ValidationCollection({ shouldThrow: true });
            if (testCase.expected) {
              expect(() => validator.isString.thatIsInCapitalLetters(testCase.string)).not.toThrow(Error);
            } else {
              expect(() => validator.isString.thatIsInCapitalLetters(testCase.string)).toThrow(Error);
            }
          })
        })
      }),

      describe('isString.thatIsInSmallLetters() validator', () => {
        const testCases = [
          { string: 1, expected: false },
          { string: undefined, expected: false },
          { string: null, expected: false },
          { string: 'HELLO', expected: false },
          { string: 'hello', expected: true },
          { string: 'Hello', expected: false },
          { string: 'hELLO', expected: false },
          { string: '123', expected: true },
          { string: '123.123', expected: true },
          { string: '123,123', expected: true },
          { string: '123,123.123', expected: true },
          { string: '123.123,123', expected: true },
          { string: '123,123,123', expected: true },
          { string: '123.123.123', expected: true },
          { string: '123,123,123.123', expected: true },
          { string: '123.123.123,123', expected: true },
          { string: '123,123,123,123', expected: true },
          { string: 'HELLO WORLD', expected: false },
          { string: 'H3LL0 W0RLD', expected: false }
        ]

        testCases.forEach((testCase) => {
          it(`should return ${testCase.expected} for ${testCase.string} that is not in capital letters`, () => {
            const validator = new ValidationCollection({name:'test'});
            expect(validator.isString.thatIsInSmallLetters(testCase.string)).toBe(testCase.expected);
          })
          it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that is not in capital letters if shouldThrow is set`, () => {
            const validator = new ValidationCollection({ shouldThrow: true });
            if (testCase.expected) {
              expect(() => validator.isString.thatIsInSmallLetters(testCase.string)).not.toThrow(Error);
            } else {
              expect(() => validator.isString.thatIsInSmallLetters(testCase.string)).toThrow(Error);
            }
          })
        })
      }),

      describe('isString.firstLetterIsCapital() validator', () => {
        const testCases = [
          { string: 1, expected: false },
          { string: undefined, expected: false },
          { string: null, expected: false },
          { string: 'HELLO', expected: true },
          { string: 'hello', expected: false },
          { string: 'Hello', expected: true },
          { string: 'hELLO', expected: false },
          { string: '123', expected: true },
          { string: '123.123', expected: true },
          { string: '123,123', expected: true },
          { string: '123,123.123', expected: true },
          { string: '123.123,123', expected: true },
          { string: '123,123,123', expected: true },
          { string: '123.123.123', expected: true },
          { string: '123,123,123.123', expected: true },
          { string: '123.123.123,123', expected: true },
          { string: '123,123,123,123', expected: true },
          { string: 'HELLO WORLD', expected: true },
          { string: 'H3LL0 W0RLD', expected: true }
        ]

        testCases.forEach((testCase) => {
          it(`should return ${testCase.expected} for ${testCase.string} that is in capital letters`, () => {
            const validator = new ValidationCollection({name: 'test'});
            expect(validator.isString.firstLetterIsCapital(testCase.string)).toBe(testCase.expected);
          })
          it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that is in capital letters if shouldThrow is set`, () => {
            const validator = new ValidationCollection({ shouldThrow: true });
            if (testCase.expected) {
              expect(() => validator.isString.firstLetterIsCapital(testCase.string)).not.toThrow(Error);
            } else {
              expect(() => validator.isString.firstLetterIsCapital(testCase.string)).toThrow(Error);
            }
          })
        })
      }),

      describe('isString.thatEndsWith() validator', () => {
        const testCases = [
          { string: 1, subString: 'h', expected: false },
          { string: undefined, subString: 'h', expected: false },
          { string: null, subString: 'h', expected: false },
          { string: 'hello', subString: 'h', expected: false },
          { string: 'hello', subString: 'e', expected: false },
          { string: 'hello', subString: 'l', expected: false },
          { string: 'hello', subString: 'o', expected: true },
          { string: 'hello', subString: 'hello', expected: true },
          { string: 'hello', subString: 'world', expected: false },
          { string: 'hello', subString: '123', expected: false },
          { string: 'hello', subString: '<script>alert("hello world")</script>', expected: false },
          { string: 'hello', subString: '', expected: true },
          { string: 'hello', subString: ' ', expected: false },
          { string: 'hello', subString: '!', expected: false },
          { string: 'hello', subString: '@', expected: false },
          { string: 'hello', subString: '#', expected: false },
          { string: 'hello', subString: '$', expected: false },
          { string: 'hello', subString: '%', expected: false },
          { string: 'hello', subString: '^', expected: false },
          { string: 'hello', subString: '&', expected: false },
          { string: 'hello', subString: '*', expected: false },
          { string: 'hello', subString: '(', expected: false },
          { string: 'hello', subString: ')', expected: false },
          { string: 'hello', subString: '_', expected: false },
          { string: 'hello', subString: '+', expected: false }
        ]

        testCases.forEach((testCase) => {
          it(`should return ${testCase.expected} for ${testCase.string} that ends with ${testCase.subString}`, () => {
            const validator = new ValidationCollection({name: 'test'});
            expect(validator.isString.thatEndsWith(testCase.string, testCase.subString)).toBe(testCase.expected);
          })
          it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that ends with ${testCase.subString} if shouldThrow is set`, () => {
            const validator = new ValidationCollection({ shouldThrow: true });
            if (testCase.expected) {
              expect(() => validator.isString.thatEndsWith(testCase.string, testCase.subString)).not.toThrow(Error);
            } else {
              expect(() => validator.isString.thatEndsWith(testCase.string, testCase.subString)).toThrow(Error);
            }
          })
        })
      }),
    describe('isString.thatStartsWith() validator', () => {
      const testCases = [
        { string: 1, subString: 'h', expected: false },
        { string: undefined, subString: 'h', expected: false },
        { string: null, subString: 'h', expected: false },
        { string: 'hello', subString: 'h', expected: true },
        { string: 'hello', subString: 'e', expected: false },
        { string: 'hello', subString: 'l', expected: false },
        { string: 'hello', subString: 'o', expected: false },
        { string: 'hello', subString: 'hello', expected: true },
        { string: 'hello', subString: 'world', expected: false },
        { string: 'hello', subString: '123', expected: false },
        { string: 'hello', subString: '<script>alert("hello world")</script>', expected: false },
        { string: 'hello', subString: '', expected: true },
        { string: 'hello', subString: ' ', expected: false },
        { string: 'hello', subString: '!', expected: false },
        { string: 'hello', subString: '@', expected: false },
        { string: 'hello', subString: '#', expected: false },
        { string: 'hello', subString: '$', expected: false },
        { string: 'hello', subString: '%', expected: false },
        { string: 'hello', subString: '^', expected: false },
        { string: 'hello', subString: '&', expected: false },
        { string: 'hello', subString: '*', expected: false },
        { string: 'hello', subString: '(', expected: false },
        { string: 'hello', subString: ')', expected: false },
        { string: 'hello', subString: '_', expected: false },
        { string: 'hello', subString: '+', expected: false }
      ]

      testCases.forEach((testCase) => {
        it(`should return ${testCase.expected} for ${testCase.string} that starts with ${testCase.subString}`, () => {
          const validator = new ValidationCollection({name: 'test'});
          expect(validator.isString.thatStartsWith(testCase.string, testCase.subString)).toBe(testCase.expected);
        })
        it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that starts with ${testCase.subString} if shouldThrow is set`, () => {
          const validator = new ValidationCollection({ shouldThrow: true });
          if (testCase.expected) {
            expect(() => validator.isString.thatStartsWith(testCase.string, testCase.subString)).not.toThrow(Error);
          } else {
            expect(() => validator.isString.thatStartsWith(testCase.string, testCase.subString)).toThrow(Error);
          }
        })
      })
    }),

    describe('isString.thatIsAnEmail() validator', () => {
      const testCases = [
        { string: 1, expected: false },
        { string: undefined, expected: false },
        { string: null, expected: false },
        { string: 'hello', expected: false },
        { string: 'hello@', expected: false },
        { string: 'hello@world', expected: false },
        { string: 'hello@world.', expected: false },
        { string: 'hello@world.com', expected: true },
        { string: 'hello.world@ts.se', expected: true },
        { string: '<script>alert("hello world")</script>', expected: false },
        { string: 'hello.world@ts', expected: false }
      ]

      testCases.forEach((testCase) => {
        it(`should return ${testCase.expected} for ${testCase.string} that is an email`, () => {
          const validator = new ValidationCollection({name: 'test'});

          expect(validator.isString.thatIsAnEmail(testCase.string)).toBe(testCase.expected);
        })
        it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that is an email if shouldThrow is set`, () => {
          const validator = new ValidationCollection({ shouldThrow: true });
          if (testCase.expected) {
            expect(() => validator.isString.thatIsAnEmail(testCase.string)).not.toThrow(Error);
          } else {
            expect(() => validator.isString.thatIsAnEmail(testCase.string)).toThrow(Error);
          }
        })
      })
    }),

    describe('isString.thatIsAUrl() validator', () => {
      const testCases = [
        { string: 1, expected: false },
        { string: undefined, expected: false },
        { string: null, expected: false },
        { string: 'hello', expected: false },
        { string: 'hello@', expected: false },
        { string: 'hello@world', expected: false },
        { string: 'hello@world.', expected: false },
        { string: 'hello@world.com', expected: false },
        { string: 'http://hello.world', expected: true },
        { string: 'https://hello.world', expected: true },
        { string: 'http://hello.world.com', expected: true },
        { string: 'https://hello.world.com/testing', expected: true },
        { string: 'ftp://hello.world', expected: true },
        { string: 'ftp://hello.world.com', expected: true },
        { string: 'ftps://hello.world', expected: true },
        { string: 'ftps://hello.world.com', expected: true },
        { string: 'http://<script>alert("hello world")</script>', expected: false }
      ]

      testCases.forEach((testCase) => {
        it(`should return ${testCase.expected} for ${testCase.string} that is a url`, () => {
          const validator = new ValidationCollection({name: 'test'});
          expect(validator.isString.thatIsAUrl(testCase.string)).toBe(testCase.expected);
        })
        it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that is a url if shouldThrow is set`, () => {
          const validator = new ValidationCollection({ shouldThrow: true });
          if (testCase.expected) {
            expect(() => validator.isString.thatIsAUrl(testCase.string)).not.toThrow(Error);
          } else {
            expect(() => validator.isString.thatIsAUrl(testCase.string)).toThrow(Error);
          }
        })
      })
    })
  })