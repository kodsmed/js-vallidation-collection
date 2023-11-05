import { ValidationCollection } from './ValidationCollection';
import { ErroneousData } from './lib/BaseValidationClass';
declare const validate: {
    (unknownData?: unknown): ValidationCollection;
    setName(name: string): void;
    setThrowable(shouldThrow: boolean): void;
    report(): Array<ErroneousData>;
    reportAsString(): string;
};
export default validate;
