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
};

export type ErroneousData = {what: string, in: string, at?: number, is?: string, expected?: string}
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
  private argumentObject : ArgumentObject = {}

  //output properties
  protected problems: Array<ErroneousData> = []

  private static readonly  propertyTypeMap: {
    [key: string]: 'number' | 'stringArray' | 'anyArray'
  } = {
    minimumLength: 'number',
    maximumLength: 'number',
    exactLength: 'number',
    minimumNumberValue: 'number',
    maximumNumberValue: 'number',
    exactNumberValue: 'number',
    validProperties: 'stringArray',
    validValues: 'anyArray',
    validValueTypes: 'stringArray',
  }

  constructor(argumentObject: ArgumentObject = {}) {
    for (const property in argumentObject) {
      if (Object.prototype.hasOwnProperty.call(argumentObject, property)) {
          switch (property) {
            case 'minimumLength':
            case 'maximumLength':
            case 'exactLength':
            case 'minimumNumberValue':
            case 'maximumNumberValue':
            case 'exactNumberValue':
              const numVal = argumentObject[property as keyof ArgumentObject];
              if (typeof numVal === 'number' && !isNaN(numVal)) {
                (this as any)[property] = numVal;
              }
              break;

            case 'validProperties':
            case 'validValueTypes':
              const strArrVal = argumentObject[property as keyof ArgumentObject];
              if (Array.isArray(strArrVal) && strArrVal.every(item => typeof item === 'string')) {
                (this as any)[property] = strArrVal;
              }
              break;

            case 'validValues':
              const anyArrVal = argumentObject[property as keyof ArgumentObject];
              if (Array.isArray(anyArrVal)) {
                (this as any)[property] = anyArrVal;
              }
              break;

            default:
              throw new Error(`argumentObject contains an invalid property: ${property}`);
          } // switch
        } // if
      } // for
  } // constructor

  clearOutput () {
    this.problems = []
  }

  get report (): Array<ErroneousData> {
    return [...this.problems]
  }

  // The power of typecasting compels you!
  // We frankly don't care what the type of the unknown data is here, we just want to know how long it is.
  withMinimumLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length >= this.minimumLength;
    if (!result) {
      this.problems.push({ what: What.tooShort, in: typeof unknownData as string, at: (unknownData as Array<any>).length, expected: this.minimumLength.toString() });
      return false;
    }
    return true;
  }

  withMaximumLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length <= this.maximumLength;
    if (!result) {
      this.problems.push({ what: What.tooLong, in: typeof unknownData as string, at: (unknownData as Array<any>).length, expected: this.maximumLength.toString() });
      return false;
    }
    return true;
  }

 withExactLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length === this.exactLength;
    if (!result) {
      this.problems.push({ what: What.faultyLength, in: typeof unknownData as string, at: (unknownData as Array<any>).length, expected: this.exactLength.toString() });
      return false;
    }
    return true;
  }

  isOfValidValueType (unknownData: unknown): boolean {
    let result = true
    if (!this.validValueTypes.includes(typeof unknownData)) {
      result = false
      this.problems.push({ what: What.unexpectedValueTypes, in: typeof unknownData as string, is: typeof unknownData })
    }
    return result
  }
}