'use strict';

var Message = require('./Message');
var OPTS = Symbol('__APP__OPTS__');
class AppMessage extends Message {
    constructor(options) {
        super(options)
        Object.assign(this,{
            appIdList: [],
            phoneTypeList: [],
            provinceList: [],
            tagList: [],
            speed: 0
        }, options)
    }
}

module.exports = AppMessage;