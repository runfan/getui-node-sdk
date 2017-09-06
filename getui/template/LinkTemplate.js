// 点击通知打开网页模板
'use strict';
var GtReq = require('../GtReq');
var PushType = require('../PushType');
var BaseTemplate = require('./BaseTemplate');
var OPTS = Symbol('__OPTS__');
class LinkTemplate extends BaseTemplate {
    constructor(options) {
        super(options);
        Object.assign(this,{
            title: '',
            text: '',
            logo: '',
            logoUrl: '',
            isVibrate: true,
            isClearable: true,
            isRing: true
        }, options)
        this.pushType = PushType.LinkMsg;
    }
    getActionChain() {
        var actionChain1 = new GtReq.ActionChain({
            actionId: 1,
            type: GtReq.ActionChain.Type.Goto,
            next: 10000
        });
        // 通知
        // Notification
        var actionChain2 = new GtReq.ActionChain({
            actionId: 10000,
            type: GtReq.ActionChain.Type.notification,
            title: this.title,
            text: this.text,
            logo: this.logo,
            logoURL: this.logoUrl,
            ring: this.isRing,
            clearable: this.isClearable,
            buzz: this.isVibrate,
            next: 10010
        });

        // goto
        var actionChain3 = new GtReq.ActionChain({
            actionId: 10010,
            type: GtReq.ActionChain.Type.Goto,
            next: 10030
        });
        // 启动web
        // Start web
        var actionChain4 = new GtReq.ActionChain({
            actionId: 10030,
            type: GtReq.ActionChain.Type.startweb,
            url: this.url,
            next: 100
        });
        // 结束
        // Finish
        var actionChain5 = new GtReq.ActionChain({
            actionId: 100,
            type: GtReq.ActionChain.Type.eoa
        });

        var actionChains = [actionChain1, actionChain2, actionChain3, actionChain4, actionChain5];
        return actionChains;
    }
}

module.exports = LinkTemplate;
