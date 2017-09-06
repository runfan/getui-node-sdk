'use strict';
var OPTS = Symbol('__OPTS__');
class Message {
    constructor(options) {
        Object.assign(this,{
            isOffline: true,
            offlineExpireTime: 60 * 1000,   //过多久该消息离线失效（单位毫秒） 支持1-72小时*60000秒，默认1小时 60*1000
            pushNetWorkType: 0              //0:联网方式不限;1:仅wifi;2:仅4G/3G/2G
        }, options)
    }
}
module.exports = Message;