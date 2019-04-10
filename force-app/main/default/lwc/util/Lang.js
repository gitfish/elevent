const stringType = typeof("");
const objectType = typeof({});
const numberType = typeof(1);
const booleanType = typeof(true);
const functionType = typeof(function() {});

const isString = o => {
    return typeof(o) === stringType;
};
const isObject = o => {
    return typeof(o) === objectType;
};
const isNumber = o => {
    return typeof(o) === numberType;
};
const isBoolean = o => {
    return typeof(o) === booleanType;
};
const isDate = o => {
    return o instanceof Date;
};
const isArray = o => {
    return Array.isArray(o);
};
const isFunction = o => {
    return typeof(o) === functionType;
};
const isNullOrUndefined = o => {
    return o === null || o === undefined;
};

export {
    isString,
    isObject,
    isNumber,
    isBoolean,
    isDate,
    isArray,
    isFunction,
    isNullOrUndefined
}