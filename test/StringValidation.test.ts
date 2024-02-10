import validate from "../src/validate";


type TestCase = { input: unknown, expected: boolean }

function reportStringValidator (reportString: string) {
  // an empty report string is considered valid
  if (reportString === '') {
    return true;
  }

  const validStrings = ['unexpected type',
  'missing property',
  'unexpected property',
  'missing value',
  'unexpected value',
  'unexpected value type',
  'faulty Length',
  'too short',
  'too long',
  'null encountered',
  'undefined encountered',
  'NaN encountered']

  // the report string should include one of the valid strings to be considered valid
  return validStrings.some(validString => reportString.includes(validString));
}

function runValidationTests (description: string, validatorFunction: (input: any) => any, testCases: TestCase[])  {
  describe(description, () => {
    testCases.forEach(testCase => {
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
        expect(validatorFunction(testCase.input).confirm()).toBe(testCase.expected);
        const reportString = validate.reportAsString();
        expect(reportStringValidator(reportString)).toBe(true);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validatorFunction(testCase.input)).not.toThrowError();
        } else {
          expect(() => validatorFunction(testCase.input)).toThrowError();
        }
      });
    });

    validate.setThrowable(false);
    validate.clearReports();
    testCases.forEach(testCase => {
      validate.setName('testName');
      it(`should return ${testCase.expected} for ${testCase.input}`, () => {
      validatorFunction(testCase.input);
      const reportString = validate.reportAsString();
      let correctlyNamed = false;
      if (reportString.startsWith('testName:') || reportString === '') {
         correctlyNamed = true;
      }
      expect(correctlyNamed).toBe(true);
      });
    });
  });
}

