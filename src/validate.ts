import { ValidationCollection } from './ValidationCollection.js';
import { ErroneousData } from './lib/BaseValidationClass.js';

const validate = (unknownData?: unknown): ValidationCollection => {
  return ValidationCollection.createInstance(unknownData);
};

validate.setName = function (name: string): void {
  ValidationCollection.setName(name);
};

validate.setThrowable = function (shouldThrow: boolean): void {
  ValidationCollection.setThrowsErrors(shouldThrow);
};

validate.report = function (): Array<ErroneousData> {
  return ValidationCollection.report();
};

validate.reportAsString = function (): string {
  return ValidationCollection.reportAsString();
};

export default validate;