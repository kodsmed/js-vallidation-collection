import { BaseValidationClass } from './lib/BaseValidationClass';

describe('BaseValidationClass Test suit', () => {
  it('should create a new instance of BaseValidationClass', () => {
    const baseValidationClass = new BaseValidationClass({});
    expect(baseValidationClass).toBeInstanceOf(BaseValidationClass);
  })
})