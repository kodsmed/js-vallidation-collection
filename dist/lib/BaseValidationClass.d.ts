export type ArgumentObject = {
    minimumLength?: number;
    maximumLength?: number;
    exactLength?: number;
    minimumNumberValue?: number;
    maximumNumberValue?: number;
    exactNumberValue?: number;
    validProperties?: Array<string>;
    validValues?: Array<any>;
    validValueTypes?: Array<string>;
    name?: string;
    shouldThrow?: boolean;
};
export type ErroneousData = {
    name?: string;
    what: string;
    in: string;
    at?: number;
    is?: string;
    expected?: string;
};
export declare enum What {
    unexpectedType = "unexpected type",
    missingProperties = "missing property",
    unexpectedProperties = "unexpected property",
    missingValues = "missing value",
    unexpectedValues = "unexpected value",
    unexpectedValueTypes = "unexpected value type",
    faultyLength = "faulty Length",
    tooShort = "too short",
    tooLong = "too long",
    nullEncountered = "null encountered",
    undefinedEncountered = "undefined encountered",
    NaNEncountered = "NaN encountered"
}
export declare class BaseValidationClass {
    protected unknownData: unknown;
    protected name: string;
    protected shouldThrow: boolean;
    protected problems: Array<ErroneousData>;
    constructor();
    clearProblems(): void;
    set data(unknownData: unknown);
    set dataName(name: string);
    get report(): Array<ErroneousData>;
    get reportAsString(): string;
    get hasProblems(): boolean;
    get shouldThrowErrors(): boolean;
    set shouldThrowErrors(value: boolean);
    protected handleValidationFailure(): void;
    protected isNullOrUndefined(unknownData: unknown): boolean;
}