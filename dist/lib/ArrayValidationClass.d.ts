import { BaseValidationClass } from "./BaseValidationClass";
export declare class ArrayValidationClass extends BaseValidationClass {
    private stringValidator;
    private numberValidator;
    private objectValidator;
    constructor();
    type(): boolean;
    internalType(unknownData: unknown): boolean;
    withMinimumLength(minimumLength: number): boolean;
    withMaximumLength(maximumLength: number): boolean;
    withExactLength(exactLength: number): boolean;
    ofStrings(): boolean;
    ofNumbers(): boolean;
    ofObjects(): boolean;
    ofArrays(): boolean;
    ofBooleans(): boolean;
    ofFunctions(): boolean;
    ofSymbols(): boolean;
    ofDates(): boolean;
    thatMustHaveSanctionedValues(sanctionedValues?: Array<any>): boolean;
    thatMustHaveSanctionedValueTypes(sanctionedTypes?: Array<string>): boolean;
    private isExpectedContent;
    private isExpectedContentType;
    private recordErroneousDataType;
}
