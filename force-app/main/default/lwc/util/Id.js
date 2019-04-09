
class Sequence {
    _prefix;
    _id;
    constructor(prefix = "") {
        this._prefix = prefix;
    }
    next() {
        if(this._id === undefined) {
            this._id = 0;
        } else {
            this._id ++;
        }
        return this._prefix + this._id;
    }
}

const instances = {}; 
const defaultInstance = new Sequence();

const getSequence = function(name) {
    if(name) {
        let instance = instances[name];
        if(!instance) {
            instance = new Sequence(name);
            instances[name] = instance;
        }
        return instance;
    }
    return defaultInstance;
};

const next = function(name) {
    return getSequence(name).next();
};

export { getSequence, next, Sequence };