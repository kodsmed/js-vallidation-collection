import { ValidationCollection } from './ValidationCollection';
import { ErroneousData } from './lib/BaseValidationClass';
declare const validate: {
    (unknownData?: unknown): ValidationCollection;
    setName(name: string): void;
    setThrowable(shouldThrow: boolean): void;
    report(): Array<ErroneousData>;
    reportAsString(): string;
    clearReports(): void;
    confirm(): boolean;
};
export default validate;
