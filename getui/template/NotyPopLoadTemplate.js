// 点击通知弹窗下载模板
'use strict';
var PushType = require('../PushType');
var GtReq = require('../GtReq');
var BaseTemplate = require('./BaseTemplate');
var OPTS = Symbol('__OPTS__');
class NotPopLoadTemplate extends BaseTemplate {
    constructor(options) {
        super(options);
        Object.assign(this, {
            notyIcon: '',           //通知栏图标
            logoUrl: '',            //从网络获取图标
            notyTitle: '',          //通知栏标题
            notyContent: '',        //通知栏内容
            isVibrate: true,
            isClearable: true,      //通知是否可清除
            isRing: true,
            popTitle: '',           //弹框标题
            popContent: '',         //弹框内容
            popImage: '',           //弹框图片
            popButton1: '',         //左边按钮名称
            popButton2: '',         //右边按钮名称
            loadIcon: '',           //下载图标
            loadTitle: '',          //下载标题
            loadUrl: '',            //下载地址
            isAutoInstall: false,   //是否自动安装
            isActived: false,       //是否激活
            androidMark: '',        //安卓标识
            symbianMark: '',        //塞班标识
            iphoneMark: ''          //苹果标识
        }, options)
        this.pushType = PushType.NotyPopLoad;
    }
    getActionChain() {
        // 设置actionChain
        // Set actionChain

        var actionChain = new GtReq.ActionChain({
            actionId: 1,
            type: GtReq.ActionChain.Type.Goto,
            next: 10000
        });
        var actionChain1 = new GtReq.ActionChain({
            actionId: 10000,
            type: GtReq.ActionChain.Type.notification,
            title: this.notyTitle,
            text: this.notyContent,
            logo: this.notyIcon,
            logoURL: this.logoUrl,
            ring: this.isRing,
            clearable: this.isClearable,
            buzz: this.isVibrate,
            next: 10010
        });
        // 通知
        // Notification
        var actionChain2 = new GtReq.ActionChain({
            actionId: 10001,
            type: GtReq.ActionChain.Type.notification,
            title: this.notyTitle,
            text: this.notyContent,
            logo: this.notyIcon,
            ring: this.isRing,
            clearable: true,
            buzz: true,
            next: 10010
        });

        var actionChain3 = new GtReq.ActionChain({
            actionId: 10010,
            type: GtReq.ActionChain.Type.Goto,
            next: 10020
        });
        //弹框按钮
        var button1 = new GtReq.Button({
            text: this.popButton1,
            next: 10040
        });
        var button2 = new GtReq.Button({
            text: this.popButton2,
            next: 100
        });
        //弹框
        var actionChain4 = new GtReq.ActionChain({
            actionId: 10020,
            type: GtReq.ActionChain.Type.popup,
            title: this.popTitle,
            text: this.popContent,
            img: this.popImage,
            buttons: [button1, button2],
            next: 6
        });
        //appstartupid
        var appStartUp = new GtReq.AppStartUp({
            android: this.androidMark,
            ios: this.iphoneMark,
            symbia: this.symbianMark
        });
        var actionChain5 = new GtReq.ActionChain({
            actionId: 10040,
            type: GtReq.ActionChain.Type.appdownload,
            name: this.loadTitle,
            url: this.loadUrl,
            logo: this.loadIcon,
            autoInstall: this.isAutoInstall,
            autostart: this.isActived,
            appstartupid: appStartUp,
            next: 100
        });
        var actionChain6 = new GtReq.ActionChain({
            actionId: 100,
            type: GtReq.ActionChain.Type.eoa
        });
        var actionChains = [actionChain, actionChain1, actionChain2, actionChain3, actionChain4, actionChain5, actionChain6];
        return actionChains;
    }
}
module.exports = NotPopLoadTemplate;