export interface CallableValidatorObject {
  clearProblems(): void;
}

export interface CallableStringValidatorObject extends CallableValidatorObject{
  withMinimumLength(minimumLength: number): CallableStringValidatorObject | boolean;
  withMaximumLength(maximumLength: number): CallableStringValidatorObject | boolean;
  withExactLength(exactLength: number): CallableStringValidatorObject | boolean;
  thatIncludes(subString: string) : CallableStringValidatorObject | boolean;
  thatDoesNotIncludes(subString: string) : CallableStringValidatorObject | boolean;
  thatIsInCapitalLetters() : CallableStringValidatorObject | boolean;
  thatIsInSmallLetters() : CallableStringValidatorObject | boolean;
  firstLetterIsCapital() : CallableStringValidatorObject | boolean;
  thatEndsWith(subString: string) : CallableStringValidatorObject | boolean;
  thatStartsWith(subString: string) : CallableStringValidatorObject | boolean;
  thatIsAnEmail() : CallableStringValidatorObject | boolean;
  thatIsAUrl() : CallableStringValidatorObject | boolean;
}

export interface CallableNumberValidatorObject extends CallableValidatorObject{
  thatIsPositive(): CallableNumberValidatorObject | boolean;
  thatIsNegative(): CallableNumberValidatorObject | boolean;
  thatIsBetweenMinMax(min: number, max: number): CallableNumberValidatorObject | boolean;
  thatIsOverMinimum(minimumValue: number): CallableNumberValidatorObject | boolean;
  thatIsUnderMaximum(maximumValue: number): CallableNumberValidatorObject | boolean
  thatIsExactly(exactValue: number): CallableNumberValidatorObject | boolean;
  thatIsEven(): CallableNumberValidatorObject | boolean;
  thatIsOdd(): CallableNumberValidatorObject | boolean;
  thatIsNotZero(): CallableNumberValidatorObject | boolean;
  thatIsNotOne(): CallableNumberValidatorObject | boolean;
  thatIsEvenlyDivisible(): CallableNumberValidatorObject | boolean;
  thatIsEvenlyDivisibleBy(number: number): CallableNumberValidatorObject | boolean;
  thatIsAPrimeNumber(): CallableNumberValidatorObject | boolean;
  thatIsNotAPrimeNumber(): CallableNumberValidatorObject | boolean;
}

export interface CallableObjectValidatorObject extends CallableValidatorObject {
  withMinimumLength(minimumLength: number): CallableObjectValidatorObject | boolean;
  withMaximumLength(maximumLength: number): CallableObjectValidatorObject | boolean;
  withExactLength(exactLength: number): CallableObjectValidatorObject | boolean;
  thatMayHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject | boolean;
  thatMustHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject | boolean;
  thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableObjectValidatorObject | boolean;
  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableObjectValidatorObject | boolean;
}

export interface CallableArrayValidatorObject extends CallableValidatorObject {
  withMinimumLength(minimumLength: number): CallableArrayValidatorObject | boolean;
  withMaximumLength(maximumLength: number): CallableArrayValidatorObject | boolean;
  withExactLength(exactLength: number): CallableArrayValidatorObject | boolean;
  ofStrings(): CallableArrayValidatorObject | boolean;
  ofNumbers(): CallableArrayValidatorObject | boolean;
  ofObjects(): CallableArrayValidatorObject | boolean;
  ofArrays(): CallableArrayValidatorObject | boolean;
  ofBooleans(): CallableArrayValidatorObject | boolean;
  ofFunctions(): CallableArrayValidatorObject | boolean;
  ofSymbols(): CallableArrayValidatorObject | boolean;
  ofDates(): CallableArrayValidatorObject | boolean;
  thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableArrayValidatorObject | boolean;
  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableArrayValidatorObject | boolean;
}