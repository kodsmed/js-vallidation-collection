export var What;
(function (What) {
    What["unexpectedType"] = "unexpected type";
    What["missingProperties"] = "missing property";
    What["unexpectedProperties"] = "unexpected property";
    What["missingValues"] = "missing value";
    What["unexpectedValues"] = "unexpected value";
    What["unexpectedValueTypes"] = "unexpected value type";
    What["faultyLength"] = "faulty Length";
    What["tooShort"] = "too short";
    What["tooLong"] = "too long";
    What["nullEncountered"] = "null encountered";
    What["undefinedEncountered"] = "undefined encountered";
    What["NaNEncountered"] = "NaN encountered";
})(What || (What = {}));
export class BaseValidationClass {
    constructor() {
        //input properties
        this.unknownData = undefined;
        this.name = '';
        this.shouldThrow = false;
        //output properties
        this.problems = [];
    } // constructor
    clearProblems() {
        this.problems = [];
    }
    set data(unknownData) {
        this.unknownData = unknownData;
    }
    set dataName(name) {
        if (name === undefined || name === null) {
            this.name = '';
            return;
        }
        if (typeof name !== 'string') {
            throw new Error('dataName must be a string');
        }
        if (name.includes(':')
            || name.includes(',')
            || name.includes('\n')
            || name.includes('\r')
            || name.includes('\t')
            || name.includes('\v')
            || name.includes('\f')
            || name.includes('\b')
            || name.includes('\0')
            || name.includes('\u2028')
            || name.includes('\u2029')
            || name.includes('<')
            || name.includes('>')) {
            throw new Error('dataName must not contain any of the following characters: : , \n \r \t \v \f \b \0 \u2028 \u2029 < >');
        }
        this.name = name;
    }
    get report() {
        return [...this.problems];
    }
    get reportAsString() {
        const reports = this.report;
        let resultString = '';
        for (let i = 0; i < reports.length; i++) {
            const stringToAdd = `${reports[i].name ? `${reports[i].name}: ` : ''}`
                + `${reports[i].what} failure in ${reports[i].in},`
                + `${reports[i].at ? ` at ${reports[i].at},` : ''}`
                + `${reports[i].is ? ` is ${reports[i].is},` : ''}`
                + `${reports[i].expected ? ` expected ${reports[i].expected}` : ''}`
                + `\n`;
            resultString += stringToAdd;
        }
        return resultString;
    }
    get hasProblems() {
        return this.problems.length > 0 ? true : false;
    }
    get shouldThrowErrors() {
        return this.shouldThrow;
    }
    set shouldThrowErrors(value) {
        this.shouldThrow = value;
    }
    handleValidationFailure() {
        if (this.shouldThrow) {
            const message = this.reportAsString;
            throw new Error(message);
        }
    }
    isNullOrUndefined(unknownData) {
        if (unknownData === null) {
            this.problems.push(Object.assign({ what: What.nullEncountered, in: typeof unknownData }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return true;
        }
        if (unknownData === undefined) {
            this.problems.push(Object.assign({ what: What.undefinedEncountered, in: typeof unknownData }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=BaseValidationClass.js.map