// 透传消息模板
'use strict';
var PushType = require('../PushType');
var GtReq = require('../GtReq');
var BaseTemplate = require('./BaseTemplate');
var OPTS = Symbol('__OPTS__');
class TransmissionTemplate extends BaseTemplate {
    constructor(options){
        super(options);
        this.pushType = PushType.TransmissionMsg;
    }
    getActionChain() {
        // 设置actionChain
        // Set actionChain
        var actionChain1 = new GtReq.ActionChain({
            actionId: 1,
            type: GtReq.ActionChain.Type.Goto,
            next: 10030
        });
        //appstartupid
        var appStartUp = new GtReq.AppStartUp({
            android: '',
            symbia: '',
            ios: ''
        });
        //启动app
        //Start app
        var actionChain2 = new GtReq.ActionChain({
            actionId: 10030,
            type: GtReq.ActionChain.Type.startapp,
            appid: '',
            autostart: 1 === this.transmissionType,
            appstartupid: appStartUp,
            failedAction: 100,
            next: 100
        });
        //结束
        //Finish
        var actionChain3 = new GtReq.ActionChain({
            actionId: 100,
            type: GtReq.ActionChain.Type.eoa
        });
        var actionChains = [actionChain1, actionChain2, actionChain3];

        return actionChains;
    }
}
module.exports = TransmissionTemplate;