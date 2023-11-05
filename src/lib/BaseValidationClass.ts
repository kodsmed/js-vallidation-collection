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
  //input properties
  protected unknownData: unknown = undefined
  protected name : string = ''
  protected shouldThrow : boolean = false

  //output properties
  protected problems: Array<ErroneousData> = []

  constructor() {
  } // constructor

  clearProblems () {
    this.problems = []
  }

  set data (unknownData: unknown) {
    this.unknownData = unknownData
  }

  dataName (name: string) {
    if (name === undefined || name === null) {
      this.name = ''
      return
    }
    if (typeof name !== 'string') {
      throw new Error('dataName must be a string')
    }

    if (
      name.includes(':')
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
      || name.includes('>')
    ){
      throw new Error('dataName must not contain any of the following characters: : , \n \r \t \v \f \b \0 \u2028 \u2029 < >')
    }

    this.name = name
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

  set shouldThrowErrors (value: boolean) {
    this.shouldThrow = value
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