import { ValidationCollection } from './ValidationCollection';
import { ErroneousData } from './lib/BaseValidationClass';

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

validate.clearReports = function (): void {
  ValidationCollection.clearProblems();
}

validate.confirm = function (): boolean {
  return ValidationCollection.confirm();
}

export default validate;