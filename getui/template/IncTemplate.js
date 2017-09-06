'use strict';
var GtReq = require('../GtReq');
var PushType = require('../PushType');
var BaseTemplate = require('./BaseTemplate');
var OPTS = Symbol('__INC_OPTS__')
class IncTemplate extends BaseTemplate{
    constructor(options){
        super(options);
        this.pushType = PushType.TransmissionMsg;
        Object.assign(this,{
            incAppId: '',
        },options)
    }
    getActionChain(){
        var actionChain1 = new GtReq.ActionChain({
            actionId: 1,
            type: GtReq.ActionChain.Type.Goto,
            next: 10030
        });
        var appStartUp = new GtReq.AppStartUp({
            android: '',
            symbia: '',
            ios: ''
        });
        // 启动app
        // Start the app
        var actionChain2 = new GtReq.ActionChain({
            actionId: 10030,
            type: GtReq.ActionChain.Type.startapp,
            appid: this.incAppId,
            autostart: 1 === this.transmissionType,
            appstartupid: appStartUp,
            failedAction: 100,
            next: 100
        });
        // 结束
        // Finish
        var actionChain3 = new GtReq.ActionChain({
            actionId: 100,
            type: GtReq.ActionChain.Type.eoa
        });
        var actionChains = [actionChain1, actionChain2, actionChain3];
        return actionChains;
    }

}

module.exports = IncTemplate;