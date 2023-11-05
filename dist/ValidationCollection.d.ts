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
export default class ValidationCollection {
    private stringValidationClass;
    private numberValidationClass;
    private objectValidationClass;
    private arrayValidationClass;
    constructor(unknownData: unknown);
    set throwsErrors(shouldThrow: boolean);
    setName(name: string): void;
    get isString(): CallableStringValidatorObject;
    get isNumber(): CallableNumberValidatorObject;
    get isObject(): CallableObjectValidatorObject;
    get isArray(): CallableArrayValidatorObject;
    get report(): Array<ErroneousData>;
    get reportAsString(): string;
    clearProblems(): void;
    get hasProblems(): boolean;
    get throwsErrors(): boolean;
    confirm(): boolean;
}
