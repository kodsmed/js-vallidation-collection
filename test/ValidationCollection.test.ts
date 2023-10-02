import ValidationCollection from '../src/ValidationCollection';
import { ArgumentObject, ErroneousData, What } from '../src/lib/BaseValidationClass';

describe('Validation Collection Test suit', () => {
  describe('Constructor', () => {
    it('should create a new instance of ValidationCollection', () => {
      const validationCollection = new ValidationCollection({});
      expect(validationCollection).toBeInstanceOf(ValidationCollection);
    })
    it('should throw an error if maximumLength is NaN', () => {
      expect(() => new ValidationCollection({ maximumLength: NaN })).toThrowError('argumentObject contains an invalid property: maximumLength')
    })
    it('should throw an error if maximumLength is undefined', () => {
      expect(() => new ValidationCollection({ maximumLength: undefined })).toThrowError('argumentObject contains an invalid property: maximumLength')
    })
    it('should throw an error if minimumLength is NaN', () => {
      expect(() => new ValidationCollection({ minimumLength: NaN })).toThrowError('argumentObject contains an invalid property: minimumLength')
    })
    it('should throw an error if minimumLength is undefined', () => {
      expect(() => new ValidationCollection({ minimumLength: undefined })).toThrowError('argumentObject contains an invalid property: minimumLength')
    })
    it('should throw an error if exactLength is NaN', () => {
      expect(() => new ValidationCollection({ exactLength: NaN })).toThrowError('argumentObject contains an invalid property: exactLength')
    })
    it('should throw an error if exactLength is undefined', () => {
      expect(() => new ValidationCollection({ exactLength: undefined })).toThrowError('argumentObject contains an invalid property: exactLength')
    })
    it('should throw an error if minimumNumberValue is NaN', () => {
      expect(() => new ValidationCollection({ minimumNumberValue: NaN })).toThrowError('argumentObject contains an invalid property: minimumNumberValue')
    })
    it('should throw an error if minimumNumberValue is undefined', () => {
      expect(() => new ValidationCollection({ minimumNumberValue: undefined })).toThrowError('argumentObject contains an invalid property: minimumNumberValue')
    })
    it('should throw an error if maximumNumberValue is NaN', () => {
      expect(() => new ValidationCollection({ maximumNumberValue: NaN })).toThrowError('argumentObject contains an invalid property: maximumNumberValue')
    })
    it('should throw an error if maximumNumberValue is undefined', () => {
      expect(() => new ValidationCollection({ maximumNumberValue: undefined })).toThrowError('argumentObject contains an invalid property: maximumNumberValue')
    })
    it('should throw an error if exactNumberValue is NaN', () => {
      expect(() => new ValidationCollection({ exactNumberValue: NaN })).toThrowError('argumentObject contains an invalid property: exactNumberValue')
    })
    it('should throw an error if exactNumberValue is undefined', () => {
      expect(() => new ValidationCollection({ exactNumberValue: undefined })).toThrowError('argumentObject contains an invalid property: exactNumberValue')
    })
    it('should throw an error if validProperties is not an array', () => {
      expect(() => new ValidationCollection({ validProperties: undefined })).toThrowError('argumentObject contains an invalid property: validProperties')
    })
    it('should throw an error if validValues is not an array', () => {
      expect(() => new ValidationCollection({ validValues: undefined })).toThrowError('argumentObject contains an invalid property: validValues')
    })
    it('should throw an error if validValueTypes is not an array', () => {
      expect(() => new ValidationCollection({ validValueTypes: undefined })).toThrowError('argumentObject contains an invalid property: validValueTypes')
    })
    it('should throw an error if shouldThrow is not a boolean', () => {
      expect(() => new ValidationCollection({ shouldThrow: undefined })).toThrowError('argumentObject contains an invalid property: shouldThrow')
    })
    it('should throw an error if name is not a string', () => {
      expect(() => new ValidationCollection({ name: undefined })).toThrowError('argumentObject contains an invalid property: name')
    }),
    it ('should throw an error if argumentObject contains an invalid property', () => {
      expect(() => new ValidationCollection({ invalidProperty: 'hammer' } as any )).toThrowError('argumentObject contains an invalid property: invalidProperty')
    }),
    it ('should accept valid values', () => {
      const ArgumentObject = {
        maximumLength: 1,
        minimumLength: 1,
        exactLength: 1,
        minimumNumberValue: 1,
        maximumNumberValue: 1,
        exactNumberValue: 1,
        validProperties: ['a'],
        validValues: ['a'],
        validValueTypes: ['a'],
        shouldThrow: true,
        name: 'a'
      }
      expect(() => new ValidationCollection(ArgumentObject)).not.toThrowError()
    })
  })
  // describe('get hasProblems', () => {
  //   it('should return false if problems is empty', () => {
  //     const validationCollection = new ValidationCollection({});
  //     const problems = validationCollection.hasProblems
  //     expect(problems).toBe(false)
  //   })
  //   it('should return true if problems is not empty', () => {
  //     const validationCollection = new ValidationCollection({});
  //     const result = validationCollection.isNumber('problem')
  //     expect(result).toBe(false)
  //     const problems = validationCollection.hasProblems
  //     expect(problems).toBe(true)
  //   })
  // })

  describe('clearProblems', () => {
    it('should clear problems', () => {
      const validationCollection = new ValidationCollection({});
      validationCollection.isNumber('problem')
      const result = validationCollection.isNumber('problem')
      expect(result).toBe(false)
      let problems = validationCollection.hasProblems
      expect(problems).toBe(true)
      validationCollection.clearProblems()
      problems = validationCollection.hasProblems
      expect(problems).toBe(false)
    })
  })

  describe('get shouldThrow', () => {
    it('should return true if shouldThrow is true', () => {
      const validationCollection = new ValidationCollection({ shouldThrow: true });
      expect(validationCollection.shouldThrowErrors).toBe(true)
    })
    it('should return false if shouldThrow is false', () => {
      const validationCollection = new ValidationCollection({ shouldThrow: false });
      expect(validationCollection.shouldThrowErrors).toBe(false)
    })
  })

  describe ('get rules', () => {
    it('should return an object with the rules', () => {
      const validationCollection = new ValidationCollection({ name: 'a' });
      const rules = validationCollection.rules
      const expectedRules: ArgumentObject = {
        minimumLength : 0,
        maximumLength : Number.MAX_SAFE_INTEGER,
        exactLength :  -1,
        minimumNumberValue : Number.MIN_SAFE_INTEGER,
        maximumNumberValue : Number.MAX_SAFE_INTEGER,
        exactNumberValue : -1,
        validProperties : [],
        validValues : [],
        validValueTypes : [],
        name : 'a',
        shouldThrow :  false
      }
      expect(rules).toMatchObject(expectedRules)
    })
  })

  describe('get report', () => {
    it('should return an array of ErroneousData', () => {
      const validationCollection = new ValidationCollection({});
      let report = validationCollection.report
      expect(report).toBeInstanceOf(Array)
      expect(report.length).toBe(0)
      validationCollection.isNumber('problem')
      report = validationCollection.report
      expect(report).toBeInstanceOf(Array)
      expect(report.length).toBe(1)
      expect(report[0]).toMatchObject({
        what: What.unexpectedType,
        in: 'number',
        is: 'string',
        expected: 'number'
      })
    })
  })
  describe('get reportAsString', () => {
    it('should return a string', () => {
      let validationCollection = new ValidationCollection({});
      let report = validationCollection.reportAsString
      expect(report).toBe('')
      validationCollection.isNumber('problem')
      report = validationCollection.reportAsString
      expect(report).toBe('unexpected type failure in number, is string, expected number\n')
      validationCollection = new ValidationCollection({name : 'a test'});
      validationCollection.isNumber('problem')
      report = validationCollection.reportAsString
      expect(report).toBe('a test: unexpected type failure in number, is string, expected number\n')
    })
  })
})
