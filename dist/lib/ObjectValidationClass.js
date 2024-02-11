import { BaseValidationClass, What } from './BaseValidationClass';
export class ObjectValidationClass extends BaseValidationClass {
    constructor() {
        super();
    }
    // exposed to interface
    type() {
        return this.internalType(this.unknownData);
    }
    // not exposed to interface
    internalType(unknownData) {
        const isInvalid = this.isNullOrUndefined(unknownData);
        if (isInvalid) {
            return false;
        }
        const result = typeof unknownData === 'object' && !Array.isArray(unknownData);
        if (!result) {
            this.problems.push(Object.assign({ what: What.unexpectedType, in: 'object', is: typeof unknownData, expected: 'object' }, (this.name && this.name !== '' ? { name: this.name } : {})));
            this.handleValidationFailure();
            return false;
        }
        return true;
    }
    // this is a type check that does not report errors, it is used in other methods just to make sure we can check the length without errors
    // if we use the type() method, it will report errors, and we don't want that in this case
    typeNoReport() {
        const isInvalid = this.isNullOrUndefined(this.unknownData);
        if (isInvalid) {
            return false;
        }
        return typeof this.unknownData === 'object' && !Array.isArray(this.unknownData);
    }
    withMinimumLength(minimumLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
        if (dataObjectProperties.length < minimumLength) {
            this.problems.push(Object.assign({ what: What.tooShort, in: 'object', is: dataObjectProperties.length.toString(), expected: minimumLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    withMaximumLength(maximumLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
        if (dataObjectProperties.length > maximumLength) {
            this.problems.push(Object.assign({ what: What.tooLong, in: 'object', is: dataObjectProperties.length.toString(), expected: maximumLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    withExactLength(exactLength) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const dataObjectProperties = Object.getOwnPropertyNames(dataObject);
        if (dataObjectProperties.length !== exactLength) {
            this.problems.push(Object.assign({ what: What.faultyLength, in: 'object', is: dataObjectProperties.length.toString(), expected: exactLength.toString() }, (this.name && this.name !== '' ? { name: this.name } : {})));
            result = false;
            this.handleValidationFailure();
        }
        return result;
    }
    thatMayHaveProperties(propertyNames) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const allProperties = Object.getOwnPropertyNames(dataObject);
        for (const property of allProperties) {
            if (!propertyNames.includes(property)) {
                this.problems.push(Object.assign({ what: What.unexpectedProperties, in: typeof this.unknownData, is: property, expected: propertyNames.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
                this.handleValidationFailure();
            }
        }
        return result;
    }
    thatMustHaveProperties(propertyNames) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const allProperties = Object.getOwnPropertyNames(dataObject);
        // All the valid properties must be in the object.
        for (const property of propertyNames) {
            if (!dataObject.hasOwnProperty(property)) {
                this.problems.push(Object.assign({ what: What.missingProperties, in: typeof this.unknownData, expected: `${property} to be included` }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        // All the properties of the object must be in the array of valid properties.
        for (const property of allProperties) {
            if (!propertyNames.includes(property)) {
                this.problems.push(Object.assign({ what: What.unexpectedProperties, in: typeof this.unknownData, is: property, expected: propertyNames.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatMustHaveSanctionedValues(sanctionedValues) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const allValues = Object.values(dataObject);
        for (const value of allValues) {
            // loop through all the properties of the object, check if any of them have a value that is not in the array of sanctioned values. Type can be anything. As long as it's in the array of sanctioned values, it's ok.
            if (!sanctionedValues.includes(value)) {
                const valueAsString = this.valueToString(value);
                this.problems.push(Object.assign({ what: What.unexpectedValues, in: typeof this.unknownData, is: valueAsString, expected: sanctionedValues.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    thatMustHaveSanctionedValueTypes(sanctionedTypes) {
        let result = this.typeNoReport();
        if (!result) {
            return false;
        }
        const dataObject = this.unknownData;
        const allValues = Object.values(dataObject);
        // All the properties of the object must have a value that is of a sanctioned type. The type can be anything, as long as it's in the array of sanctioned types.
        for (const value of allValues) {
            const valueType = typeof value;
            if (sanctionedTypes.indexOf(valueType) === -1) {
                const valueAsString = this.valueToString(value);
                this.problems.push(Object.assign({ what: What.unexpectedValueTypes, in: typeof this.unknownData, is: typeof value, expected: sanctionedTypes.join(', ') }, (this.name && this.name !== '' ? { name: this.name } : {})));
                result = false;
            }
        }
        if (!result) {
            this.handleValidationFailure();
        }
        return result;
    }
    valueToString(value) {
        let valueAsString = 'unknown';
        switch (typeof value) {
            case 'string':
                valueAsString = value;
                break;
            case 'number':
                if (Number.isNaN(value)) {
                    valueAsString = 'NaN';
                }
                else {
                    valueAsString = Number(value).toString();
                }
                break;
            case 'boolean':
                valueAsString = Boolean(value).toString();
                break;
            case 'object':
                if (value === null) {
                    valueAsString = 'null';
                }
                else {
                    valueAsString = JSON.stringify(value);
                }
                break;
            case 'function':
            case 'symbol':
            case 'undefined':
            case 'bigint':
                valueAsString = typeof value;
                break;
        }
        return valueAsString;
    }
}
//# sourceMappingURL=ObjectValidationClass.js.map