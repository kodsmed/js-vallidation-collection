import { ValidationCollection } from './ValidationCollection.js';
import { ErroneousData } from './lib/BaseValidationClass.js';
declare const validate: {
    (unknownData?: unknown): ValidationCollection;
    setName(name: string): void;
    setThrowable(shouldThrow: boolean): void;
    report(): Array<ErroneousData>;
    reportAsString(): string;
};
export default validate;
