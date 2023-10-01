export type ArgumentObject = {
  minimumLength?: number;
  maximumLength?: number;
  exactLength?: number;
  validProperties?: Array<string>;
  validValues?: Array<any>;
  validValueTypes?: Array<string>;
};

export type ErroneousData = {what: string, in: string, at?: number, is?: string}
export enum What {
  missingProperties = 'missing property',
  unexpectedProperties = 'unexpected property',
  missingValues = 'missing value',
  unexpectedValues = 'unexpected value',
  unexpectedValueTypes = 'unexpected value type',
  faultyLength = 'faulty Length',

}

export class BaseValidationClass {
  // rule properties
  protected minimumLength : number = 0;
  protected maximumLength : number = Number.MAX_SAFE_INTEGER;
  protected exactLength : number = -1;
  protected validProperties : Array<string> = [];
  protected validValues : Array<any> = [];
  protected validValueTypes : Array<string> = [];
  private argumentObject

  //output properties
  protected unexpectedProperties: Array<ErroneousData> = []
  protected missingProperties: Array<ErroneousData> = []
  protected unexpectedValues: Array<ErroneousData> = []
  protected unexpectedValueTypes: Array<ErroneousData> = []
  protected missingValues : Array<any> = []
  protected typeThatFailed = ''
  protected faultyLength = -1
  protected nullEncountered = false
  protected undefinedEncountered = false
  protected NaNEncountered = false
  protected atIndex = -1

  constructor (argumentObject: ArgumentObject = {}) {
    // get the properties of the argumentObject
    const properties = Object.getOwnPropertyNames(argumentObject)
    this.argumentObject = argumentObject

    // for each property, check if it's a valid property and if it is, set the corresponding private property
    for (let property of properties) {
      if (property === 'minimumLength') {
        if (Number(argumentObject[property]) > 0 ) {
          this.minimumLength = Number(argumentObject[property])
        }
      } else if (property === 'maximumLength') {
        if (Number(argumentObject[property]) > 0) {
          this.maximumLength = Number(argumentObject[property])
        }
      } else if (property === 'validProperties') {
        if (Array.isArray(argumentObject[property])) {
          this.validProperties = argumentObject[property] as Array<string>
        }
      } else if (property === 'validValues') {
        if (Array.isArray(argumentObject[property])) {
          this.validValues = argumentObject[property] as Array<string>
        }
      } else if (property === 'validValueTypes') {
        if (Array.isArray(argumentObject[property])) {
          this.validValueTypes = argumentObject[property] as Array<string>
        }
      } else if (property === 'exactLength') {
        if (Number(argumentObject[property]) > 0) {
          this.exactLength = Number(argumentObject[property])
        }
      } else {
        throw new Error(`argumentObject contains an invalid property: ${property}`)
      }
    }
  }

  clearOutputProperties () {
    this.unexpectedProperties = []
    this.missingProperties = []
    this.unexpectedValues = []
    this.unexpectedValueTypes = []
    this.missingValues = []
    this.typeThatFailed = ''
    this.faultyLength = 0
    this.nullEncountered = false
    this.undefinedEncountered = false
    this.NaNEncountered = false
    this.atIndex = -1
  }

  // The power of typecasting compels you!
  // We frankly don't care what the type of the unknown data is here, we just want to know how long it is.
  withMinimumLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length >= this.minimumLength;
    if (!result) {
      this.faultyLength = (unknownData as Array<any>).length;
      return false;
    }
    return true;
  }

  withMaximumLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length <= this.maximumLength;
    if (!result) {
      this.faultyLength = (unknownData as Array<any>).length;
      return false;
    }
    return true;
  }

 withExactLength(unknownData: unknown): boolean {
    const result = (unknownData as Array<any>).length === this.exactLength;
    if (!result) {
      this.faultyLength = (unknownData as Array<any>).length;
      return false;
    }
    return true;
  }
}