export interface CallableValidatorObject {
  (unknownData: unknown): boolean;
  withMinimumLength(unknownData: unknown): boolean;
  withMaximumLength(unknownData: unknown): boolean;
  withExactLength(unknownData: unknown): boolean;
  thatIsPositive?(unknownData: unknown): boolean;
  thatIsNegative?(unknownData: unknown): boolean;
  thatIsBetweenMinMax?(unknownData: unknown): boolean;
  thatMayHaveProperties?(unknownData: unknown): boolean;
  thatMustHaveProperties?(unknownData: unknown): boolean;
  thatMustHaveSanctionedValues?(unknownData: unknown): boolean;
  thatMustHaveSanctionedValueTypes?(unknownData: unknown): boolean;
  ofStings?(unknownData: unknown): boolean;
  ofNumbers?(unknownData: unknown): boolean;
  ofObjects?(unknownData: unknown): boolean;
  ofArrays?(unknownData: unknown): boolean;
  ofBooleans?(unknownData: unknown): boolean;
  ofFunctions?(unknownData: unknown): boolean;
  ofSymbols?(unknownData: unknown): boolean;
  ofDates?(unknownData: unknown): boolean;
}