'use strict';
var OPTS = Symbol('__OPTS__');
class Target {
    constructor(options) {
        Object.assign(this, {
            alias: '',
            appId: '',
            clientId: ''
        }, options);
    }
}

module.exports = Target;