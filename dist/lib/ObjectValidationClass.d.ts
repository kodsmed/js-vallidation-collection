import { BaseValidationClass } from './BaseValidationClass';
export declare class ObjectValidationClass extends BaseValidationClass {
    [key: string]: any;
    [key: symbol]: any;
    constructor();
    type(): boolean;
    internalType(unknownData: unknown): boolean;
    withMinimumLength(minimumLength: number): boolean;
    withMaximumLength(maximumLength: number): boolean;
    withExactLength(exactLength: number): boolean;
    thatIsInstanceOf(classType: any): boolean;
    thatMayHaveProperties(propertyNames: Array<string>): boolean;
    thatMustHaveProperties(propertyNames: Array<string>): boolean;
    thatMustHaveSanctionedValues(sanctionedValues: Array<any>): boolean;
    thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): boolean;
    private valueToString;
}
