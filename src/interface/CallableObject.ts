export interface CallableValidatorObject {
  confirm(): boolean;
  clearProblems(): void;
}

export interface CallableStringValidatorObject extends CallableValidatorObject{
  withMinimumLength(minimumLength: number): CallableStringValidatorObject;
  withMaximumLength(maximumLength: number): CallableStringValidatorObject;
  withExactLength(exactLength: number): CallableStringValidatorObject;
  thatIncludes(subString: string) : CallableStringValidatorObject;
  thatDoesNotIncludes(subString: string) : CallableStringValidatorObject;
  thatIsInCapitalLetters() : CallableStringValidatorObject;
  thatIsInSmallLetters() : CallableStringValidatorObject;
  firstLetterIsCapital() : CallableStringValidatorObject;
  thatEndsWith(subString: string) : CallableStringValidatorObject;
  thatStartsWith(subString: string) : CallableStringValidatorObject;
  thatIsAnEmail() : CallableStringValidatorObject;
  thatIsAUrl() : CallableStringValidatorObject;
}

export interface CallableNumberValidatorObject extends CallableValidatorObject{
  thatIsPositive(): CallableNumberValidatorObject;
  thatIsNegative(): CallableNumberValidatorObject;
  thatIsBetweenMinMax(min: number, max: number): CallableNumberValidatorObject;
  thatIsOverMinimum(minimumValue: number): CallableNumberValidatorObject;
  thatIsUnderMaximum(maximumValue: number): CallableNumberValidatorObject;
  thatIsExactly(exactValue: number): CallableNumberValidatorObject;
  thatIsEven(): CallableNumberValidatorObject;
  thatIsOdd(): CallableNumberValidatorObject;
  thatIsNotZero(): CallableNumberValidatorObject;
  thatIsNotOne(): CallableNumberValidatorObject;
  thatIsEvenlyDivisible(): CallableNumberValidatorObject;
  thatIsEvenlyDivisibleBy(number: number): CallableNumberValidatorObject;
  thatIsAPrimeNumber(): CallableNumberValidatorObject;
  thatIsNotAPrimeNumber(): CallableNumberValidatorObject;
}

export interface CallableObjectValidatorObject extends CallableValidatorObject {
  withMinimumLength(minimumLength: number): CallableObjectValidatorObject;
  withMaximumLength(maximumLength: number): CallableObjectValidatorObject;
  withExactLength(exactLength: number): CallableObjectValidatorObject;
  thatMayHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject;
  thatMustHaveProperties(propertyNames: Array<string>): CallableObjectValidatorObject;
  thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableObjectValidatorObject;
  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableObjectValidatorObject;
}

export interface CallableArrayValidatorObject extends CallableValidatorObject {
  withMinimumLength(minimumLength: number): CallableArrayValidatorObject;
  withMaximumLength(maximumLength: number): CallableArrayValidatorObject;
  withExactLength(exactLength: number): CallableArrayValidatorObject;
  ofStrings(): CallableArrayValidatorObject;
  ofNumbers(): CallableArrayValidatorObject;
  ofObjects(): CallableArrayValidatorObject;
  ofArrays(): CallableArrayValidatorObject;
  ofBooleans(): CallableArrayValidatorObject;
  ofFunctions(): CallableArrayValidatorObject;
  ofSymbols(): CallableArrayValidatorObject;
  ofDates(): CallableArrayValidatorObject;
  thatMustHaveSanctionedValues(sanctionedValues: Array<any>): CallableArrayValidatorObject;
  thatMustHaveSanctionedValueTypes(sanctionedTypes: Array<string>): CallableArrayValidatorObject;
}