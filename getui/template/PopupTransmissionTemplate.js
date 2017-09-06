/**
 * 弹框 + 透传数据
 * popout window + payload data
 **/
'use strict';
var PushType = require('../PushType');
var GtReq = require('../GtReq');
var BaseTemplate = require('./BaseTemplate');
var OPTS = Symbol('__OPTS__');
class PopupTransmissionTemplate extends BaseTemplate {
    constructor(options) {
        super(options);
        Object.assign(this, {
            title: '',
            text: '',
            img: '',
            confirmButtonText: '',
            cancelButtonText: '',
            transmissionContent: ''
        }, options)
        this.pushType = PushType.PopupAppDownLoad;
    }


    getActionChain() {
        // 设置actionChain
        // Set actionChain
        var actionChain1 = new GtReq.ActionChain({
            actionId: 1,
            type: GtReq.ActionChain.Type.Goto,
            next: 10020
        });

        var confirmButton = new GtReq.Button({
            text: this.confirmButtonText,
            next: 10030
        });
        var cancelButton = new GtReq.Button({
            text: this.cancelButtonText,
            next: 100
        });
        var popupAction = new GtReq.ActionChain({
            actionId: 10020,
            title: this.title,
            img: this.img,
            buttons: [confirmButton, cancelButton],
            type: GtReq.ActionChain.Type.popup,
            next: 100
        });

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
        var actionChains = [actionChain1, popupAction, actionChain2, actionChain3];

        return actionChains;
    };

}
module.exports = PopupTransmissionTemplate;