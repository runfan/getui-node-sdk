'use strict';
var util = require('util');
var GtReq = require('../GtReq');
var Payload = require('../../payload/Payload');
var APNPayload = require('../../payload/APNPayload');
var DictionaryAlertMsg = require('../../payload/DictionaryAlertMsg');
var OPTS = Symbol('__OPTS__')
class BaseTemplate{
    constructor(options){
        Object.assign(this,{
            appId: '',
            appkey: '',
            duration: 0,
            transmissionContent:'',
            pushType: null,
            transmissionType: null,
        },options);
        this.pushInfo = new GtReq.PushInfo({
            invalidAPN: true,
            invalidMPN: true
        });
    }
    getTransparent(){
        var transparent = new GtReq.Transparent({
            id: '',
            messageId: '',
            action: 'pushmessage',
            taskId: '',
            pushInfo: this.getPushInfo(),
            appId: this.appId,
            appKey: this.appkey
        });
        var actionChainList = this.getActionChain();
        transparent.setActionChain(actionChainList);
        transparent.setCondition(this.getDurCondition());
        return transparent;
    }    
    getActionChain(){
        return null;
    }
    getPushInfo(){
        return this.pushInfo;
    }
    setPushInfo(options){
        var alertMsg = new DictionaryAlertMsg();
        alertMsg.locKey = options.locKey;
        if (options.locArgs != null && options.locArgs != '') {
            alertMsg.locArgs = [options.locArgs];
        }
        alertMsg.actionLocKey = options.actionLocKey;
        alertMsg.body = options.message;
        alertMsg.launchImage = options.launchImage;
    
        var apn = new APNPayload();
        apn.alertMsg = alertMsg;
        apn.badge = options.badge;
        apn.sound = options.sound;
        apn.contentAvailable = options.contentAvailable;
        if (options.payload != null && options.payload != '') {
            apn.customMsg = {'payload': options.payload};
        }
    
        this.setApnInfo(apn);
    }
    setApnInfo(payload){
        if (payload == null || !(payload instanceof Payload)) {
            return null;
        }
        var apn = payload.getPayload();
        if (apn == null || apn == '') {
            return null;
        }
        var len = apn.replace(/[^\x00-\xff]/g, "011").length;
        if (len > APNPayload.PAYLOAD_MAX_BYTES) {
            throw Error("APN payload length overlength (" + len + ">" + APNPayload.PAYLOAD_MAX_BYTES + ")");
        }
        this.pushInfo.setApnJson(apn);
        this.pushInfo.setInvalidAPN(false);
    }

    getDurCondition(){
        return 'duration=' + this[OPTS].duration;
    }
    setDuration(begin, end){
        var s = (new Date(begin)).getTime();
        var e = (new Date(end)).getTime();
        if (s <= 0 || e <= 0) {
            throw Error("DateFormat: yyyy-MM-dd HH:mm:ss");
        }
        if (s > e) {
            throw Error("startTime should be smaller than endTime");
        }
        this[OPTS].durationn = s.toString() + '-' + e.toString();
    }
}

module.exports = BaseTemplate;