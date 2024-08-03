/**
 * ValidationCollection, a collection of Validation objects that can be used to validate the parameters of a function.
 * Contains a collection of methods that can be used to for validation.
 *
 * @module ValidationCollection
 * @version 2.0.0
 * @author Jimmy "Kodsmed" Karlsson
 *
 */
import { ErroneousData } from './lib/BaseValidationClass';
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject } from './interface/CallableObject';
export declare class ValidationCollection {
    private static throwErrors;
    private static newInstancesClearReports;
    private static validatorName;
    private static stringValidationClass;
    private static numberValidationClass;
    private static objectValidationClass;
    private static arrayValidationClass;
    constructor(unknownData?: unknown);
    static createInstance(unknownData?: unknown): ValidationCollection;
    static setThrowsErrors(shouldThrow: boolean): void;
    static setNewInstanceClearsReports(shouldClear: boolean): void;
    static setName(name: string): void;
    static confirm(): boolean;
    isString(): CallableStringValidatorObject;
    isNumber(): CallableNumberValidatorObject;
    isObject(): CallableObjectValidatorObject;
    isArray(): CallableArrayValidatorObject;
    static report(): Array<ErroneousData>;
    static reportAsString(): string;
    static clearProblems(): void;
    hasProblems(): boolean;
    static get throwsErrors(): boolean;
}
