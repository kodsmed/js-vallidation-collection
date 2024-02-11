import { BaseValidationClass } from './BaseValidationClass';
export declare class StringValidationClass extends BaseValidationClass {
    constructor();
    type(): boolean;
    internalType(unknownData: unknown): boolean;
    typeNoReport(): boolean;
    withMinimumLength(minimumLength: number): boolean;
    withMaximumLength(maximumLength: number): boolean;
    withExactLength(exactLength: number): boolean;
    thatIncludes(subString: string): boolean;
    thatDoesNotIncludes(subString: string): boolean;
    thatIsInCapitalLetters(): boolean;
    thatIsInSmallLetters(): boolean;
    firstLetterIsCapital(): boolean;
    thatEndsWith(subString: string): boolean;
    thatStartsWith(subString: string): boolean;
    thatIsAnEmail(): boolean;
    thatIsAUrl(): boolean;
}
