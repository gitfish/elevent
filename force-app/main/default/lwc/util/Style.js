import { split } from "./String";
import { isString, isArray, isObject } from "./Lang";
import { isWhitespace } from "./StringFilters";

const classNameBoolMap = (s) => {
    const r = [];
    for(let cn in s) {
        if(s[cn]) {
            r.push(cn);
        }
    }
    return r.join(" ");
};

const classNameFromSpec = (s) => {
    const r = [];
    r.push(s.className);
    if(s.variant) {
        let vs;
        if(isString(s.variant)) {
            vs = split(s.variant, isWhitespace);
        } else if(isArray(s.variant)) {
            vs = s.variant;
        }
        if(vs) {
            vs.forEach(v => {
                r.push(`${s.className}_${v}`);
            });
        }
    }
    return r.join(" ");
};

const classNameFromObj = (s) => {
    if(s.className) {
        return classNameFromSpec(s);
    }
    return classNameBoolMap(s);
};

const className = (...spec) => {
    const r = [];
    spec.forEach(s => {
        if(isString(s)) {
            r.push(s);
        } else if(isArray(s)) {
            s.forEach(r.push, r);
        } else if(isObject(s) && s != null) {
            r.push(classNameFromObj(s));
        }
    });
    return r.join(" ");
};

export {
    className
}