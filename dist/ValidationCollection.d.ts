/**
 * ValidationCollection, a collection of Validation objects that can be used to validate the parameters of a function.
 * Contains a collection of methods that can be used to for validation.
 *
 * @module ValidationCollection
 * @version 2.0.0
 * @author Jimmy "Kodsmed" Karlsson
 *
 * @property {string} name - Name of the parameter that is being validated.
 * @property {boolean} shouldThrow - If true, the validation will throw an error if it fails.
 */
import { ErroneousData } from './lib/BaseValidationClass.js';
import { CallableArrayValidatorObject, CallableNumberValidatorObject, CallableStringValidatorObject, CallableObjectValidatorObject } from './interface/CallableObject.js';
export declare class ValidationCollection {
    private static throwErrors;
    private static validatorName;
    private static stringValidationClass;
    private static numberValidationClass;
    private static objectValidationClass;
    private static arrayValidationClass;
    constructor(unknownData?: unknown);
    static createInstance(unknownData?: unknown): ValidationCollection;
    static setThrowsErrors(shouldThrow: boolean): void;
    static setName(name: string): void;
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
