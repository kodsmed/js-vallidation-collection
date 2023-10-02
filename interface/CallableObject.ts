export interface CallableValidatorObject {
  (unknownData: unknown): boolean;
  clearProblems(): void;
}

export interface CallableStringValidatorObject extends CallableValidatorObject{
  withMinimumLength(unknownData: unknown): boolean;
  withMaximumLength(unknownData: unknown): boolean;
  withExactLength(unknownData: unknown): boolean;
  thatIncludes(unknownData: unknown, subString: string) : boolean;
  thatDoesNotIncludes(unknownData: unknown, subString: string) : boolean;
  thatIsInCapitalLetters(unknownData: unknown) : boolean;
  thatIsInSmallLetters(unknownData: unknown) : boolean;
  firstLetterIsCapital(unknownData: unknown) : boolean;
  thatEndsWith(unknownData: unknown, subString: string) : boolean;
  thatStartsWith(unknownData: unknown, subString: string) : boolean;
  thatIsAnEmail(unknownData: unknown) : boolean;
  thatIsAUrl(unknownData: unknown) : boolean;
}

export interface CallableNumberValidatorObject extends CallableValidatorObject{
  thatIsPositive(unknownData: unknown): boolean;
  thatIsNegative(unknownData: unknown): boolean;
  thatIsBetweenMinMax(unknownData: unknown): boolean;
  thatIsOverMinimum(unknownData: unknown): boolean;
  thatIsUnderMaximum(unknownData: unknown): boolean
  thatIsExactly(unknownData: unknown): boolean;
  thatIsEven(unknownData: unknown): boolean;
  thatIsOdd(unknownData: unknown): boolean;
  thatIsNotZero(unknownData: unknown): boolean;
  thatIsNotOne(unknownData: unknown): boolean;
  thatIsEvenlyDivisible(unknownData: unknown): boolean;
  thatIsAPrimeNumber(unknownData: unknown): boolean;
  thatIsNotAPrimeNumber(unknownData: unknown): boolean;
}

export interface CallableObjectValidatorObject extends CallableValidatorObject {
  withMinimumLength(unknownData: unknown): boolean;
  withMaximumLength(unknownData: unknown): boolean;
  withExactLength(unknownData: unknown): boolean;
  thatMayHaveProperties(unknownData: unknown): boolean;
  thatMustHaveProperties(unknownData: unknown): boolean;
  thatMustHaveSanctionedValues(unknownData: unknown): boolean;
  thatMustHaveSanctionedValueTypes(unknownData: unknown): boolean;
}

export interface CallableArrayValidatorObject extends CallableValidatorObject {
  withMinimumLength(unknownData: unknown): boolean;
  withMaximumLength(unknownData: unknown): boolean;
  withExactLength(unknownData: unknown): boolean;
  ofStrings(unknownData: unknown): boolean;
  ofNumbers(unknownData: unknown): boolean;
  ofObjects(unknownData: unknown): boolean;
  ofArrays(unknownData: unknown): boolean;
  ofBooleans(unknownData: unknown): boolean;
  ofFunctions(unknownData: unknown): boolean;
  ofSymbols(unknownData: unknown): boolean;
  ofDates(unknownData: unknown): boolean;
}