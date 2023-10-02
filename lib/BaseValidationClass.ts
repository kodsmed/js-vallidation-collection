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

export type divisibleByArgument = { value: unknown, divisor: number }

export type ErroneousData = {name?: string, what: string, in: string, at?: number, is?: string, expected?: string}
export enum What {
  unexpectedType = 'unexpected type',
  missingProperties = 'missing property',
  unexpectedProperties = 'unexpected property',
  missingValues = 'missing value',
  unexpectedValues = 'unexpected value',
  unexpectedValueTypes = 'unexpected value type',
  faultyLength = 'faulty Length',
  tooShort = 'too short',
  tooLong = 'too long',
  nullEncountered = 'null encountered',
  undefinedEncountered = 'undefined encountered',
  NaNEncountered = 'NaN encountered',
}

export class BaseValidationClass {
  // rule properties
  protected minimumLength : number = 0;
  protected maximumLength : number = Number.MAX_SAFE_INTEGER;
  protected exactLength : number = -1;
  protected minimumNumberValue : number = Number.MIN_SAFE_INTEGER;
  protected maximumNumberValue : number = Number.MAX_SAFE_INTEGER;
  protected exactNumberValue : number = -1;
  protected validProperties : Array<string> = [];
  protected validValues : Array<any> = [];
  protected validValueTypes : Array<string> = [];
  protected name : string = ''
  protected shouldThrow : boolean = false

  //output properties
  protected problems: Array<ErroneousData> = []

  constructor(argumentObject: ArgumentObject = {}) {
    for (const property in argumentObject) {
      if (Object.prototype.hasOwnProperty.call(argumentObject, property)) {
          switch (property) {
            //numbers
            case 'minimumLength':
            case 'maximumLength':
            case 'exactLength':
            case 'minimumNumberValue':
            case 'maximumNumberValue':
            case 'exactNumberValue':
              const numVal = argumentObject[property as keyof ArgumentObject];
              if (typeof numVal === 'number' && !isNaN(numVal) && numVal !== Infinity && numVal !== -Infinity && numVal > 0 && Number.isInteger(numVal)) {
                (this as any)[property] = numVal;
              } else{
                throw new Error(`argumentObject contains an invalid property: ${property}`);
              }
              break;
            // string Arrays
            case 'validProperties':
            case 'validValueTypes':
              const strArrVal = argumentObject[property as keyof ArgumentObject];
              if (Array.isArray(strArrVal) && strArrVal.every(item => typeof item === 'string')) {
                (this as any)[property] = strArrVal;
              } else {
                throw new Error(`argumentObject contains an invalid property: ${property}`);
              }
              break;
            // any Arrays
            case 'validValues':
              const anyArrVal = argumentObject[property as keyof ArgumentObject];
              if (Array.isArray(anyArrVal)) {
                (this as any)[property] = anyArrVal;
              } else {
                throw new Error(`argumentObject contains an invalid property: ${property}`);
              }
              break;
            // boolean
            case 'shouldThrow':
              const boolVal = argumentObject[property as keyof ArgumentObject];
              if (typeof boolVal === 'boolean') {
                (this as any)[property] = boolVal;
              } else {
                throw new Error(`argumentObject contains an invalid property: ${property}`);
              }
              break;
            // string
            case 'name':
              const strVal = argumentObject[property as keyof ArgumentObject];
              if (typeof strVal === 'string') {
                (this as any)[property] = strVal;
              } else {
                throw new Error(`argumentObject contains an invalid property: ${property}`);
              }
              break;
            // default
            default:
              throw new Error(`argumentObject contains an invalid property: ${property}`);
          } // switch
        } // if
      } // for
  } // constructor

  clearProblems () {
    this.problems = []
  }

  get report (): Array<ErroneousData> {
    return [...this.problems]
  }

  get reportAsString() {
    const reports: ErroneousData[] = this.report
    let resultString = ''
    for (let i = 0; i < reports.length; i++) {
      const stringToAdd =
      `${reports[i].name ? `${reports[i].name}: ` : ''}`
        + `${reports[i].what} failure in ${reports[i].in},`
        + `${reports[i].at ? ` at ${reports[i].at},` : ''}`
        + `${reports[i].is ? ` is ${reports[i].is},` : ''}`
        + `${reports[i].expected ? ` expected ${reports[i].expected}` : ''}`
        + `\n`
      resultString += stringToAdd
    }
    return resultString
  }

  get hasProblems (): boolean {
    return this.problems.length > 0 ? true : false
  }

  get shouldThrowErrors (): boolean {
    return this.shouldThrow
  }

  get rules() : ArgumentObject {
    return {
      minimumLength: this.minimumLength,
      maximumLength: this.maximumLength,
      exactLength: this.exactLength,
      minimumNumberValue: this.minimumNumberValue,
      maximumNumberValue: this.maximumNumberValue,
      exactNumberValue: this.exactNumberValue,
      validProperties: this.validProperties,
      validValues: this.validValues,
      validValueTypes: this.validValueTypes,
      name: this.name,
      shouldThrow: this.shouldThrow
    }
  }

  protected handleValidationFailure (): void {
    if (this.shouldThrow) {
      const message = this.reportAsString
      throw new Error(message)
    }
  }

  protected isNullOrUndefined (unknownData: unknown): boolean {
    if (unknownData === null) {
      this.problems.push({
        what: What.nullEncountered,
        in: typeof unknownData,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return true;
    }
    if (unknownData === undefined) {
      this.problems.push({
        what: What.undefinedEncountered,
        in: typeof unknownData,
        ...(this.name && this.name !== '' ? { name: this.name } : {})
      });
      this.handleValidationFailure()
      return true;
    }
    return false
  }
}