import { ValidationCollection } from '../src/ValidationCollection';
import validate from '../src/validate';
import { ErroneousData, What } from '../src/lib/BaseValidationClass';

describe('Validation Collection Test suit', () => {
  describe('Constructor', () => {
    it('should create a new instance of ValidationCollection', () => {
      const validationCollection = new ValidationCollection();
      expect(validationCollection).toBeInstanceOf(ValidationCollection);
    })
  })


  describe('clearProblems', () => {
    it('should clear problems', () => {
      const result = validate('problem').isNumber().confirm()
      expect(result).toBe(false)
      let problems = validate.report()
      expect(Array.isArray(problems)).toBe(true)
      expect(problems.length).toBe(1)
      validate.clearReports()
      problems = validate.report()
      expect(Array.isArray(problems)).toBe(true)
      expect(problems.length).toBe(0)
    })
  })

  describe('get report', () => {
    it('should return an array of ErroneousData', () => {
      let report = validate.report()
      expect(report).toBeInstanceOf(Array)
      expect(report.length).toBe(0)
      validate('problem').isNumber()
      report = validate.report()
      expect(report).toBeInstanceOf(Array)
      expect(report.length).toBe(1)
      expect(report[0]).toMatchObject({
        what: What.unexpectedType,
        in: 'number',
        is: 'string',
        expected: 'number'
      })
      validate.clearReports()
    })
  })

  describe('get reportAsString', () => {
    it('should return a string', () => {
      let report = validate.reportAsString()
      expect(report).toBe('')
      validate('problem').isNumber()
      report = validate.reportAsString()
      expect(report).toBe('unexpected type failure in number, is string, expected number\n')
      validate.clearReports()
      validate.setName('a test')
      validate('problem').isNumber()
      report = validate.reportAsString()
      expect(report).toBe('a test: unexpected type failure in number, is string, expected number\n')
    })
  })
})