afterEach(() => {
  validate.clearReports();
  validate.setThrowable(false);
});

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
        expect(validate(testCase.input).isString().confirm()).toBe(testCase.expected);
      });

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.input} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validate(testCase.input).isString()).not.toThrowError();
        } else {
          expect(() => validate(testCase.input).isString()).toThrowError();
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
    const validationFunction = (input: any) => validate(input).isString().withMinimumLength(5);
    runValidationTests('withMinimumLength()', validationFunction, testCases);

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
    const validationFunction = (input: any) => validate(input).isString().withMaximumLength(5);
    runValidationTests('withMaximumLength',  validationFunction, testCases);
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
    const validationFunction = (input: any) => validate(input).isString().withExactLength(3);
    runValidationTests('withExactLength', validationFunction, testCases);

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
        expect(validate(testCase.string).isString().thatIncludes(testCase.subString).confirm()).toBe(testCase.expected);
      })

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that includes ${testCase.subString} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validate(testCase.string).isString().thatIncludes(testCase.subString)).not.toThrow(Error);
        } else {
          expect(() => validate(testCase.string).isString().thatIncludes(testCase.subString)).toThrow(Error);
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
        expect(validate(testCase.string).isString().thatDoesNotIncludes(testCase.subString).confirm()).toBe(testCase.expected);
      })

      it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that does not include ${testCase.subString} if shouldThrow is set`, () => {
        validate.setThrowable(true);
        if (testCase.expected) {
          expect(() => validate(testCase.string).isString().thatDoesNotIncludes(testCase.subString)).not.toThrow(Error);
        } else {
          expect(() => validate(testCase.string).isString().thatDoesNotIncludes(testCase.subString)).toThrow(Error);
        }
      })
    }),

      describe('isString.thatIsInCapitalLetters() validator', () => {
        const testCases = [
          { input: 1, expected: false },
          { input: undefined, expected: false },
          { input: null, expected: false },
          { input: 'HELLO', expected: true },
          { input: 'hello', expected: false },
          { input: 'Hello', expected: false },
          { input: 'hELLO', expected: false },
          { input: '123', expected: true },
          { input: '123.123', expected: true },
          { input: '123,123', expected: true },
          { input: '123,123.123', expected: true },
          { input: '123.123,123', expected: true },
          { input: '123,123,123', expected: true },
          { input: '123.123.123', expected: true },
          { input: '123,123,123.123', expected: true },
          { input: '123.123.123,123', expected: true },
          { input: '123,123,123,123', expected: true },
          { input: 'HELLO WORLD', expected: true },
          { input: 'H3LL0 W0RLD', expected: true }
        ]
        const validationFunction = (input: any) => validate(input).isString().thatIsInCapitalLetters();
        runValidationTests('thatIsInCapitalLetters', validationFunction, testCases);
      }),

      describe('isString.thatIsInSmallLetters() validator', () => {
        const testCases = [
          { input: 1, expected: false },
          { input: undefined, expected: false },
          { input: null, expected: false },
          { input: 'HELLO', expected: false },
          { input: 'hello', expected: true },
          { input: 'Hello', expected: false },
          { input: 'hELLO', expected: false },
          { input: '123', expected: true },
          { input: '123.123', expected: true },
          { input: '123,123', expected: true },
          { input: '123,123.123', expected: true },
          { input: '123.123,123', expected: true },
          { input: '123,123,123', expected: true },
          { input: '123.123.123', expected: true },
          { input: '123,123,123.123', expected: true },
          { input: '123.123.123,123', expected: true },
          { input: '123,123,123,123', expected: true },
          { input: 'HELLO WORLD', expected: false },
          { input: 'H3LL0 W0RLD', expected: false }
        ]
        const validationFunction = (input: any) => validate(input).isString().thatIsInSmallLetters();
        runValidationTests('thatIsInSmallLetters', validationFunction, testCases);
      }),

      describe('isString.firstLetterIsCapital() validator', () => {
        const testCases = [
          { input: 1, expected: false },
          { input: undefined, expected: false },
          { input: null, expected: false },
          { input: 'HELLO', expected: true },
          { input: 'hello', expected: false },
          { input: 'Hello', expected: true },
          { input: 'hELLO', expected: false },
          { input: '123', expected: true },
          { input: '123.123', expected: true },
          { input: '123,123', expected: true },
          { input: '123,123.123', expected: true },
          { input: '123.123,123', expected: true },
          { input: '123,123,123', expected: true },
          { input: '123.123.123', expected: true },
          { input: '123,123,123.123', expected: true },
          { input: '123.123.123,123', expected: true },
          { input: '123,123,123,123', expected: true },
          { input: 'HELLO WORLD', expected: true },
          { input: 'H3LL0 W0RLD', expected: true }
        ]
        const validationFunction = (input: any) => validate(input).isString().firstLetterIsCapital();
        runValidationTests('firstLetterIsCapital', validationFunction, testCases);
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
            expect(validate(testCase.string).isString().thatEndsWith(testCase.subString).confirm()).toBe(testCase.expected);
          })
          it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that ends with ${testCase.subString} if shouldThrow is set`, () => {
            validate.setThrowable(true);
            if (testCase.expected) {
              expect(() => validate(testCase.string).isString().thatEndsWith(testCase.subString)).not.toThrow(Error);
            } else {
              expect(() => validate(testCase.string).isString().thatEndsWith(testCase.subString)).toThrow(Error);
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
          expect(validate(testCase.string).isString().thatStartsWith(testCase.subString).confirm()).toBe(testCase.expected);
        })
        it(`${testCase.expected === true ? 'Should not throw' : 'Should throw'} for ${testCase.string} that starts with ${testCase.subString} if shouldThrow is set`, () => {
          validate.setThrowable(true);
          if (testCase.expected) {
            expect(() => validate(testCase.string).isString().thatStartsWith(testCase.subString)).not.toThrow(Error);
          } else {
            expect(() => validate(testCase.string).isString().thatStartsWith(testCase.subString)).toThrow(Error);
          }
        })
      })
    }),

    describe('isString.thatIsAnEmail() validator', () => {
      const testCases = [
        { input: 1, expected: false },
        { input: undefined, expected: false },
        { input: null, expected: false },
        { input: 'hello', expected: false },
        { input: 'hello@', expected: false },
        { input: 'hello@world', expected: false },
        { input: 'hello@world.', expected: false },
        { input: 'hello@world.com', expected: true },
        { input: 'h@world.com', expected: false },
        { input: 'hello.world@ts.se', expected: true },
        { input: '<script>alert("hello world")</script>', expected: false },
        { input: 'hello.world@ts', expected: false }
      ]
      const validationFunction = (input: any) => validate(input).isString().thatIsAnEmail();
      runValidationTests('thatIsAnEmail', validationFunction, testCases);
    }),

    describe('isString.thatIsAUrl() validator', () => {
      const testCases = [
        { input: 1, expected: false },
        { input: undefined, expected: false },
        { input: null, expected: false },
        { input: 'hello', expected: false },
        { input: 'hello@', expected: false },
        { input: 'hello@world', expected: false },
        { input: 'hello@world.', expected: false },
        { input: 'hello@world.com', expected: false },
        { input: 'http://hello.world', expected: true },
        { input: 'https://hello.world', expected: true },
        { input: 'http://hello.world.com', expected: true },
        { input: 'https://hello.world.com/testing', expected: true },
        { input: 'ftp://hello.world', expected: true },
        { input: 'ftp://hello.world.com', expected: true },
        { input: 'ftps://hello.world', expected: true },
        { input: 'ftps://hello.world.com', expected: true },
        { input: 'http://<script>alert("hello world")</script>', expected: false }
      ]
      const validationFunction = (input: any) => validate(input).isString().thatIsAUrl();
      runValidationTests('thatIsAUrl', validationFunction, testCases);
    })
  })