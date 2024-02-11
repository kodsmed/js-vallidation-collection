import { BaseValidationClass } from './BaseValidationClass';
export declare class NumberValidationClass extends BaseValidationClass {
    constructor();
    type(): boolean;
    internalType(unknownData: unknown): boolean;
    typeNoReport(): boolean;
    thatIsPositive(): boolean;
    thatIsNegative(): boolean;
    thatIsBetweenMinMax(minimumNumberValue: number, maximumNumberValue: number): boolean;
    thatIsOverMinimum(minimumValue: number): boolean;
    thatIsUnderMaximum(maximumValue: number): boolean;
    thatIsExactly(exactValue: number): boolean;
    thatIsEven(): boolean;
    thatIsOdd(): boolean;
    thatIsNotZero(): boolean;
    thatIsNotOne(): boolean;
    thatIsNotNegativeOne(): boolean;
    thatIsEvenlyDivisible(): boolean;
    thatIsEvenlyDivisibleBy(divisor: number): boolean;
    thatIsAPrimeNumber(): boolean;
    thatIsNotAPrimeNumber(): boolean;
    private isPrime;
}
